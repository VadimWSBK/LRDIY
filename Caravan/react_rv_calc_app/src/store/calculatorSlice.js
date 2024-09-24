// src/store/calculatorSlice.js
import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    length: 6,
    width: 2.5,
    roofType: 'painted',
    totalArea: 15,
    overallTotal: 0,
    discountedPrice: 0,
    subtotal: 0,
    bucketsNeeded: {},
    recommendedVariants: {}, // Store recommended variants by product type
    totalSavings: 0,
    selectedProducts: [
        'Waterproof Sealant',
        'Geo Textile',
        'Sealer / Primer',
        'Thermal Coating',
        'Bonus Product',
        'BONUS',
    ], // Initialize with default selected products
    deselectedProducts: [], // Track deselected products separately
    isVisible: false, // Track popup visibility
};

const calculatorSlice = createSlice({
    name: 'calculator',
    initialState,
    reducers: {
        setLength: (state, action) => {
            state.length = action.payload;
            state.totalArea = state.length * state.width; // Update total area whenever length changes
        },
        setWidth: (state, action) => {
            state.width = action.payload;
            state.totalArea = state.length * state.width; // Update total area whenever width changes

        },
        setRoofType: (state, action) => {
            state.roofType = action.payload;

            // Manage product selection based on roof type
            if (action.payload === 'painted') {
                // Add 'Sealer / Primer' if it was not manually deselected
                if (!state.deselectedProducts.includes('Sealer / Primer') &&
                    !state.selectedProducts.includes('Sealer / Primer')) {
                    state.selectedProducts.push('Sealer / Primer');
                }
                // Remove 'Etch Primer' from selectedProducts
                state.selectedProducts = state.selectedProducts.filter(
                    product => product !== 'Etch Primer'
                );
            } else if (action.payload === 'raw metal') {
                // Add 'Etch Primer' if it was not manually deselected
                if (!state.deselectedProducts.includes('Etch Primer') &&
                    !state.selectedProducts.includes('Etch Primer')) {
                    state.selectedProducts.push('Etch Primer');
                }
                // Remove 'Sealer / Primer' from selectedProducts
                state.selectedProducts = state.selectedProducts.filter(
                    product => product !== 'Sealer / Primer'
                );
            }
        },
        updateTotalArea: (state) => {
            state.totalArea = state.length * state.width;
        
        },
        selectProduct: (state, action) => {
            // Remove from deselected list if it was deselected
            state.deselectedProducts = state.deselectedProducts.filter(
                (product) => product !== action.payload
            );
            // Add to selectedProducts if not already present
            if (!state.selectedProducts.includes(action.payload)) {
                state.selectedProducts.push(action.payload);
            }
        },
        deselectProduct: (state, action) => {
            // Add to deselected list if not already present
            if (!state.deselectedProducts.includes(action.payload)) {
                state.deselectedProducts.push(action.payload);
            }
            // Remove from selectedProducts
            state.selectedProducts = state.selectedProducts.filter(
                (product) => product !== action.payload
            );
        },
        setRecommendedVariant: (state, action) => {
            const { productType, variant } = action.payload;
            state.recommendedVariants[productType] = variant; // Directly update the recommended variant
        },
        setBucketsNeeded: (state, action) => {
            const { productName, buckets } = action.payload;
            state.bucketsNeeded[productName] = buckets; // Store bucketsNeeded by product nam
        },
    },
});

// Export the action creators
export const {
    setLength, 
    setWidth,
    setRoofType,
    updateTotalArea,
    selectProduct,
    deselectProduct,
    setRecommendedVariant,
} = calculatorSlice.actions;

// Export the reducer

export default calculatorSlice.reducer;
