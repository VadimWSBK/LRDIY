import { useMemo } from 'react';
import useTotalArea from './useTotalArea';
import { Product } from '../types/index';

export const useRequiredVolume = (product: Product) => {
  const totalArea = useTotalArea();

  const requiredVolume = useMemo(() => {
    if (totalArea > 0 && product.coveragePerLitre) {
      return totalArea / product.coveragePerLitre;
    }
    return 0;
  }, [totalArea, product.coveragePerLitre]);

  return requiredVolume;
};
