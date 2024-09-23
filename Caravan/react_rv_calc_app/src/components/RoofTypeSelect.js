import React from 'react';

const RoofTypeSelect = ({ roofType, setRoofType }) => {
    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-roof-type">Select Roof Surface:</label>
            <select
                id="caravan-roof-type"
                value={roofType}
                onChange={e => setRoofType(e.target.value)}
            >
                <option value="painted">Painted</option>
                <option value="raw metal">Raw Metal</option> {/* Updated value */}
            </select>
        </div>
    );
};

export default RoofTypeSelect;
