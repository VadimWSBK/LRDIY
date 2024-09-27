// components/Checkbox.tsx
import React from 'react';
import useStore from '../hooks/useStore'; // Zustand store

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
    <input
      type="checkbox"
      checked={isSelected}
      onChange={handleToggle}
    />
  );
};

export default Checkbox;
