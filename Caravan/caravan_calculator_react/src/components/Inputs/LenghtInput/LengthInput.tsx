import React from 'react';
import useLength from '../../../hooks/useLength'; // Import the custom hook
import styles from './LengthInput.module.css'; // Ensure the path is correct relative to LengthInput.tsx

const LengthInput: React.FC = () => {
    const { displayValue, handleLengthChange, handleBlur } = useLength();

    return (
        <div className={styles.lengthInputWrapper}>
            <label htmlFor="caravan-length" className={styles.lengthInputLabel}>
                Enter Length (m):
            </label>
            <input
                type="number"
                min="0"
                max="20"
                step="0.01"
                value={displayValue}
                onChange={(e) => handleLengthChange(e.target.value)}
                onBlur={handleBlur}
                placeholder="0 - 20"
            />
        </div>
    );
};

export default LengthInput;
