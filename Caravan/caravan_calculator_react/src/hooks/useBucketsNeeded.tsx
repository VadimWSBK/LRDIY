import { useMemo } from 'react';
import { Product, BucketCount } from '../types/index';
import { calculateBuckets } from '../utils/BucketCalculations';

export const useBucketsNeeded = (product: Product, requiredVolume: number) => {
  const bucketsNeeded = useMemo<BucketCount[]>(() => {
    if (product.name === 'Geo Textile' || product.name === 'BONUS') {
      return [];
    }
    if (requiredVolume > 0) {
      return calculateBuckets(product, requiredVolume);
    }
    return [];
  }, [requiredVolume, product]);

  return bucketsNeeded;
};
