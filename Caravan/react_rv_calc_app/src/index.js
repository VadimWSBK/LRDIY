import React from 'react';
import ReactDOM from 'react-dom/client'; // Import from 'react-dom/client'
import { Provider } from 'react-redux';
import store from './store/store'; // Ensure the path is correct
import Calculator from './App'; // Ensure this path points to your main component

// Create the root element
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement); // Use createRoot instead of ReactDOM.render

root.render(
    <Provider store={store}>
        <Calculator /> {/* Ensure Calculator is the main component you want to render */}
    </Provider>
);
