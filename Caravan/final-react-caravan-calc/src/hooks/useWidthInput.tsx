// hooks/useWidth.ts
import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const useWidth = () => {
  const width = useStore((state) => state.width);
  const setWidth = useStore((state) => state.setWidth);

  const [displayValue, setDisplayValue] = useState<string>(width.toString());

  useEffect(() => {
    setDisplayValue(width.toString());
  }, [width]);

  const handleWidthChange = (value: string) => {
    value = value.replace(',', '.');

    if (value === '' || /^\d*\.?\d{0,2}$/.test(value)) {
      const parsedValue = parseFloat(value);

      if (!isNaN(parsedValue)) {
        if (parsedValue > 3) {
          // If value exceeds 3, set to 3
          setWidth(3);
          setDisplayValue('3');
        } else if (parsedValue <= 0) {
          // If value is zero or negative, set width to zero
          setWidth(0);
          setDisplayValue(value);
        } else {
          // Valid value within range
          setWidth(parsedValue);
          setDisplayValue(value);
        }
      } else {
        // If parsedValue is NaN, update displayValue but not width
        setDisplayValue(value);
        setWidth(0);
      }
    }
  };

  const handleBlur = () => {
    // Additional validation on blur if necessary
    if (displayValue === '') {
      setWidth(0);
      setDisplayValue('');
    }
  };

  const isInvalid = displayValue === '' || parseFloat(displayValue) === 0;

  return {
    displayValue,
    handleWidthChange,
    handleBlur,
    isInvalid,
  };
};

export default useWidth;
