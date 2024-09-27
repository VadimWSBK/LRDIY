import { useEffect, useState } from 'react';
import useStore from '../hooks/useStore';
import { ProductVariant } from '../types/index';

interface VariantCalculationProps {
    totalArea: number;
    productVariants: ProductVariant[];
    type: string;
}

const useVariantCalculations = ({ totalArea, productVariants, type }: VariantCalculationProps) => {
    const { setRecommendedVariant } = useStore((state) => ({
        setRecommendedVariant: state.setRecommendedVariant,
    }));

    const [recommendedVariant, setLocalRecommendedVariant] = useState<{ variant: ProductVariant | null; quantity: number }>({
        variant: null,
        quantity: 0
    });

    useEffect(() => {
        let selectedVariant: ProductVariant | null = null;
        let quantityNeeded = 1; // Default quantity to 1

        switch (type) {
            case 'Geo Textile':
                // Determine variant based on total area
                if (totalArea < 12) {
                    selectedVariant = productVariants.find(variant => variant.variant === '100mm x 20m') || null;
                    quantityNeeded = 1; // Always 1 for under 12 sqm
                } else {
                    selectedVariant = productVariants.find(variant => variant.variant === '100mm x 50m') || null;
                    quantityNeeded = 1; // Always 1 for above 12 sqm
                }
                break;

            case 'BONUS':
                // Determine variant based on total area
                if (totalArea < 2) {
                    selectedVariant = productVariants.find(variant => variant.variant === 'Brush Kit') || null;
                    quantityNeeded = 1; // Default to 1 for small areas
                } else {
                    selectedVariant = productVariants.find(variant => variant.variant === 'Brush Kit + Roller') || null;
                    quantityNeeded = 1; // Default to 1 for larger areas
                }
                break;

            default:
                selectedVariant = productVariants[0] || null; // Fallback to the first variant
                quantityNeeded = 0; // Default to 1 if no special calculation needed
                break;
        }

        // Update recommended variant in Zustand store and local state
        if (selectedVariant) {
            const calculatedVariant = {
                variant: selectedVariant,
                quantity: quantityNeeded
            };

            setLocalRecommendedVariant(calculatedVariant);
            setRecommendedVariant({ productType: type, ...calculatedVariant });
        }
    }, [totalArea, productVariants, type, setRecommendedVariant]);

    return { recommendedVariant };
};

export default useVariantCalculations;
