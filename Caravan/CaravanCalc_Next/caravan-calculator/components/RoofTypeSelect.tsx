import React from 'react';
import useStore from '../hooks/useStore';

const RoofTypeSelect: React.FC = () => {
    const { roofType, setRoofType } = useStore(); // Get roofType and setRoofType from store

    const handleRoofTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setRoofType(e.target.value); // Update roof type in the store
    };

    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-roof-type">Select Roof Type:</label>
            <select 
                id="caravan-roof-type" 
                value={roofType} 
                onChange={handleRoofTypeChange} 
            >
                <option value="painted">Painted</option>
                <option value="raw metal">Raw Metal</option>
            </select>
        </div>
    );
};

export default RoofTypeSelect;
