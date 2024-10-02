// components/Inputs/WidthInput/WidthInput.tsx
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
        type="text"
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

