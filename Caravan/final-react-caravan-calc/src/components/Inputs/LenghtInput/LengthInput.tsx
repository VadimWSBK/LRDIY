import React from 'react';
import styles from './LengthInput.module.css';

interface LengthInputProps {
  length: number;
  setLength: (length: number) => void;
}

const LengthInput: React.FC<LengthInputProps> = ({ length, setLength }) => {
  const handleLengthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(',', '.');
    const parsedValue = value === '' ? 0 : Math.min(20, Math.max(0, parseFloat(value) || 0));
    setLength(parsedValue); // Update via prop
  };

  return (
    <div className={styles.lengthInputWrapper}>

        <label htmlFor="caravan-length" className={styles.lengthInputLabel}>
            Enter Length (m):
        </label>
        <input 
            type="number"
            id="caravan-length"
            value={length}
            min="0"
            max="20"
            step="0.1"
            onChange={handleLengthChange}
            placeholder="0 - 20"
            className={styles.lengthInputField}
        />
    </div>
  );
};

export default LengthInput;
