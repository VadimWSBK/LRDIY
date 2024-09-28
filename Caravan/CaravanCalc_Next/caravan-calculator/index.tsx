import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MainCalculator from './components/MainCalculator';

// Define the init function globally so it can be accessed from outside
const init = (selector: string) => {
  const container = document.querySelector(selector);
  if (container) {
    // Use createRoot to render the component
    const root = createRoot(container);
    root.render(<MainCalculator />);
  } else {
    console.error(`Container not found for selector: ${selector}`);
  }
};

const CaravanCalculator: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Set the global object with the init function
      (window as any).CaravanCalculatorWidget = {
        init: (selector: string) => {
          try {
            init(selector); // Call the init function
          } catch (error) {
            console.error('Error during initialization:', error);
          }
        },
      };
    } else {
      console.error('Window object is not available.');
    }
  }, []);

  // Return null as this component does not render anything directly
  return null;
};

export default CaravanCalculator;
