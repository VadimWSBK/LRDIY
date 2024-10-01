// hooks/useBucketCalculations.ts
import { useMemo } from 'react';
import useStore from '../store/useStore'; // Zustand store access
import { Product } from '../types/index';
import { calculateBuckets } from '../utils/BucketCalculations';

export const useBucketCalculations = (product: Product) => {
  const totalArea = useStore((state) => state.totalArea);

  // Calculate required volume within this hook
  const requiredVolume = useMemo(() => {
    if (totalArea > 0 && product.coveragePerLitre) {
      return totalArea / product.coveragePerLitre;
    }
    return 0;
  }, [totalArea, product.coveragePerLitre]);

  // Determine buckets needed
  const bucketsNeeded = useMemo(() => {
    if (product.name === 'Geo Textile' || product.name === 'BONUS') {
      return [];
    }
    if (requiredVolume > 0) {
      return calculateBuckets(product, requiredVolume);
    }
    return [];
  }, [product, requiredVolume]);

  return { bucketsNeeded, requiredVolume };
};
