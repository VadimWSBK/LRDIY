import React from 'react';
import styles from './WidthInput.module.css';

interface WidthInputProps {
  width: number;
  setWidth: (width: number) => void;
}

const WidthInput: React.FC<WidthInputProps> = ({ width, setWidth }) => {
  const handleWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(',', '.');
    const parsedValue = value === '' ? 0 : Math.min(3, Math.max(0, parseFloat(value) || 0));
    setWidth(parsedValue); // Update via prop
  };

  return (
    <div className={styles.widthInputWrapper}>

        <label htmlFor="caravan-length" className={styles.widthInputLabel}>
            Enter Length (m):
        </label>
        <input 
            type="number"
            id="caravan-width"
            value={width}
            min="0"
            max="3"
            step="0.1"
            onChange={handleWidthChange}
            placeholder="0 - 3"
            className={styles.widthInputField}
        />
    </div>
  );
};

export default WidthInput;
