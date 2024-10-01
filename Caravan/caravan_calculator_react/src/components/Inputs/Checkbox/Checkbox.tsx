// Checkbox.tsx
import React from 'react';
import styles from './Checkbox.module.css';

interface CheckboxProps {
    productName: string;
    isSelected: boolean;
    onChange: () => void; // Add onChange as a required prop
}

const Checkbox: React.FC<CheckboxProps> = ({ productName, isSelected, onChange }) => {

    const handleToggle = () => {
        onChange(); // Call the onChange prop when the checkbox is toggled
    };

    return (
        <div className={styles.checkboxContainer}>
            <input
                type="checkbox"
                className={styles.checkbox}
                checked={isSelected}
                onChange={handleToggle} // Use handleToggle function to manage onChange
                id={`custom-checkbox-${productName}`}
            />
        </div>
    );
};

export default Checkbox;
