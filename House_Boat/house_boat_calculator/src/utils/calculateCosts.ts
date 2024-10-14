// utils/calculateCosts.ts

import { BucketCount, RecommendedVariant } from '../types';

// Function to calculate the total cost of the buckets needed
export const calculateBucketCost = (bucketsNeeded: BucketCount[]): number => {
  return bucketsNeeded.reduce((total, bucket) => {
    return total + bucket.count * bucket.price; // Calculating the cost of each bucket type
  }, 0);
};

// Function to calculate the total cost of the variants needed
export const calculateVariantCost = (recommendedVariants: RecommendedVariant[]): number => {
  return recommendedVariants.reduce((total, variant) => {
    return total + (variant.variant?.price || 0) * variant.quantity; // Calculating the cost of each variant type
  }, 0);
};
