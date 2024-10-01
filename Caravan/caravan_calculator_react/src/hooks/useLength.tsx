import { useState } from 'react';
import useStore from '../store/useStore'; // Import your Zustand store
import styles from '../components/Inputs/LenghtInput/LengthInput.module.css'; // Ensure correct path for the styles

const useLength = () => {
    const { length, setLength } = useStore((state) => ({
        length: state.length,
        setLength: state.setLength,
    }));

    const [displayValue, setDisplayValue] = useState<string>(length.toString());

    // Function to handle input changes
    const handleLengthChange = (value: string) => {
        value = value.replace(',', '.');
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setDisplayValue(value);
        }
    };

    // Function to handle input blur
    const handleBlur = () => {
        const parsedValue = parseFloat(displayValue);

        if (isNaN(parsedValue) || parsedValue < 0) {
            setLength(0); // Update Zustand store with 0
            setDisplayValue(''); // Clear input field
        } else if (parsedValue > 20) {
            setLength(20); // Update Zustand store with max value
            setDisplayValue('20'); // Set input to max value
        } else {
            setLength(parsedValue); // Update Zustand store with valid input
        }
    };

    // Determine the appropriate class based on the display value
    const inputClassName = `${styles.lengthInputField} ${
        displayValue === '' || parseFloat(displayValue) === 0
            ? styles.lengthInputFieldRed
            : styles.lengthInputFieldBlack
    }`;

    return {
        displayValue,
        handleLengthChange,
        handleBlur,
        inputClassName,
    };
};

export default useLength;
