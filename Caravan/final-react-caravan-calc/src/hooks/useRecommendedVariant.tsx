// useRecommendedVariant.js
import { useMemo } from 'react';
import { Product, ProductVariant } from '../types/index';
import useStore from '../store/useStore'; // Zustand store access

export const useRecommendedVariant = (product: Product) => {
  const totalArea = useStore((state) => state.totalArea);

  const recommendedVariant = useMemo(() => {
    let selectedVariant: ProductVariant | null = null;
    let quantityNeeded = 1;

    if (product.name === 'Geo Textile') {
      selectedVariant =
        product.variants.find((variant) =>
          totalArea < 12
            ? variant.variant === '100mm x 20m'
            : variant.variant === '100mm x 50m'
        ) || null;
    } else if (product.name === 'BONUS') {
      selectedVariant =
        product.variants.find((variant) =>
          totalArea < 2
            ? variant.variant === 'Brush Kit'
            : variant.variant === 'Brush Kit + Roller'
        ) || null;
    } else {
      selectedVariant = product.variants[0] || null;
    }

    return { variant: selectedVariant, quantity: quantityNeeded };
  }, [product, totalArea]);

  return recommendedVariant;
};
