// src/components/CalculatorFunctions/Variant_Calculations.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecommendedVariant } from '../../store/calculatorSlice'; // Import the correct action from calculatorSlice

export const useVariantCalculations = (totalArea, productVariants = [], type) => {
    const dispatch = useDispatch();

    // Get the recommended variant from the Redux store
    const recommendedVariant = useSelector(state => state.calculator.recommendedVariants[type]);

    useEffect(() => {
        if (productVariants.length > 0 && type) {
            let selectedVariant;

            // Determine the correct variant based on the product type and total area
            switch (type) {
                case 'Geo Textile':
                    // Ensure only Geo Textile variants are chosen
                    const geoTextileVariants = productVariants.filter(variant => variant.name.includes('100mm'));
                    selectedVariant = totalArea < 12 ? geoTextileVariants[0] : geoTextileVariants[1];
                    break;
                case 'BONUS':
                    // Ensure only BONUS variants are chosen
                    const bonusVariants = productVariants.filter(variant => variant.name.includes('Brush'));
                    selectedVariant = totalArea < 2 ? bonusVariants[0] : bonusVariants[1];
                    break;
                default:
                    selectedVariant = productVariants[0]; // Fallback for other products
                    break;
            }

            // Dispatch action to set the recommended variant in the Redux store
            dispatch(setRecommendedVariant({ productType: type, variant: selectedVariant }));
        }
    }, [totalArea, productVariants, type, dispatch]);

    return { recommendedVariant };
};



