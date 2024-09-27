import React, { useState, useEffect } from 'react';
import useStore from '../hooks/useStore';

const WidthInput: React.FC = () => {
    const { width, setWidth } = useStore((state) => ({
        width: state.width,
        setWidth: state.setWidth,
    }));

    const [displayValue, setDisplayValue] = useState<string>(width.toString());

    useEffect(() => {
        setDisplayValue(width.toString());
    }, [width]);

    const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Replace comma with dot to standardize input
        value = value.replace(',', '.');

        // Allow only valid numeric inputs with up to two decimal places, or an empty string
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setDisplayValue(value);

            // Parse the input value to a number or 0 if empty
            const parsedValue = value === '' ? 0 : parseFloat(value);

            // Set width to max 3 if value exceeds 3
            if (parsedValue > 3) {
                setWidth(3);
                setDisplayValue('3'); // Set maximum width to 3
            } else if (parsedValue < 0 || isNaN(parsedValue)) {
                setWidth(0);
                setDisplayValue(''); // Set to empty but treated as 0 internally
            } else {
                setWidth(parsedValue);
            }
        }
    };

    const handleBlur = () => {
        // Ensure displayed value is within valid range on input blur
        if (displayValue === '' || parseFloat(displayValue) < 0 || isNaN(parseFloat(displayValue))) {
            setWidth(0);
            setDisplayValue(''); // Keep display empty but set internal width to 0
        } else if (parseFloat(displayValue) > 3) {
            setWidth(3);
            setDisplayValue('3'); // Enforce max limit of 3
        }
    };

    // Apply a class to change text color based on conditions
    const inputClassName = `input-field ${displayValue === '' || parseFloat(displayValue) === 0 ? 'red' : 'black'}`;

    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-width">Enter Width (m):</label>
            <input
                type="number" // Use number input type for better UX
                id="caravan-width"
                value={displayValue}
                min="0"
                max="3"
                step="0.1" // Allow precise input
                onChange={handleWidthChange}
                onBlur={handleBlur}
                className={inputClassName} // Apply the dynamic class name
                placeholder="0 - 3"
            />
        </div>
    );
};

export default WidthInput;

