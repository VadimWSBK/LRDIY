// src/components/Products/Product_Layout.js
import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'; // Import shallowEqual from react-redux
import Checkbox from '../CalculatorFunctions/Checkbox';
import InfoPopup from '../CalculatorFunctions/InfoPopup';
import { selectProduct, deselectProduct } from '../../store/calculatorSlice';
import { selectBucketsNeeded } from '../../store/productSelectionSlice'; // Import the memoized selector
import { useVariantCalculations } from '../CalculatorFunctions/Variant_Calculations';

const Product_Layout = ({ 
    product, 
    totalArea, 
    selectedProducts 
}) => {
    const dispatch = useDispatch();

    // Function to toggle product selection
    const toggleProductSelection = (productName) => {
        if (selectedProducts.includes(productName)) {
            dispatch(deselectProduct(productName)); // Deselect the product
        } else {
            dispatch(selectProduct(productName)); // Select the product
        }
    };

    // Use memoized selector to avoid returning new references on each render
    const bucketsNeeded = useSelector(
        (state) => selectBucketsNeeded(state, product.name),
        shallowEqual // Using shallowEqual to prevent unnecessary re-renders
    );
    
    const { recommendedVariant } = useVariantCalculations(totalArea, product.variants, product.name);

    // Check if product is undefined or missing properties
    if (!product || !product.image || !product.name) {
        return <div>Loading product data...</div>; // Fallback UI while data is loading or missing
    }

    return (
        <div className="caravan-product-container">
            {/* ------ COLUMN 1 - IMG AND CHECKBOX ------ */}
            <div className='product-image'>
                <img src={product.image} alt={product.name} />
                <label>
                    <Checkbox
                        productName={product.name}
                        isSelected={selectedProducts.includes(product.name)} // Use boolean for selection state
                        toggleProductSelection={toggleProductSelection} // Use toggle function for selection management
                    />
                </label>
            </div>

            {/* ------ COLUMN 2 - NAME AND INFOLINK ------ */}
            <div className='nested-grid-for-mobile'>
                <div className='product-name-and-link-container'>
                    <div className="product-name">
                        {product.name}
                    </div>
                    <div className='info-popup-link-style'>
                        <InfoPopup infoText={product.infoText} />
                    </div>
                </div>

                {/* ------ COLUMN 3 - ITEMS ------- */}
                <div className="product-item-container">
                    {bucketsNeeded.length > 0 && (
                        <div>
                            <h4>Items</h4>
                            {bucketsNeeded.map((bucket, index) => (
                                // Ensure a unique key for each bucket
                                <div key={`${bucket.size}-${index}`}>
                                    {bucket.count} x {bucket.size}L Bucket
                                </div>
                            ))}
                        </div>
                    )}

                    {recommendedVariant && (
                        <div>
                            <h4>Items</h4>
                            1 x {recommendedVariant.name}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Product_Layout;