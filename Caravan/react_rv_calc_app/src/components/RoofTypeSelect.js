// src/components/RoofTypeSelect.js
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setRoofType } from '../store/calculatorSlice'; // Import the action from your slice

const RoofTypeSelect = () => {
    const dispatch = useDispatch();
    const roofType = useSelector((state) => state.calculator.roofType);

    const handleRoofTypeChange = (e) => {
        dispatch(setRoofType(e.target.value)); // Dispatch the action to update roofType
    };

    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-roof-type">Select Roof Type:</label>
            <select 
                id="caravan-roof-type" 
                value={roofType} 
                onChange={handleRoofTypeChange} // Use handleChange for onChange
            >
                <option value="painted">Painted</option>
                <option value="raw metal">Raw Metal</option>
            </select>
        </div>
    );
};

export default RoofTypeSelect;
