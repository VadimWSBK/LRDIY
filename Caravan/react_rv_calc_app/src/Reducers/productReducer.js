// reducers/productReducer.js
const initialState = {
    products: [],
    overallTotal: 0,
    totalSavings: 0,
};

const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'SET_OVERALL_TOTAL':
            return { ...state, overallTotal: action.payload };
        case 'SET_TOTAL_SAVINGS':
            return { ...state, totalSavings: action.payload };
        default:
            return state;
    }
};

export default productReducer;
