import { useState, useEffect } from 'react';
import useStore from '../store/useStore';

const useWidth = () => {
  const width = useStore((state) => state.width);
  const setWidth = useStore((state) => state.setWidth);

  const [displayValue, setDisplayValue] = useState<string>(width.toString());

  useEffect(() => {
    // Update displayValue when width changes, ensuring the decimal separator is always a period
    setDisplayValue(width.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      useGrouping: false,
    }));
  }, [width]);

  const handleWidthChange = (value: string) => {
    // Replace comma with a decimal point for internal consistency
    value = value.replace(',', '.');

    // Allow empty string and valid decimal numbers without leading zeros and up to two decimal places
    if (value === '' || /^(0|[1-9]\d*)(\.\d{0,2})?$/.test(value)) {
      const parsedValue = parseFloat(value);

      if (!isNaN(parsedValue)) {
        if (parsedValue > 3) {
          // If value exceeds 3, set to 3
          setWidth(3);
          setDisplayValue('3');
        } else if (parsedValue < 0) {
          // If value is negative, set width to zero
          setWidth(0);
          setDisplayValue('0');
        } else {
          // Valid value within range
          setWidth(parsedValue);
          setDisplayValue(value);
        }
      } else {
        // If parsedValue is NaN (e.g., empty input), update displayValue but not width
        setDisplayValue(value);
        setWidth(0);
      }
    }
  };

  const handleBlur = () => {
    if (displayValue === '') {
      setWidth(0);
      setDisplayValue('0');
    } else {
      // Format the value to ensure consistent decimal representation
      const formattedValue = parseFloat(displayValue).toLocaleString('en-US', {
        minimumFractionDigits: 0,
        maximumFractionDigits: 2,
        useGrouping: false,
      });
      setDisplayValue(formattedValue);
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
