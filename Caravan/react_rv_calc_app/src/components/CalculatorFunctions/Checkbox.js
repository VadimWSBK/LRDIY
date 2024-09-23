// src/components/CalculatorFunctions/Checkbox.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectProduct, deselectProduct } from '../../store/actions';

const Checkbox = ({ productName }) => {
    const dispatch = useDispatch();
    const selectedProducts = useSelector((state) => state.calculator.selectedProducts); // Get selected products from Redux store

    const isSelected = selectedProducts.includes(productName); // Check if product is selected

    const handleToggle = () => {
        if (isSelected) {
            dispatch(deselectProduct(productName)); // Deselect product
        } else {
            dispatch(selectProduct(productName)); // Select product
        }
    };

    return (
        <input 
            type="checkbox" 
            checked={isSelected} // Control checked state
            onChange={handleToggle} // Handle change with Redux dispatch
        />
    );
};

export default Checkbox;
