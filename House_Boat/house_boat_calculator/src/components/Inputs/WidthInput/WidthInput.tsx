import React from 'react';
import useWidth from '../../../hooks/useWidthInput';
import styles from './WidthInput.module.css';

const WidthInput: React.FC = () => {
  const { displayValue, handleWidthChange, handleBlur, isInvalid } = useWidth();

  const inputClassName = `${styles.widthInputField} ${
    isInvalid ? styles.widthInputFieldRed : styles.widthInputFieldBlack
  }`;

  return (
    <div className={styles.widthInputWrapper}>
      <label htmlFor="caravan-width" className={styles.widthInputLabel}>
        Enter Width (m):
      </label>
      <input
        type="number" // Change input type to 'number'
        id="caravan-width"
        value={displayValue}
        onChange={(e) => handleWidthChange(e.target.value)}
        onBlur={handleBlur}
        className={inputClassName}
        placeholder="0 - 10"
        step="0.1" // Allow increments of 0.1
        min="0" // Optional: set minimum value if needed
        max="10" // Optional: set maximum value if needed
      />
    </div>
  );
};

export default WidthInput;

