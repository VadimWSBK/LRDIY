import { useEffect } from 'react';
import useStore from '../hooks/useStore'; // Adjust import according to your structure

const useVariantCalculations = (totalArea, productVariants, type) => {
    const { setRecommendedVariant } = useStore((state) => ({
        setRecommendedVariant: state.setRecommendedVariant,
    }));

    let recommendedVariant;

    useEffect(() => {
        if (productVariants.length > 0 && type) {
            let selectedVariant;

            // Determine the correct variant based on the product type and total area
            switch (type) {
                case 'Geo Textile':
                    const geoTextileVariants = productVariants.filter(variant => variants.variant.includes('100mm'));
                    selectedVariant = totalArea < 12 ? geoTextileVariants[0] : geoTextileVariants[1];
                    break;
                case 'BONUS':
                    const bonusVariants = productVariants.filter(variant => variants.variant.includes('Brush'));
                    selectedVariant = totalArea < 2 ? bonusVariants[0] : bonusVariants[1];
                    break;
                default:
                    selectedVariant = productVariants[0]; // Fallback for other products
                    break;
            }

            // Update recommended variant in Zustand store
            setRecommendedVariant({ productType: type, variant: selectedVariant });
        }
    }, [totalArea, productVariants, type, setRecommendedVariant]);

    return { recommendedVariant };
};

export default useVariantCalculations;
