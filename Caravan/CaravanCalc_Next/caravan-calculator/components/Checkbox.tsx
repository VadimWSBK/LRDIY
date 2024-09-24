// components/Checkbox.tsx

import React from 'react';

// Define the CheckboxProps interface outside of the component
interface CheckboxProps {
  productName: string;
  isSelected: boolean;
  toggleProductSelection: (productName: string) => void;
}

// Use the CheckboxProps interface in the functional component
const Checkbox: React.FC<CheckboxProps> = ({ productName, isSelected, toggleProductSelection }) => {
  const handleToggle = () => {
    toggleProductSelection(productName);
  };

  return (
    <input
      type="checkbox"
      checked={isSelected}
      onChange={handleToggle}
    />
  );
};

export default Checkbox; // Ensure correct export
