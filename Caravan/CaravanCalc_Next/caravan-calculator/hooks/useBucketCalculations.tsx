// hooks/useBucketCalculations.ts

import { useEffect, useMemo } from 'react';
import useStore from './useStore';
import { calculateBuckets } from '../utils/BucketCalculations';
import { Product } from '../types/index';

export const useBucketCalculations = (product: Product) => {
    const {
        totalArea,
        setRequiredVolume,
        requiredVolume,
        setBucketsNeeded,
        bucketsNeeded,
    } = useStore((state) => ({
        totalArea: state.totalArea,
        setRequiredVolume: state.setRequiredVolume,
        requiredVolume: state.requiredVolume[product.name],
        setBucketsNeeded: state.setBucketsNeeded,
        bucketsNeeded: state.bucketsNeeded[product.name] || [],
    }));

    // Calculate required volume and update Zustand store
    useEffect(() => {
        if (!requiredVolume && product.coveragePerLitre) {
            const calculatedVolume = totalArea / product.coveragePerLitre;
            setRequiredVolume({
                productName: product.name,
                volume: calculatedVolume,
            });
        }
    }, [
        product.name,
        product.coveragePerLitre,
        totalArea,
        requiredVolume,
        setRequiredVolume,
    ]);

    // Memoize the calculated buckets
    const calculatedBuckets = useMemo(() => {
        if (product.name === 'Geo Textile' || product.name === 'BONUS') {
            return [];
        }
        return calculateBuckets(product, requiredVolume);
    }, [product, requiredVolume]);

    // Update bucketsNeeded in Zustand store
    useEffect(() => {
        if (JSON.stringify(calculatedBuckets) !== JSON.stringify(bucketsNeeded)) {
            setBucketsNeeded({
                productName: product.name,
                buckets: calculatedBuckets,
            });
        }
    }, [calculatedBuckets, bucketsNeeded, setBucketsNeeded, product.name]);

    return { bucketsNeeded };
};
