import { useEffect } from 'react';
import useStore from '../store/useStore';
import { Product } from '../types/index';

export const useUpdateProductCalculations = (
  productName: string,
  calculations: any // Replace 'any' with appropriate type
) => {
  const {
    setProductCalculations,
    setBucketsNeeded,
    setRecommendedVariants,
    selectedProducts,
  } = useStore((state) => ({
    setProductCalculations: state.setProductCalculations,
    setBucketsNeeded: state.setBucketsNeeded,
    setRecommendedVariants: state.setRecommendedVariants,
    selectedProducts: state.selectedProducts,
  }));

  useEffect(() => {
    if (selectedProducts.includes(productName)) {
      setProductCalculations(productName, calculations);
      setBucketsNeeded(productName, calculations.bucketsNeeded);
      setRecommendedVariants(productName, calculations.recommendedVariant);
    } else {
      setProductCalculations(productName, {
        requiredVolume: 0,
        bucketCost: 0,
        variantCost: 0,
        recommendedVariant: { variant: null, quantity: 0 },
        totalQuantity: 0,
      });
      setBucketsNeeded(productName, []);
      setRecommendedVariants(productName, { variant: null, quantity: 0 });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productName, calculations, selectedProducts]);
};
