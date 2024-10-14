import { Bucket, BucketCombination, Product, BucketCount } from '../types';

// Define internal interfaces for DP entries and best result
interface DPEntry {
  counts: number[];
}

interface BestResult {
  totalVolume: number;
  counts: number[];
  waste: number;
}

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
        typeof variant.size === 'number' && variant.size > 0
    )
  ) {
    return [];
  }

  // Only process products that have size in their variants
  const validVariants = product.variants.filter(
    (variant): variant is Bucket =>
      typeof variant.size === 'number' &&
      variant.size > 0
  );

  if (validVariants.length === 0) {
    // Skip products that don't have valid variants
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

  // Sort the buckets by size in descending order
  const sortedBuckets = validVariants.sort((a, b) => b.size - a.size);

  // Find the best combination of buckets
  const bestCombination = findBestBucketCombination(
    adjustedRequiredVolume,
    sortedBuckets
  );

  if (!bestCombination) {
    return [];
  }

  // Adjust bucket counts based on product constraints
  const adjustedCombination = adjustBucketCounts(
    bestCombination,
    sortedBuckets,
    product
  );

  // Prepare structured bucket data for each size
  const buckets: BucketCount[] = adjustedCombination.buckets.filter(
    (bucket) => bucket.count > 0
  );

  return buckets;
};

export const findBestBucketCombination = (
  requiredVolume: number,
  buckets: { size: number; variantId: string; price: number }[]
): BucketCombination | null => {
  const maxBucketSize = Math.max(...buckets.map((b) => b.size));
  const maxVolume = requiredVolume + maxBucketSize;

  // Initialize DP array
  const dp: Array<DPEntry | null> = new Array(Math.ceil(maxVolume * 100) + 1).fill(null);
  dp[0] = { counts: Array(buckets.length).fill(0) };

  for (let volume = 0; volume <= requiredVolume * 100; volume++) {
    const currentEntry = dp[volume];
    if (currentEntry === null) continue;

    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      const nextVolume = volume + bucket.size * 100;
      if (nextVolume > maxVolume * 100) continue;

      const existingEntry = dp[Math.round(nextVolume)];

      const nextBucketCount = currentEntry.counts.reduce((a, b) => a + b, 0) + 1;
      const existingBucketCount = existingEntry
        ? existingEntry.counts.reduce((a, b) => a + b, 0)
        : Infinity;

      if (
        !existingEntry ||
        nextBucketCount < existingBucketCount
      ) {
        const nextCounts = currentEntry.counts.slice();
        nextCounts[i] += 1;
        dp[Math.round(nextVolume)] = {
          counts: nextCounts,
        };
      }
    }
  }

  // Find the best result with minimal waste
  let bestResult: BestResult | null = null;
  for (let volume = Math.ceil(requiredVolume * 100); volume <= maxVolume * 100; volume++) {
    const entry = dp[volume];
    if (entry) {
      const waste = volume / 100 - requiredVolume;
      if (
        !bestResult ||
        waste < bestResult.waste
      ) {
        bestResult = {
          totalVolume: volume / 100,
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
      size: buckets[index].size,
      count: count,
      price: buckets[index].price, // Ensure price is provided here
      variantId: buckets[index].variantId,
    }))
    .filter((bucket) => bucket.count > 0);

  const bucketCombination: BucketCombination = {
    buckets: bucketsResult,
    totalVolume: bestResult.totalVolume,
    waste: bestResult.waste,
  };
  return bucketCombination;
};

export const adjustBucketCounts = (
  bestCombination: BucketCombination,
  availableBuckets: Bucket[],
  product: Product
): { buckets: BucketCount[] } => {
  const bucketCounts: { [size: number]: number } = {};
  bestCombination.buckets.forEach((bucket) => {
    bucketCounts[bucket.size] = bucket.count;
  });

  // Get available bucket sizes
  const sizes = availableBuckets.map((bucket) => bucket.size).sort((a, b) => a - b);

  // Replacement logic to ensure no more than 3 of the same bucket size
  for (let i = 0; i < sizes.length - 1; i++) {
    const currentSize = sizes[i];
    const nextSize = sizes[i + 1];

    const currentBucketCount = bucketCounts[currentSize] || 0;

    // Ensure no more than 3 of the same bucket size
    while (bucketCounts[currentSize] >= 3) {
      if (nextSize) {
        bucketCounts[currentSize] -= 3;
        bucketCounts[nextSize] = (bucketCounts[nextSize] || 0) + 1;
      } else {
        break;
      }
    }

    if (bucketCounts[currentSize] <= 0) {
      delete bucketCounts[currentSize];
    }
  }

  const adjustedBuckets: BucketCount[] = [];

  for (const sizeStr in bucketCounts) {
    const size = parseFloat(sizeStr);
    const count = bucketCounts[size];
    if (count > 0) {
      const bucketInfo = availableBuckets.find((b) => b.size === size);
      if (bucketInfo) {
        adjustedBuckets.push({
          size: size,
          count: count,
          price: bucketInfo.price, // Ensure price is provided here
          variantId: bucketInfo.variantId,
        });
      }
    }
  }

  return {
    buckets: adjustedBuckets,
  };
};
