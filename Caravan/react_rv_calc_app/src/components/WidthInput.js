import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setWidth, updateTotalArea } from '../store/calculatorSlice'; // Import correct actions from calculatorSlice

const WidthInput = () => {
    const dispatch = useDispatch(); // Get dispatch function
    const width = useSelector(state => state.calculator.width); // Access width from calculator slice

    const handleWidthChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const parsedValue = value === '' ? '' : parseFloat(value);
            const newWidth = parsedValue > 3 ? 3 : parsedValue;
            dispatch(setWidth(newWidth)); // Update width in calculator slice
            dispatch(updateTotalArea()); // Update total area in calculator slice
        }
    };

    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-width">Enter Width (m):</label>
            <input
                type="number"
                id="caravan-width"
                value={width}
                min="0"
                max="3"
                step="0.1"
                onChange={handleWidthChange} // Use the handleWidthChange function
            />
        </div>
    );
};

export default WidthInput;
