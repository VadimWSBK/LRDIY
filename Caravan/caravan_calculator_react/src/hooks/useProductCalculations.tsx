import { useRequiredVolume } from './useRequiredVolume';
import { useBucketsNeeded } from './useBucketsNeeded';
import { useRecommendedVariant } from './useRecommendedVariant';
import { useProductCosts } from './useProductCosts';
import { useUpdateProductCalculations } from './useUpdateProductCalculations';
import { useTotalCalculations } from './useTotalCalculations';
import { Product } from '../types/index';

export const useProductCalculations = (product: Product) => {
  const requiredVolume = useRequiredVolume(product);
  const bucketsNeeded = useBucketsNeeded(product, requiredVolume);
  const recommendedVariant = useRecommendedVariant(product);
  const { bucketCost, variantCost } = useProductCosts(
    bucketsNeeded,
    recommendedVariant
  );

  const totalQuantity = bucketsNeeded.reduce(
    (sum, bucket) => sum + bucket.count,
    0
  ) + recommendedVariant.quantity;

  const calculations = {
    requiredVolume,
    bucketCost,
    variantCost,
    recommendedVariant,
    totalQuantity,
    bucketsNeeded,
  };

  useUpdateProductCalculations(product.name, calculations);

  // Update total calculations across all products
  useTotalCalculations();

  return {
    requiredVolume,
    bucketsNeeded,
    recommendedVariant,
    bucketCost,
    variantCost,
    totalQuantity,
  };
};

export default useProductCalculations;