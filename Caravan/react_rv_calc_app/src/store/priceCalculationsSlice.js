// src/store/priceCalculationsSlice.js
import { createSlice } from '@reduxjs/toolkit';

// Initial state for price calculations
const initialState = {
    overallTotal: 0,
    totalSavings: 0,
    discountedPrice: 0,
    subtotals: {}, // Object to track subtotals of each product by name
};

const priceCalculationsSlice = createSlice({
    name: 'priceCalculations',
    initialState,
    reducers: {
        // Action to update the subtotal for a specific product
        updateSubtotal: (state, action) => {
            const { productName, subtotal } = action.payload;
            
            // Ensure subtotal is a valid number
            if (isNaN(subtotal) || typeof subtotal !== 'number') {
                console.error(`Invalid subtotal value for product: ${productName}`, subtotal);
                return;
            }

            // Update the subtotal for the product
            state.subtotals[productName] = subtotal;

            // Recalculate the overall total, total savings, and discounted price
            state.overallTotal = Object.values(state.subtotals).reduce((total, value) => total + value, 0);
            state.totalSavings = state.overallTotal > 0 ? state.overallTotal * 0.10 : 0; // Calculate 10% savings
            state.discountedPrice = Math.max(state.overallTotal - state.totalSavings, 0); // Ensure non-negative price
        },

        // Optional: Reset all price calculations (for example, on form reset)
        resetCalculations: (state) => {
            state.overallTotal = 0;
            state.totalSavings = 0;
            state.discountedPrice = 0;
            state.subtotals = {};
        },
        
        // Action to update overall total independently (if needed)
        updateOverallTotal: (state) => {
            state.overallTotal = Object.values(state.subtotals).reduce((total, value) => total + value, 0);
        },

        // Action to update total savings independently (if needed)
        updateTotalSavings: (state) => {
            state.totalSavings = state.overallTotal > 0 ? state.overallTotal * 0.10 : 0; // 10% savings calculation
        },

        // Action to update discounted price independently (if needed)
        updateDiscountedPrice: (state) => {
            state.discountedPrice = Math.max(state.overallTotal - state.totalSavings, 0);
        }
    },
});

// Export the action creators
export const { updateSubtotal, resetCalculations, updateOverallTotal, updateTotalSavings, updateDiscountedPrice } = priceCalculationsSlice.actions;

// Export the reducer to be used in the store
export default priceCalculationsSlice.reducer;
