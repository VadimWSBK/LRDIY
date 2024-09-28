import React, { useState, useEffect } from 'react';
import useStore from '../../../store/useStore'; // Zustand store
import styles from './LengthInput'; // Adjust path as needed

const LengthInput: React.FC = () => {
    const { length, setLength } = useStore((state) => ({
        length: state.length,
        setLength: state.setLength,
    }));

    const [displayValue, setDisplayValue] = useState<string>(length.toString());

    useEffect(() => {
        setDisplayValue(length.toString());
    }, [length]);

    const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        // Replace comma with dot to standardize input
        value = value.replace(',', '.');

        // Allow only valid numeric inputs with up to two decimal places, or an empty string
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setDisplayValue(value);

            // Parse the input value to a number or 0 if empty
            const parsedValue = value === '' ? 0 : parseFloat(value);

            // Set length to max 20 if value exceeds 20
            if (parsedValue > 20) {
                setLength(20);
                setDisplayValue('20'); // Set maximum length to 20
            } else if (parsedValue < 0 || isNaN(parsedValue)) {
                setLength(0);
                setDisplayValue(''); // Set to empty but treated as 0 internally
            } else {
                setLength(parsedValue);
            }
        }
    };

    const handleBlur = () => {
        // Ensure displayed value is within valid range on input blur
        if (displayValue === '' || parseFloat(displayValue) < 0 || isNaN(parseFloat(displayValue))) {
            setLength(0);
            setDisplayValue(''); // Keep display empty but set internal length to 0
        } else if (parseFloat(displayValue) > 20) {
            setLength(20);
            setDisplayValue('20'); // Enforce max limit of 20
        }
    };

    // Dynamic class names based on conditions
    const inputClassName = `${styles.lengthInputField} ${displayValue === '' || parseFloat(displayValue) === 0 ? styles.lengthInputFieldRed : styles.lengthInputFieldBlack}`;

    return (
        <div className={styles.lengthInputWrapper}>
            <label htmlFor="caravan-length" className={styles.lengthInputLabel}>Enter Length (m):</label>
            <input
                type="number"
                id="caravan-length"
                value={displayValue}
                min="0"
                max="20"
                step="0.1"
                onChange={handleLengthChange}
                onBlur={handleBlur}
                className={inputClassName} // Apply the dynamic class name
                placeholder="0 - 20"
            />
        </div>
    );
};

export default LengthInput;
