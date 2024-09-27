// hooks/useQuantityCalculations.ts
import { useEffect, useMemo } from 'react';
import useStore from './useStore';

export const useQuantityCalculations = () => {
    const {
        bucketsNeeded,
        recommendedVariants,
        selectedProducts,
        setTotalQuantity,
    } = useStore((state) => ({
        bucketsNeeded: state.bucketsNeeded,
        recommendedVariants: state.recommendedVariants,
        selectedProducts: state.selectedProducts,
        setTotalQuantity: state.setTotalQuantity, // Setter for total quantity in Zustand
    }));

    // Calculate total quantity of all selected products
    const totalQuantity = useMemo(() => {
        // Calculate total quantity for buckets
        const bucketQuantityTotal = Object.keys(bucketsNeeded)
            .filter((productName) => selectedProducts.includes(productName)) // Include only selected products
            .reduce((acc, productName) => {
                const bucketItems = bucketsNeeded[productName];
                if (bucketItems) {
                    const totalForProduct = bucketItems.reduce(
                        (sum, bucket) => sum + bucket.count,
                        0
                    );
                    return acc + totalForProduct;
                }
                return acc;
            }, 0);

        // Calculate total quantity for variants
        const variantQuantityTotal = Object.keys(recommendedVariants)
            .filter((productName) => selectedProducts.includes(productName)) // Include only selected products
            .reduce((acc, productName) => {
                const variantItem = recommendedVariants[productName];
                if (variantItem) {
                    return acc + variantItem.quantity;
                }
                return acc;
            }, 0);

        // Sum of bucket and variant quantities
        return bucketQuantityTotal + variantQuantityTotal;
    }, [bucketsNeeded, recommendedVariants, selectedProducts]);

    // Update total quantity in Zustand store
    useEffect(() => {
        setTotalQuantity(totalQuantity);
    }, [totalQuantity, setTotalQuantity]);

    return { totalQuantity };
};


export default useQuantityCalculations;