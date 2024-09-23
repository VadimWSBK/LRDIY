import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateLength } from '../store/lengthSlice'; // Ensure this path and action name are correct

const LengthInput = () => {
    const dispatch = useDispatch(); // Get dispatch function
    const length = useSelector(state => state.length.length); // Access length from Redux store

    const handleLengthChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const parsedValue = value === '' ? '' : parseFloat(value);
            const newLength = parsedValue > 20 ? 20 : parsedValue; // Limit to max 20 meters
            dispatch(updateLength(newLength)); // Dispatch the correct action
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
