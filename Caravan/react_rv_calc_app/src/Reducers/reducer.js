// src/store/reducer.js
import * as actionTypes from './actionTypes';

const initialState = {
    length: 6,
    width: 2.5,
    roofType: 'painted',
    totalArea: 15,
    overallTotal: 0,
    discountedPrice: 0,
    subtotal: 0,
    bucketsNeeded: {},
    recommendedVariant: {},
    totalSavings: 0,
    selectedProducts: [], // Track selected products
    isVisible: false, // Track popup visibility
    bucketsNeeded: [],
    recommendedVariant: null,
};

const calculatorReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_LENGTH:
            return { ...state, length: action.payload };
        case actionTypes.SET_WIDTH:
            return { ...state, width: action.payload };
        case actionTypes.SET_ROOF_TYPE:
            return { ...state, roofType: action.payload };
        case actionTypes.SET_TOTAL_AREA:
            return { ...state, totalArea: action.payload };
        case actionTypes.SET_SELECTED_PRODUCTS:
            return { ...state, selectedProducts: action.payload };
        case actionTypes.SET_OVERALL_TOTAL:
            return { ...state, overallTotal: action.payload };
        case actionTypes.SET_TOTAL_SAVINGS:
            return { ...state, totalSavings: action.payload };
        case actionTypes.SET_DISCOUNTED_PRICE:
            return { ...state, discountedPrice: action.payload }

        case actionTypes.SET_SUBTOTAL:
            return {
                ...state,
                subtotal: action.payload,
            };

        case actionTypes.SET_OVERALL_TOTAL:
            return {
                ...state,
                overallTotal: action.payload,
            };

        case actionTypes.SET_DISCOUNTED_PRICE:
            return {
                ...state,
                discountedPrice: action.payload,
            };

        case actionTypes.SET_TOTAL_SAVINGS:
            return {
                ...state,
                totalSavings: action.payload,
            };

        case actionTypes.SET_RECOMMENDED_VARIANT:
            const { productType, variant } = action.payload;
            return {
                ...state,
                recommendedVariants: {
                    ...state.recommendedVariants,
                    [productType]: variant,
                },
            };

        case actionTypes.SET_BUCKETS_NEEDED:
                return {
                    ...state,
                    bucketsNeeded: action.payload, // Update the buckets needed in the store
                };

        case actionTypes.SELECT_PRODUCT:
            return {
                ...state,
                selectedProducts: [...state.selectedProducts, action.payload],
            };

        case actionTypes.DESELECT_PRODUCT:
            return {
                ...state,
                selectedProducts: state.selectedProducts.filter(
                    (product) => product !== action.payload
                ),
            };


        case actionTypes.OPEN_POPUP:
            return {
                ...state,
                isVisible: true, // Set popup visibility to true
            };

        case actionTypes.CLOSE_POPUP:
            return {
                ...state,
                isVisible: false, // Set popup visibility to false
            };
        
        
        case actionTypes.UPDATE_BUCKETS_NEEDED:
            return {
                ...state,
                bucketsNeeded: action.payload,
            };
        case actionTypes.UPDATE_VARIANT:
            return {
                ...state,
                recommendedVariant: action.payload,
            };

        default:
            return state;
    }
};

export default calculatorReducer;
