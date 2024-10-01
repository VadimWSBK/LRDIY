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

export const calculateBuckets = (
  product: Product,
  requiredVolume: number
): BucketCount[] => {
  // Updated Product Validation Check
  if (
    !product.coveragePerLitre ||
    !product.variants ||
    product.variants.length === 0 ||
    !product.variants.some(
      (variant) =>
        typeof variant.size === 'number' &&
        variant.size > 0 &&
        variant.price > 0
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

  // No scaling factor needed if we work with floating-point numbers
  const MAX_VOLUME = 1000; // Set a reasonable upper bound based on expected volumes
  const scaledRequiredVolume = Math.min(adjustedRequiredVolume, MAX_VOLUME);

  // Find the best combination of buckets
  const bestCombination = findBestBucketCombination(
    scaledRequiredVolume,
    validVariants
  );

  if (!bestCombination) {
    return [];
  }

  // Since we are removing special adjustment rules, we can return the best combination directly
  const buckets: BucketCount[] = bestCombination.buckets.filter(
    (bucket) => bucket.count > 0
  );

  return buckets;
};

export const findBestBucketCombination = (
  requiredVolume: number,
  buckets: Bucket[]
): BucketCombination | null => {
  // Initialize DP map
  const dp: Map<number, DPEntry> = new Map();
  dp.set(0, { totalCost: 0, counts: Array(buckets.length).fill(0) });

  const maxBucketSize = Math.max(...buckets.map((b) => b.size));
  const maxVolume = requiredVolume + maxBucketSize;

  const volumesToCheck = [0];

  while (volumesToCheck.length > 0) {
    const currentVolume = volumesToCheck.shift()!;
    const currentEntry = dp.get(currentVolume)!;

    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      const nextVolume = currentVolume + bucket.size;
      if (nextVolume > maxVolume) continue;

      const nextCost = currentEntry.totalCost + bucket.price;
      const existingEntry = dp.get(nextVolume);

      if (
        !existingEntry ||
        nextCost < existingEntry.totalCost ||
        (nextCost === existingEntry.totalCost &&
          currentEntry.counts.reduce((a, b) => a + b, 0) + 1 <
            existingEntry.counts.reduce((a, b) => a + b, 0))
      ) {
        const nextCounts = currentEntry.counts.slice();
        nextCounts[i] += 1;
        dp.set(nextVolume, {
          totalCost: nextCost,
          counts: nextCounts,
        });
        volumesToCheck.push(nextVolume);
      }
    }
  }

  // Find the best result with minimal waste
  let bestResult: BestResult | null = null;
  for (let volume = requiredVolume; volume <= maxVolume; volume++) {
    const entry = dp.get(volume);
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
      size: buckets[index].size,
      count: count,
      price: buckets[index].price,
      variantId: buckets[index].variantId,
    }))
    .filter((bucket) => bucket.count > 0);

  const bucketCombination: BucketCombination = {
    buckets: bucketsResult,
    totalVolume: bestResult.totalVolume,
    totalCost: bestResult.totalCost,
    waste: bestResult.waste,
  };
  return bucketCombination;
};

// Since we are removing the special adjustment rules, we can remove the adjustBucketCounts function
