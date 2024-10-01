import React from 'react';
import useWidth from '../../../hooks/useWidth'; // Import the custom hook
import styles from './WidthInput.module.css'; // Import component styles

const WidthInput: React.FC = () => {
    const { displayValue, handleWidthChange, handleBlur, inputClassName } = useWidth();

    return (
        <div className={styles.widthInputWrapper}>
            <label htmlFor="caravan-width" className={styles.widthInputLabel}>
                Enter Width (m):
            </label>
            <input
                type="text" // Use "text" for better input control
                id="caravan-width"
                value={displayValue}
                onChange={(e) => handleWidthChange(e.target.value)}
                onBlur={handleBlur}
                className={inputClassName}
                placeholder="0 - 3"
            />
        </div>
    );
};

export default WidthInput;
