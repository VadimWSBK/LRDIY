import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateWidth } from '../store/widthSlice'; // Ensure this path is correct

const WidthInput = () => {
    const dispatch = useDispatch(); // Get dispatch function
    const width = useSelector(state => state.width.width); // Access width from Redux store

    const handleWidthChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const parsedValue = value === '' ? '' : parseFloat(value);
            const newWidth = parsedValue > 3 ? 3 : parsedValue;
            dispatch(updateWidth(newWidth)); // Use the correct action creator to update the width
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
