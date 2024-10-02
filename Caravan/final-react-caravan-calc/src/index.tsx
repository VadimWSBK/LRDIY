import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainCalculator from './MainCalculator'; // Your main calculator component

// Create the render function that will be exposed globally
const render = (config: { elementId: string }) => {
  const elementId = config.elementId || 'caravan-calculator-root'; // Default ID if none is provided
  const rootElement = document.getElementById(elementId) as HTMLElement;

  if (!rootElement) {
    console.error(`Element with ID "${elementId}" not found`);
    return;
  }

  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <React.StrictMode>
      <MainCalculator />
    </React.StrictMode>
  );
};

// Expose CaravanCalculator globally
export const CaravanCalculator = { render };
