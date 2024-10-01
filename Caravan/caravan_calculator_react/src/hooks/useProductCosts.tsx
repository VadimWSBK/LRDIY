import { useMemo } from 'react';
import { BucketCount, ProductVariant } from '../types/index';

export const useProductCosts = (
  bucketsNeeded: BucketCount[],
  recommendedVariant: { variant: ProductVariant | null; quantity: number }
) => {
  const bucketCost = useMemo(() => {
    return bucketsNeeded.reduce(
      (total, bucket) => total + bucket.count * bucket.price,
      0
    );
  }, [bucketsNeeded]);

  const variantCost = useMemo(() => {
    return recommendedVariant.variant
      ? recommendedVariant.variant.price * recommendedVariant.quantity
      : 0;
  }, [recommendedVariant]);

  return { bucketCost, variantCost };
};
