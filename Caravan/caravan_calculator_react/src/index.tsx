import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import MainCalculator from './MainCalculator/MainCalculator';
import ErrorBoundary from './components/ErrorBoundary';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <ErrorBoundary>
      <React.StrictMode>
        <MainCalculator />
      </React.StrictMode>
    </ErrorBoundary>
  );
} else {
  console.error("Root element not found. Unable to render the application.");
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
