import React from 'react';
import useLength from '../../../hooks/useLengthInput';
import styles from './LengthInput.module.css';

const LengthInput: React.FC = () => {
  const { displayValue, handleLengthChange, handleBlur, isInvalid } = useLength();

  const inputClassName = `${styles.lengthInputField} ${
    isInvalid ? styles.lengthInputFieldRed : styles.lengthInputFieldBlack
  }`;

  return (
    <div className={styles.lengthInputWrapper}>
      <label htmlFor="caravan-length" className={styles.lengthInputLabel}>
        Enter Length (m):
      </label>
      <input
        type="number" // Change input type to 'number'
        id="caravan-length"
        value={displayValue}
        onChange={(e) => handleLengthChange(e.target.value)}
        onBlur={handleBlur}
        className={inputClassName}
        placeholder="0 - 20"
        step="0.1" // Allow increments of 0.1
        min="0" // Optional: set minimum value if needed
        max="20" // Optional: set maximum value if needed
      />
    </div>
  );
};

export default LengthInput;

