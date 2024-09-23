// src/components/CalculatorFunctions/Price_Calculations.js
import React from 'react';
import { useSelector } from 'react-redux';

const PriceCalculations = () => {
    const { overallTotal, totalSavings, discountedPrice } = useSelector((state) => state.priceCalculations);

    return (
        <div>
            <div>Total Cost: ${overallTotal.toFixed(2)}</div>
            <div>Savings: ${totalSavings.toFixed(2)}</div>
            <div>Discounted Price: ${discountedPrice.toFixed(2)}</div>
        </div>
    );
};

export default PriceCalculations;

