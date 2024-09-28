// components/Checkbox.tsx
import React from 'react';
import { useStore } from './'; // Import the store
import styles from '../styles/Checkbox.module.css'; // Component styles

interface CheckboxProps {
  productName: string;
  isSelected: boolean;
}

const Checkbox: React.FC<CheckboxProps> = ({ productName, isSelected }) => {
  const { toggleProductSelection } = useStore((state) => ({
    toggleProductSelection: state.toggleProductSelection, // Access the store's toggle function directly
  }));

  const handleToggle = () => {
    toggleProductSelection(productName); // Directly call toggle from Zustand
  };

  return (
<div className={styles.checkboxContainer}>
<input
    type="checkbox"
    className={styles.checkbox}
    checked={isSelected}
    onChange={handleToggle}
    id="custom-checkbox"
/>
</div>
  );
};

export default Checkbox;


