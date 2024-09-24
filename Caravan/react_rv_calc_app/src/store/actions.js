// src/store/actions.js
import * as actionTypes from './actionTypes';

export const setLength = (length) => ({
    type: actionTypes.SET_LENGTH,
    payload: length,
});

export const setWidth = (width) => ({
    type: actionTypes.SET_WIDTH,
    payload: width,
});

export const setRoofType = (roofType) => ({
    type: actionTypes.SET_ROOF_TYPE,
    payload: roofType,
});

export const setTotalArea = (totalArea) => ({
    type: actionTypes.SET_TOTAL_AREA,
    payload: totalArea,
});

export const setSelectedProducts = (products) => ({
    type: actionTypes.SET_SELECTED_PRODUCTS,
    payload: products,
});

export const setOverallTotal = (total) => ({
    type: actionTypes.SET_OVERALL_TOTAL,
    payload: total,
});

export const setTotalSavings = (savings) => ({
    type: actionTypes.SET_TOTAL_SAVINGS,
    payload: savings,
});

export const setDiscountedPrice = (price) => ({
    type: actionTypes.SET_DISCOUNTED_PRICE,
    payload: price,
});

// Action to set the recommended variant
export const setRecommendedVariant = (variant) => ({
    type: actionTypes.SET_RECOMMENDED_VARIANT,
    payload: variant, // Directly passing the variant
});

// Action to set the calculated buckets
export const setBucketsNeeded = (buckets) => ({
    type: actionTypes.SET_BUCKETS_NEEDED,
    payload: buckets,
});

// Action to set the subtotal
export const setSubtotal = (subtotal) => ({
    type: actionTypes.SET_SUBTOTAL,
    payload: subtotal,
});




// Action to select and deselect products
export const selectProduct = (productName) => ({
    type: actionTypes.SELECT_PRODUCT,
    payload: productName,
});

export const deselectProduct = (productName) => ({
    type: actionTypes.DESELECT_PRODUCT,
    payload: productName,
});


export const updateBucketsNeeded = (bucketsNeeded) => ({
    type: actionTypes.UPDATE_BUCKETS_NEEDED,
    payload: bucketsNeeded,
});

export const updateVariant = (variant) => ({
    type: actionTypes.UPDATE_VARIANT,
    payload: variant,
});


// Action to open the popup
export const openPopup = () => ({
    type: actionTypes.OPEN_POPUP,
});

export const closePopup = () => ({
    type: actionTypes.CLOSE_POPUP,
});

