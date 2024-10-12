import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const useLength = () => {
  const length = useStore((state) => state.length);
  const setLength = useStore((state) => state.setLength);

  const [displayValue, setDisplayValue] = useState<string>(length.toString());

  useEffect(() => {
    // Update displayValue when length changes, ensuring it displays correctly with a dot
    setDisplayValue(length.toString());
  }, [length]);

  const handleLengthChange = (value: string) => {
    // Replace comma with a dot for consistency
    value = value.replace(',', '.');

    // Allow empty string and valid decimal numbers without leading zeros and up to two decimal places
    if (value === '' || /^\d*(\.\d{0,2})?$/.test(value)) {
      setDisplayValue(value); // Update the display value
      const parsedValue = parseFloat(value);

      if (!isNaN(parsedValue)) {
        if (parsedValue > 20) {
          // If value exceeds 20, set to 20
          setLength(20);
          setDisplayValue('20');
        } else if (parsedValue < 0) {
          // If value is negative, set length to zero
          setLength(0);
          setDisplayValue('0');
        } else {
          // Valid value within range
          setLength(parsedValue);
        }
      } else {
        setLength(0); // If the input is empty or invalid, set the length to zero
      }
    }
  };

  const handleBlur = () => {
    if (displayValue === '' || isNaN(parseFloat(displayValue))) {
      setLength(0);
      setDisplayValue('0');
    } else {
      // Ensure the value is formatted with a consistent decimal point and limited to 2 decimal places
      const formattedValue = parseFloat(displayValue).toFixed(2);
      setDisplayValue(formattedValue);
    }
  };

  const isInvalid = displayValue === '' || parseFloat(displayValue) === 0;

  return {
    displayValue,
    handleLengthChange,
    handleBlur,
    isInvalid,
  };
};

export default useLength;
