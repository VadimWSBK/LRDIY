import React from 'react';
import ReactDOM from 'react-dom/client';
import MainCalculator from '../components/MainCalculator';

// Extend the Window interface
declare global {
  interface Window {
    CaravanCalculatorWidget: {
      init: (selector: string) => void;
    };
  }
}

const init = (selector: string) => {
  console.log('Init function called with selector:', selector);
  const container = document.querySelector(selector);
  if (container) {
    console.log('Container found, rendering MainCalculator');
    const root = ReactDOM.createRoot(container);
    root.render(<MainCalculator />);
  } else {
    console.error('Container not found for selector:', selector);
  }
};

// Set the global object
if (typeof window !== 'undefined') {
  console.log("Setting global CaravanCalculatorWidget object");
  window.CaravanCalculatorWidget = {
    init,
  };
}

// Export the MainCalculator component
export default MainCalculator;
