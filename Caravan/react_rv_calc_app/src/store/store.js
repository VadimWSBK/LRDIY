// src/store/store.js
import { configureStore } from '@reduxjs/toolkit'; // Import the correct method
import calculatorReducer from './Reducers/reducer'; // Import your custom calculator reducer
import productDetailsReducer from './productDetailsSlice'; // Import the product details slice
import priceCalculationsReducer from './priceCalculationsSlice'; // Import the price calculations slice
import widthReducer from './widthSlice'; // Import the width reducer
import lengthReducer from './lengthSlice'; // Import the length reducer

// Configure the store using Redux Toolkit's configureStore method
const store = configureStore({
    reducer: {
        calculator: calculatorReducer, 
        productDetails: productDetailsReducer,
        priceCalculations: priceCalculationsReducer,
        width: widthReducer,
        length: lengthReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(), // Add any additional middleware here if needed
    devTools: process.env.NODE_ENV !== 'production', // Enable Redux DevTools in development mode
});

export default store;
