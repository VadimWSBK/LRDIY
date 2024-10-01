import { useState } from 'react';
import useStore from '../store/useStore'; // Import Zustand store
import styles from '../components/Inputs/WidthInput/WidthInput.module.css'; // Ensure correct path for the styles

const useWidth = () => {
    const { width, setWidth } = useStore((state) => ({
        width: state.width,
        setWidth: state.setWidth,
    }));

    const [displayValue, setDisplayValue] = useState<string>(width.toString());

    // Handle input changes and update the display value
    const handleWidthChange = (value: string) => {
        // Replace comma with dot and allow valid numeric input
        value = value.replace(',', '.');
        if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
            setDisplayValue(value);
        }
    };

    // Handle input blur and synchronize with the Zustand store
    const handleBlur = () => {
        const parsedValue = parseFloat(displayValue);

        if (isNaN(parsedValue) || parsedValue < 0) {
            setWidth(0); // Set Zustand store width to 0
            setDisplayValue(''); // Clear the input field
        } else if (parsedValue > 3) {
            setWidth(3); // Enforce max width of 3 in the Zustand store
            setDisplayValue('3'); // Update input field to max width
        } else {
            setWidth(parsedValue); // Sync valid input with Zustand store
        }
    };

    // Determine the appropriate class based on displayValue
    const inputClassName = `${styles.widthInputField} ${
        displayValue === '' || parseFloat(displayValue) === 0
            ? styles.widthInputFieldRed
            : styles.widthInputFieldBlack
    }`;

    return {
        displayValue,
        handleWidthChange,
        handleBlur,
        inputClassName,
    };
};

export default useWidth;
