// src/components/CalculatorFunctions/ProductCalculations.js
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useBucketCalculations } from './Bucket_Calculations';
import { useVariantCalculations } from './Variant_Calculations';
import { updateSubtotal } from '../../store/priceCalculationsSlice'; // Import the action

const ProductCalculations = ({
    totalArea,
    productVariants = [], 
    coveragePerLitre,
    productBuckets = [], 
    productType,
    productName // Add productName prop to identify which product's subtotal to update
}) => {
    const dispatch = useDispatch(); // Initialize dispatch
    const { bucketsNeeded } = useBucketCalculations(totalArea, coveragePerLitre, productBuckets);
    const { recommendedVariant } = useVariantCalculations(totalArea, productVariants, productType);

    useEffect(() => {
        // Calculate total subtotal based on buckets and variants
        const bucketCost = bucketsNeeded.reduce((sum, bucket) => {
            const bucketPrice = productBuckets.find(b => b.size === bucket.size)?.price || 0;
            return sum + (bucket.count * bucketPrice);
        }, 0);
        
        const variantCost = recommendedVariant?.price || 0;
        const totalSubtotal = bucketCost + variantCost;

        // Dispatch the updated subtotal to the Redux store
        dispatch(updateSubtotal({ productName, subtotal: totalSubtotal }));
    }, [bucketsNeeded, recommendedVariant, productBuckets, dispatch, productName]);

    return (
        <div>
            {productBuckets.length > 0 && (
                <div>
                    <h4>Items</h4>
                    {bucketsNeeded.map(bucket => (
                        <div key={bucket.size}>
                            {bucket.count} x {bucket.size}L Bucket
                        </div>
                    ))}
                </div>
            )}

            {recommendedVariant && productVariants.length > 0 && (
                <div>
                    <h4>Items</h4>
                    1 x {recommendedVariant.name}
                </div>
            )}
        </div>
    );
};

export default ProductCalculations;
