import React from 'react';

const LengthInput = ({ length, setLength }) => {
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
                onChange={e => {
                    const value = e.target.value;
                    if (value === '' || /^\d*\.?\d*$/.test(value)) {
                        const parsedValue = value === '' ? '' : parseFloat(value);
                        setLength(parsedValue > 20 ? 20 : parsedValue);
                    }
                }}
            />
        </div>
    );
};

export default LengthInput;
