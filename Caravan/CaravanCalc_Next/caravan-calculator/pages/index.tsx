// pages/index.tsx

import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import MainCalculator from '../components/MainCalculator'; // Adjust the path if needed

const HomePage: React.FC = () => {
  // Create an init function to render the calculator
  const init = (selector: string) => {
    console.log('Init function called with selector:', selector);
    const container = document.querySelector(selector);
    if (container) {
      console.log('Container found, rendering MainCalculator');
      ReactDOM.render(<MainCalculator />, container);
    } else {
      console.error('Container not found for selector:', selector);
    }
  };

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== 'undefined') {
      // Expose the init method on the global window object
      (window as any).CaravanCalculatorWidget = {
        init, // Ensure the init function is being correctly assigned
      };
    }
  }, []); // Empty dependency array ensures this runs only on mount

  return (
    <div>
      <MainCalculator />
    </div>
  );
};

export default HomePage;
