// src/components/CalculatorFunctions/Variant_Calculations.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRecommendedVariant } from '../../store/actions'; // Import your action

export const useVariantCalculations = (totalArea, productVariants = [], type) => {
    const dispatch = useDispatch();

    // Get the recommended variant from the Redux store
    const recommendedVariant = useSelector(state => state.calculator.recommendedVariants[type]);

    useEffect(() => {
        if (productVariants.length > 0) {
            let selectedVariant;
            switch (type) {
                case 'geoTextile':
                    selectedVariant = totalArea < 12 ? productVariants[0] : productVariants[1];
                    break;
                case 'bonusProduct':
                    selectedVariant = totalArea < 2 ? productVariants[1] : productVariants[0];
                    break;
                default:
                    selectedVariant = productVariants[0]; // Fallback
                    break;
            }
            
            // Dispatch action to set the recommended variant in the Redux store
            dispatch(setRecommendedVariant(type, selectedVariant));
        }
    }, [totalArea, productVariants, type, dispatch]);

    return { recommendedVariant };
};
