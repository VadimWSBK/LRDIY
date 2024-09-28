import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import MainCalculator from '../components/MainCalculator';

const init = (selector: string) => {
  const container = document.querySelector(selector);
  if (container) {
    const root = createRoot(container);
    root.render(<MainCalculator />);
  }
};

const CaravanCalculator: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).CaravanCalculatorWidget = { init };
    }
  }, []);

  return null; // Avoid rendering anything directly
};

export default CaravanCalculator;
