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
  if (
    !product.coveragePerLitre ||
    !product.variants ||
    product.variants.length === 0
  ) {
    throw new Error(`Invalid product data: ${product.name}`);
  }

  if (requiredVolume <= 0 || isNaN(requiredVolume)) {
    throw new Error(
      `Invalid required volume for ${product.name}: ${requiredVolume}`
    );
  }

  // Find the best combination of buckets
  const bestCombination = findBestBucketCombination(
    requiredVolume,
    product.variants
  );
  if (!bestCombination) {
    return [];
  }

  // Adjust bucket counts based on product constraints
  const adjustedCombination = adjustBucketCounts(
    bestCombination,
    product.variants,
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
  buckets: Bucket[]
): BucketCombination | null => {
  const maxVolume = Math.ceil(requiredVolume * 1.1); // Allow a bit more for waste
  const dp: Array<DPEntry | null> = Array(maxVolume + 1).fill(null);
  dp[0] = { totalCost: 0, counts: Array(buckets.length).fill(0) };

  for (let volume = 0; volume <= maxVolume; volume++) {
    if (dp[volume] === null) continue;

    for (let i = 0; i < buckets.length; i++) {
      const bucket = buckets[i];
      const nextVolume = volume + bucket.size;
      if (nextVolume > maxVolume) continue;

      const nextCost = dp[volume]!.totalCost + bucket.price;
      if (
        dp[nextVolume] === null ||
        nextCost < dp[nextVolume]!.totalCost ||
        (nextCost === dp[nextVolume]!.totalCost &&
          dp[volume]!.counts.reduce((a, b) => a + b, 0) + 1 <
            dp[nextVolume]!.counts.reduce((a, b) => a + b, 0))
      ) {
        dp[nextVolume] = {
          totalCost: nextCost,
          counts: dp[volume]!.counts.slice(),
        };
        dp[nextVolume]!.counts[i] += 1;
      }
    }
  }

  // Find the best result with minimal waste
  let bestResult: BestResult | null = null;
  for (let volume = requiredVolume; volume <= maxVolume; volume++) {
    if (dp[volume]) {
      const waste = volume - requiredVolume;
      if (
        !bestResult ||
        dp[volume]!.totalCost < bestResult.totalCost ||
        (dp[volume]!.totalCost === bestResult.totalCost &&
          waste < bestResult.waste)
      ) {
        bestResult = {
          totalVolume: volume,
          totalCost: dp[volume]!.totalCost,
          counts: dp[volume]!.counts,
          waste: waste,
        };
      }
    }
  }

  if (!bestResult) return null;

  // Prepare bucket data
  const bucketsResult: BucketCount[] = bestResult.counts.map(
    (count: number, index: number) => ({
      size: buckets[index].size,
      count: count,
      price: buckets[index].price,
      variantId: buckets[index].variantId,
    })
  );

  const bucketCombination: BucketCombination = {
    buckets: bucketsResult,
    totalVolume: bestResult.totalVolume,
    totalCost: bestResult.totalCost,
    waste: bestResult.waste,
  };

  return bucketCombination;
};

// Adjust bucket counts based on product constraints
export const adjustBucketCounts = (
  bestCombination: BucketCombination,
  availableBuckets: Bucket[],
  product: Product
): { buckets: BucketCount[] } => {
  const bucketCounts: { [size: number]: number } = {};
  bestCombination.buckets.forEach((bucket) => {
    bucketCounts[bucket.size] = bucket.count;
  });

  // Adjust for specific product rules
  if (product.name === 'Sealer / Primer' || product.name === 'Etch Primer') {
    // Adjust smaller bucket counts to larger sizes
    if ((bucketCounts[1] || 0) >= 3) {
      bucketCounts[4] = (bucketCounts[4] || 0) + 1;
      bucketCounts[1] = 0;
    }
    if ((bucketCounts[4] || 0) >= 3) {
      bucketCounts[15] = (bucketCounts[15] || 0) + 1;
      bucketCounts[4] = 0;
    }
  } else {
    // Default adjustment rules
    if ((bucketCounts[1] || 0) >= 2) {
      bucketCounts[4] = (bucketCounts[4] || 0) + 1;
      bucketCounts[1] = 0;
    }
    if ((bucketCounts[4] || 0) >= 3) {
      bucketCounts[15] = (bucketCounts[15] || 0) + 1;
      bucketCounts[4] = 0;
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
          size: size,
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
