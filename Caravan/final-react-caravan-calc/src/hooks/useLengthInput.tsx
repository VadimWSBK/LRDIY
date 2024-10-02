// hooks/useLength.ts
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const useLength = () => {
  const length = useStore((state) => state.length);
  const setLength = useStore((state) => state.setLength);

  const [displayValue, setDisplayValue] = useState<string>(length.toString());

  useEffect(() => {
    setDisplayValue(length.toString());
  }, [length]);

  const handleLengthChange = (value: string) => {
    value = value.replace(',', '.');

    // Allow empty string and valid decimal numbers up to two decimal places
    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      const parsedValue = parseFloat(value);

      if (!isNaN(parsedValue)) {
        if (parsedValue > 20) {
          // If value exceeds 20, set to 20
          setLength(20);
          setDisplayValue('20');
        } else if (parsedValue <= 0) {
          // If value is zero or negative, set length to zero
          setLength(0);
          setDisplayValue(value);
        } else {
          // Valid value within range
          setLength(parsedValue);
          setDisplayValue(value);
        }
      } else {
        // If parsedValue is NaN (e.g., empty input), update displayValue but not length
        setDisplayValue(value);
        setLength(0);
      }
    }
  };

  const handleBlur = () => {
    // Additional validation on blur if necessary
    if (displayValue === '') {
      setLength(0);
      setDisplayValue('');
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
