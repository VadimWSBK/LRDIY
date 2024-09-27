import { useEffect, useMemo } from 'react';
import useStore from './useStore';

export const usePriceCalculations = () => {
    const {
        bucketCost,
        variantCost,
        selectedProducts,
        setTotalPrice,
        setDiscountedPrice,
        setTotalSavings,
    } = useStore((state) => ({
        bucketCost: state.bucketCost,
        variantCost: state.variantCost,
        selectedProducts: state.selectedProducts,
        setTotalPrice: state.setTotalPrice,
        setDiscountedPrice: state.setDiscountedPrice,
        setTotalSavings: state.setTotalSavings, // Add this to update total savings
    }));

    // Calculate total price based on bucket and variant costs for selected products only
    const totalPrice = useMemo(() => {
        // Filter out the costs of unselected products
        const selectedBucketCosts = Object.keys(bucketCost)
            .filter((productName) => selectedProducts.includes(productName)) // Only include selected products
            .map((productName) => bucketCost[productName])
            .filter((cost) => typeof cost === 'number' && cost > 0); // Ensure valid numeric values

        const selectedVariantCosts = Object.keys(variantCost)
            .filter((productName) => selectedProducts.includes(productName)) // Only include selected products
            .map((productName) => variantCost[productName])
            .filter((cost) => typeof cost === 'number' && cost > 0); // Ensure valid numeric values

        // Sum all selected bucket costs and variant costs
        const bucketTotal = selectedBucketCosts.reduce((acc, cost) => acc + cost, 0);
        const variantTotal = selectedVariantCosts.reduce((acc, cost) => acc + cost, 0);

        const total = bucketTotal + variantTotal;
        return total;
    }, [bucketCost, variantCost, selectedProducts]);

    // Calculate discounted price
    const discountedPrice = useMemo(() => {
        return parseFloat((totalPrice * 0.9).toFixed(2)); // Apply a 10% discount
    }, [totalPrice]);

    // Calculate discounted price
    const totalSavings = useMemo(() => {
        return parseFloat((totalPrice - discountedPrice).toFixed(2)); // Calculate the savings
    }, [totalPrice, discountedPrice]);

    // Update total and discounted prices in Zustand store
    useEffect(() => {
        setTotalPrice(totalPrice);
        setDiscountedPrice(discountedPrice);
        setTotalSavings(totalSavings);

    }, [totalPrice, discountedPrice, totalSavings, setTotalPrice, setDiscountedPrice ,setTotalSavings]);

    return { totalPrice, discountedPrice, totalSavings}; // Optionally return totalQuantity
};
