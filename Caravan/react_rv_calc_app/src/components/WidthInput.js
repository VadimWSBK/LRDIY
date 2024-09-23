// src/components/WidthInput.js

import React from 'react';

const WidthInput = ({ width, setWidth }) => {
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
                onChange={e => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        const parsedValue = value === '' ? '' : parseFloat(value);
                        setWidth(parsedValue > 3 ? 3 : parsedValue);
                    }
                }}
            />
        </div>
    );
};

export default WidthInput;
