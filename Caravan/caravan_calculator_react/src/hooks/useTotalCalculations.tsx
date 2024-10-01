import { useEffect } from 'react';
import useStore, { StoreState } from '../store/useStore';

export const useTotalCalculations = () => {
  const {
    productCalculations,
    setTotalQuantity,
    setTotalPrice,
    setDiscountedPrice,
    setTotalSavings,
  } = useStore((state: StoreState) => ({
    productCalculations: state.productCalculations,
    setTotalQuantity: state.setTotalQuantity,
    setTotalPrice: state.setTotalPrice,
    setDiscountedPrice: state.setDiscountedPrice,
    setTotalSavings: state.setTotalSavings,
  }));

  useEffect(() => {
    // Calculate total quantities across all products
    const totalQuantities = Object.values(productCalculations).reduce(
      (sum, calc) => {
        return sum + (calc ? calc.totalQuantity || 0 : 0);
      },
      0
    );
    setTotalQuantity(totalQuantities);

    // Calculate total prices across all products
    const totalPrices = Object.values(productCalculations).reduce(
      (sum, calc) => {
        return sum + (calc ? calc.bucketCost + calc.variantCost : 0);
      },
      0
    );
    setTotalPrice(totalPrices);

    const discounted = parseFloat((totalPrices * 0.9).toFixed(2));
    const savings = parseFloat((totalPrices - discounted).toFixed(2));

    setDiscountedPrice(discounted);
    setTotalSavings(savings);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productCalculations]);
};
