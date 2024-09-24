// src/components/CalculatorFunctions/Bucket_Calculations.js
import { useEffect } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { setBucketsNeeded, setRequiredVolume } from '../../store/calculatorSlice'; // Import the action creators

// Function to calculate the number of buckets needed
const calculateBuckets = (product, requiredVolume) => {
    let buckets = [];

    // Skip products that don't use bucket calculations
    if (!product.coveragePerLitre || !product.buckets || product.buckets.length === 0) {
        console.error(`Invalid product data: ${product.name}`, product);
        return buckets; // Return empty buckets array if data is invalid
    }

    if (requiredVolume <= 0 || isNaN(requiredVolume)) {
        console.error(`Invalid required volume for ${product.name}: ${requiredVolume}`);
        return buckets; // Return empty buckets array if required volume is invalid
    }

    // Find the best combination of buckets
    const bestCombination = findBestBucketCombination(requiredVolume, product.buckets);
    if (bestCombination) {
        // Adjust bucket counts based on product constraints
        const adjustedCombination = adjustBucketCounts(bestCombination, product.buckets, product);

        // Prepare structured bucket data for each size
        adjustedCombination.buckets.forEach(bucket => {
            if (bucket.count > 0) {
                buckets.push({
                    size: bucket.size,
                    count: bucket.count,
                    price: bucket.price,
                    variantId: bucket.variantId
                });
            }
        });
    }

    return buckets;
};

// Function to find the best combination of buckets
const findBestBucketCombination = (requiredVolume, buckets) => {
    let minTotalCost = Infinity;
    let minWaste = Infinity;
    let bestCombination = null;

    // Calculate maxCounts for each bucket size
    const maxCounts = buckets.map(bucket => {
        if (bucket.size <= 0) {
            console.error(`Invalid bucket size: ${bucket.size}`);
            return 0; // Avoid invalid array lengths
        }
        return Math.ceil(requiredVolume / bucket.size) + 1;
    });

    // Ensure all counts are positive and valid
    if (maxCounts.some(count => count <= 0 || !Number.isFinite(count))) {
        console.error(`Invalid maxCounts: ${maxCounts}`);
        return null; // Return null if any invalid count is found
    }

    // Generate all possible combinations of bucket counts
    const countsArray = buckets.map((bucket, index) => {
        return [...Array(maxCounts[index] + 1).keys()];
    });

    // Calculate all possible combinations
    const combinations = cartesianProduct(...countsArray);

    combinations.forEach(counts => {
        let totalVolume = 0;
        let totalCost = 0;
        counts.forEach((count, index) => {
            totalVolume += count * buckets[index].size;
            totalCost += count * buckets[index].price;
        });

        if (totalVolume >= requiredVolume) {
            const waste = totalVolume - requiredVolume;
            if (totalCost < minTotalCost || (totalCost === minTotalCost && waste < minWaste)) {
                minTotalCost = totalCost;
                minWaste = waste;
                bestCombination = {
                    buckets: counts.map((count, index) => ({
                        size: buckets[index].size,
                        count: count,
                        price: buckets[index].price
                    })),
                    totalVolume: totalVolume,
                    totalCost: totalCost,
                    waste: waste
                };
            }
        }
    });

    return bestCombination;
};

// Function to calculate the Cartesian product for bucket combinations
const cartesianProduct = (...arrays) => {
    return arrays.reduce((acc, curr) => {
        const res = [];
        acc.forEach(a => {
            curr.forEach(b => {
                res.push(a.concat([b]));
            });
        });
        return res;
    }, [[]]);
};

// Function to adjust bucket counts based on product constraints
const adjustBucketCounts = (bestCombination, availableBuckets, product) => {
    let bucketCounts = {};
    bestCombination.buckets.forEach(bucket => {
        bucketCounts[bucket.size] = bucket.count;
    });

    // Adjust for specific product rules
    if (product.name === 'Sealer / Primer' || product.name === 'Etch Primer') {
        // Adjust smaller bucket counts to larger sizes
        if ((bucketCounts[1] || 0) >= 3) {
            bucketCounts[4] = (bucketCounts[4] || 0) + 1;
            bucketCounts[1] = 0;
        }
        if ((bucketCounts[4] || 0) >= 3) {
            bucketCounts[15] = (bucketCounts[15] || 0) + 1;
            bucketCounts[4] = 0;
        }
    } else {
        // Default adjustment rules
        if ((bucketCounts[1] || 0) >= 2) {
            bucketCounts[4] = (bucketCounts[4] || 0) + 1;
            bucketCounts[1] = 0;
        }
        if ((bucketCounts[4] || 0) >= 3) {
            bucketCounts[15] = (bucketCounts[15] || 0) + 1;
            bucketCounts[4] = 0;
        }
    }

    let adjustedBuckets = [];

    for (let size in bucketCounts) {
        size = parseInt(size);
        let count = bucketCounts[size];
        if (count > 0) {
            let bucketInfo = availableBuckets.find(b => b.size === size);
            if (bucketInfo) {
                adjustedBuckets.push({ size: size, count: count, price: bucketInfo.price, variantId: bucketInfo.variantId });
            }
        }
    }

    return {
        buckets: adjustedBuckets
    };
};

// React hook for bucket calculations
export const useBucketCalculations = (product) => {
    const dispatch = useDispatch();

    // Access total area and required volume from Redux store
    const totalArea = useSelector((state) => state.calculator.totalArea);
    const requiredVolume = useSelector((state) => state.calculator.requiredVolume[product.name]);

    // Access current buckets needed from Redux store
    const bucketsNeeded = useSelector(
        (state) => state.calculator.bucketsNeeded[product.name] || [],
        shallowEqual
    );

    // Calculate required volume and store it in Redux if not already calculated
    useEffect(() => {
        if (!requiredVolume && product.coveragePerLitre) {
            const calculatedVolume = totalArea / product.coveragePerLitre;
            dispatch(setRequiredVolume({ productName: product.name, volume: calculatedVolume }));
        }
    }, [product, totalArea, requiredVolume, dispatch]);

    useEffect(() => {
        // Skip products that don't use bucket calculations
        if (product.name === 'Geo Textile' || product.name === 'BONUS') {
            return; // Skip bucket calculations for these products
        }

        // Calculate buckets based on product and required volume
        const calculatedBuckets = calculateBuckets(product, requiredVolume);
        // Only update Redux store if the calculated buckets have changed
        if (JSON.stringify(calculatedBuckets) !== JSON.stringify(bucketsNeeded)) {
            dispatch(setBucketsNeeded({ productName: product.name, buckets: calculatedBuckets }));
        }
    }, [product, requiredVolume, dispatch, bucketsNeeded]);

    return { bucketsNeeded };
};
