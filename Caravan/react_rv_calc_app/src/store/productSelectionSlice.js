// src/store/productSelectionSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { createSelector } from 'reselect';


const initialState = {
    selectedProducts: [], // Initialize as an empty array
};

const productSelectionSlice = createSlice({
    name: 'productSelection',
    initialState,
    reducers: {
        selectProduct: (state, action) => {
            state.selectedProducts.push(action.payload);
        },
        deselectProduct: (state, action) => {
            state.selectedProducts = state.selectedProducts.filter(
                (product) => product !== action.payload
            );
        },
    },
});

export const { selectProduct, deselectProduct } = productSelectionSlice.actions;

export const selectTotalArea = (state) => state.calculator.totalArea;
export const selectBucketsNeededState = (state) => state.calculator.bucketsNeeded;

export const selectBucketsNeeded = createSelector(
    [selectBucketsNeededState, (_, productName) => productName],
    (bucketsNeededState, productName) => {
        return bucketsNeededState[productName] || [];
    }
);

  export default productSelectionSlice.reducer;