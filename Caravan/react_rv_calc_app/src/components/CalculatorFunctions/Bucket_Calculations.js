// src/components/CalculatorFunctions/Bucket_Calculations.js
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setBucketsNeeded } from '../../store/actions'; // Import your action

// Function to calculate the number of buckets needed
const calculateBuckets = (litersNeeded) => {
    const buckets = [];
    let remainingLiters = litersNeeded;
    const sizes = [15, 4, 1]; // Bucket sizes in liters

    for (let size of sizes) {
        const count = Math.floor(remainingLiters / size);
        if (count > 0) {
            buckets.push({ size, count });
            remainingLiters -= count * size;
        }
    }
    return buckets;
};

export const useBucketCalculations = (totalArea, coveragePerLitre, productType) => {
    const dispatch = useDispatch();

    // Calculate liters needed based on total area and coverage per litre
    const litersNeeded = coveragePerLitre ? totalArea / coveragePerLitre : 0;

    // Fetch the buckets needed from Redux store
    const bucketsNeeded = useSelector((state) => state.calculator.bucketsNeeded[productType] || []);

    useEffect(() => {
        if (litersNeeded > 0) {
            const buckets = calculateBuckets(litersNeeded);
            dispatch(setBucketsNeeded({ [productType]: buckets })); // Dispatch action to update buckets in the store
        } else {
            dispatch(setBucketsNeeded({ [productType]: [] })); // Reset buckets if no buckets are needed
        }
    }, [litersNeeded, dispatch, productType]);

    return { bucketsNeeded };
};
