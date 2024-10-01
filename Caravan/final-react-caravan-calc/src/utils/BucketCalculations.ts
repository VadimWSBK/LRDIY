// utils/BucketCalculations.ts

import { Bucket, BucketCombination, Product, BucketCount } from '../types';

// Define internal interfaces for DP entries and best result
interface DPEntry {
  totalCost: number;
  counts: number[];
}

interface BestResult {
  totalVolume: number;
  totalCost: number;
  counts: number[];
  waste: number;
}
const SCALE = 1000; // to convert liters to milliliters

export const calculateBuckets = (
  product: Product,
  requiredVolume: number
): BucketCount[] => {
  // Product Validation Check
  if (
    !product.variants ||
    product.variants.length === 0 ||
    !product.variants.some(
      (variant) =>
        typeof variant.size === 'number' && variant.size > 0 && variant.price > 0
    )
  ) {
    return [];
  }

  // Only process products that have size in their variants
  const validVariants = product.variants.filter(
    (variant): variant is Bucket =>
      typeof variant.size === 'number' &&
      variant.size > 0 &&
      typeof variant.price === 'number' &&
      variant.price > 0
  );

  if (validVariants.length === 0) {
    // Skip products like 'Geo Textile' and 'BONUS' that use 'variant' instead of 'size'
    return [];
  }

  if (requiredVolume <= 0 || isNaN(requiredVolume)) {
    // Return an empty array instead of throwing an error
    console.warn(
      `Invalid required volume for ${product.name}: ${requiredVolume}`
    );
    return [];
  }

  // Adjust required volume specifically for Waterproof Sealant to cover only 26% of total area
  let adjustedRequiredVolume = requiredVolume;
  if (product.name === 'Waterproof Sealant') {
    adjustedRequiredVolume = requiredVolume * 0.26; // Use 26% of the total required volume
  }

 
  const scaledRequiredVolume = Math.round(adjustedRequiredVolume * SCALE);

  const scaledBuckets = validVariants.map((bucket) => ({
    size: Math.round(bucket.size * SCALE),
    price: bucket.price,
    variantId: bucket.variantId,
  }));

  // Find the best combination of buckets
  const bestCombination = findBestBucketCombination(
    scaledRequiredVolume,
    scaledBuckets
  );

  if (!bestCombination) {
    return [];
  }

  // Adjust bucket counts based on product constraints
  const adjustedCombination = adjustBucketCounts(
    bestCombination,
    scaledBuckets,
    product,
  );

  // Prepare structured bucket data for each size
  const buckets: BucketCount[] = adjustedCombination.buckets.filter(
    (bucket) => bucket.count > 0
  );

  return buckets;
};

export const findBestBucketCombination = (
  requiredVolume: number,
  buckets: { size: number; price: number; variantId: string }[]
): BucketCombination | null => {
  const maxBucketSize = Math.max(...buckets.map((b) => b.size));
  const maxVolume = requiredVolume + maxBucketSize;

  // Initialize DP array
  const dp: Array<DPEntry | null> = new Array(maxVolume + 1).fill(null);
  dp[0] = { totalCost: 0, counts: Array(buckets.length).fill(0) };

  for (let volume = 0; volume <= requiredVolume; volume++) {
    if (dp[volume] === null) continue;
    const currentEntry = dp[volume]!;

    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      const nextVolume = volume + bucket.size;
      if (nextVolume > maxVolume) continue;

      const nextCost = currentEntry.totalCost + bucket.price;
      const existingEntry = dp[nextVolume];

      if (
        !existingEntry ||
        nextCost < existingEntry.totalCost ||
        (nextCost === existingEntry.totalCost &&
          currentEntry.counts.reduce((a, b) => a + b, 0) + 1 <
            existingEntry.counts.reduce((a, b) => a + b, 0))
      ) {
        const nextCounts = currentEntry.counts.slice();
        nextCounts[i] += 1;
        dp[nextVolume] = {
          totalCost: nextCost,
          counts: nextCounts,
        };
      }
    }
  }

  // Find the best result with minimal waste
  let bestResult: BestResult | null = null;
  for (let volume = requiredVolume; volume <= maxVolume; volume++) {
    const entry = dp[volume];
    if (entry) {
      const waste = volume - requiredVolume;
      if (
        !bestResult ||
        entry.totalCost < bestResult.totalCost ||
        (entry.totalCost === bestResult.totalCost && waste < bestResult.waste)
      ) {
        bestResult = {
          totalVolume: volume,
          totalCost: entry.totalCost,
          counts: entry.counts,
          waste: waste,
        };
      }
      // Early exit if exact match is found
      if (waste === 0) {
        break;
      }
    }
  }

  if (!bestResult) {
    return null;
  }

  // Prepare bucket data
  const bucketsResult: BucketCount[] = bestResult.counts
    .map((count: number, index: number) => ({
      size: buckets[index].size / SCALE,
      count: count,
      price: buckets[index].price,
      variantId: buckets[index].variantId,
    }))
    .filter((bucket) => bucket.count > 0);

  const bucketCombination: BucketCombination = {
    buckets: bucketsResult,
    totalVolume: bestResult.totalVolume / SCALE,
    totalCost: bestResult.totalCost,
    waste: bestResult.waste / SCALE,
  };
  return bucketCombination;
};

export const adjustBucketCounts = (
  bestCombination: BucketCombination,
  availableBuckets: { size: number; price: number; variantId: string }[],
  product: Product
): { buckets: BucketCount[] } => {
  const bucketCounts: { [size: number]: number } = {};
  bestCombination.buckets.forEach((bucket) => {
    bucketCounts[Math.round(bucket.size * SCALE)] = bucket.count;
  });

   // Define adjustment rules with an index signature
   const adjustmentRules: { [key: string]: { [key: string]: number } } = {
    'Sealer / Primer': { size1000: 3, size4000: 3 },
    'Etch Primer': { size1000: 3, size4000: 3 },
    default: { size1000: 2, size4000: 3 },
  };

  const rules =
    adjustmentRules[product.name] || adjustmentRules['default'];

  const sizes = availableBuckets.map((bucket) => bucket.size).sort((a, b) => a - b);

  // Adjust counts from smallest to largest
  for (let i = 0; i < sizes.length - 1; i++) {
    const currentSize = sizes[i];
    const nextSize = sizes[i + 1];
    const currentSizeKey = `size${currentSize}`;
    const requiredCount = rules[currentSizeKey] || 2; // Default to 2

    const currentSizeScaled = currentSize;
    const nextSizeScaled = nextSize;

    while ((bucketCounts[currentSizeScaled] || 0) >= requiredCount) {
      bucketCounts[nextSizeScaled] = (bucketCounts[nextSizeScaled] || 0) + 1;
      bucketCounts[currentSizeScaled] -= requiredCount;
    }
  }

  // Remove zero or negative counts
  for (const size in bucketCounts) {
    if (bucketCounts[size] <= 0) {
      delete bucketCounts[size];
    }
  }

  const adjustedBuckets: BucketCount[] = [];

  for (const sizeStr in bucketCounts) {
    const size = parseInt(sizeStr, 10);
    const count = bucketCounts[size];
    if (count > 0) {
      const bucketInfo = availableBuckets.find((b) => b.size === size);
      if (bucketInfo) {
        adjustedBuckets.push({
          size: size / SCALE,
          count: count,
          price: bucketInfo.price,
          variantId: bucketInfo.variantId,
        });
      }
    }
  }
  return {
    buckets: adjustedBuckets,
  };
};
