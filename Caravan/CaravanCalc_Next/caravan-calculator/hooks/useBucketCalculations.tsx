import { useEffect, useMemo } from 'react';
import useStore from './useStore';
import { calculateBuckets } from '../utils/BucketCalculations';
import { Product, BucketCount } from '../types/index';

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
        requiredVolume: state.requiredVolume?.[product.name] ?? 0,
        setBucketsNeeded: state.setBucketsNeeded,
        bucketsNeeded: state.bucketsNeeded?.[product.name] ?? [],
    }));

    // Calculate required volume and update Zustand store
    useEffect(() => {
        if (totalArea > 0 && product.coveragePerLitre) { // Calculate required volume every time totalArea changes
            const calculatedVolume = totalArea / product.coveragePerLitre;
            setRequiredVolume({
                productName: product.name,
                volume: calculatedVolume,
            });
        }
    }, [product.name, product.coveragePerLitre, totalArea, setRequiredVolume]);

        const calculatedBuckets = useMemo<BucketCount[]>(() => {
            if (product.name === 'Geo Textile' || product.name === 'BONUS') {
                return [];
            }
        
    // Ensure requiredVolume is valid before calculating buckets
            let result: BucketCount[];
            if (requiredVolume > 0 && !isNaN(requiredVolume)) {
                result = calculateBuckets(product, requiredVolume);
            } else {
                result = [];
            }
        
            return result;
        }, [product, requiredVolume]);

        useEffect(() => {
            // Check if calculatedBuckets are different from bucketsNeeded in the store
            if (JSON.stringify(calculatedBuckets) !== JSON.stringify(bucketsNeeded)) {
              // Update the store with the correct structure
              setBucketsNeeded({
                productName: product.name, // Ensure this is the product's name
                buckets: calculatedBuckets, // Use `buckets` instead of `bucket`
              });
            }
          }, [calculatedBuckets, bucketsNeeded, setBucketsNeeded, product.name]);
          

    return { bucketsNeeded };
};


export default useBucketCalculations;
