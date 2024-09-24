// src/components/CalculatorFunctions/Checkbox.js
import React from 'react';

const Checkbox = ({ productName, isSelected, toggleProductSelection }) => {
    // Handle checkbox toggle
    const handleToggle = () => {
        toggleProductSelection(productName); // Call the toggle function with the product name
    };

    return (
        <input 
            type="checkbox" 
            checked={isSelected} // Control checked state based on isSelected prop
            onChange={handleToggle} // Call handleToggle on checkbox change
        />
    );
};

export default Checkbox;
