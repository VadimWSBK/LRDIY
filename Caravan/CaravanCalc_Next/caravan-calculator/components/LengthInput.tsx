import React from 'react';
import useStore from '../hooks/useStore';

const LengthInput: React.FC = () => {
    const { length, setLength } = useStore((state) => ({
        length: state.length,
        setLength: state.setLength,
    }));

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const parsedValue = value === '' ? '' : parseFloat(value);
            const newLength = parsedValue > 20 ? 20 : parsedValue; // Limit to max 20 meters
            
            // Update the length in Zustand store
            setLength(newLength);
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
                onChange={handleLengthChange}
            />
        </div>
    );
};

export default LengthInput;
