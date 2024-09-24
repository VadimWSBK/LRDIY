// src/store/store.js
import { configureStore } from '@reduxjs/toolkit';
import calculatorReducer from './calculatorSlice';
import productDetailsReducer from './productDetailsSlice';
import priceCalculationsReducer from './priceCalculationsSlice';
import productSelectionReducer from './productSelectionSlice';
import widthReducer from './widthSlice';
import lengthReducer from './lengthSlice';
import { thunk } from 'redux-thunk'; // Use named import for `thunk`

// Configure the Redux store
const store = configureStore({
    reducer: {
        calculator: calculatorReducer,
        productDetails: productDetailsReducer,
        priceCalculations: priceCalculationsReducer,
        productSelection: productSelectionReducer,
        width: widthReducer,
        length: lengthReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(thunk), // Apply middleware using a callback function
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development
});

export default store;
