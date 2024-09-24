import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setLength, updateTotalArea } from '../store/calculatorSlice'; // Update with correct imports

const LengthInput = () => {
    const dispatch = useDispatch(); // Get dispatch function
    const length = useSelector(state => state.calculator.length); // Access length from the calculator slice

    const handleLengthChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const parsedValue = value === '' ? '' : parseFloat(value);
            const newLength = parsedValue > 20 ? 20 : parsedValue; // Limit to max 20 meters
            dispatch(setLength(newLength)); // Update the length in calculator slice
            dispatch(updateTotalArea()); // Update the total area based on new length
        }
    };

    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-length">Enter Length (m):</label>
            <input
                type="number"
                id="caravan-length"
                value={length}
                min="0"
                max="20"
                step="0.1"
                onChange={handleLengthChange} // Use the handleLengthChange function
            />
        </div>
    );
};

export default LengthInput;

