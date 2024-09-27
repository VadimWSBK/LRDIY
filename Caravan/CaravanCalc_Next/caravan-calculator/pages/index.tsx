import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client'; // Import createRoot directly from 'react-dom/client'
import MainCalculator from '../components/MainCalculator';

const CaravanCalculator: React.FC = () => {
  const init = (selector: string) => {
    console.log('Init function called with selector:', selector);
    const container = document.querySelector(selector);
    if (container) {
      console.log('Container found, rendering MainCalculator');
      // Use createRoot to render the component
      const root = createRoot(container); // This line is corrected
      root.render(<MainCalculator />);
    } else {
      console.error('Container not found for selector:', selector);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      console.log("Setting global CaravanCalculatorWidget object");
      (window as any).CaravanCalculatorWidget = {
        init,
      };
    } else {
      console.error("Window is undefined");
    }
  }, []);

  return (
    <div>
      <MainCalculator />
    </div>
  );
};

export default CaravanCalculator;
