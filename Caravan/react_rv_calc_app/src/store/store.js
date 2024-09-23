// src/store/store.js
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import calculatorReducer from './Reducers/reducer'; // Import your custom calculator reducer
import productDetailsReducer from './productDetailsSlice'; // Import the product details slice
import priceCalculationsReducer from './priceCalculationsSlice'; // Import the price calculations slice
import thunk from 'redux-thunk'; // Middleware for handling async actions

// Combine all reducers into a rootReducer
const rootReducer = combineReducers({
    calculator: calculatorReducer, 
    productDetails: productDetailsReducer,
    priceCalculations: priceCalculationsReducer,
});

// Enable Redux DevTools and middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
    rootReducer, 
    composeEnhancers(applyMiddleware(thunk)) // Apply middleware
);

export default store;
