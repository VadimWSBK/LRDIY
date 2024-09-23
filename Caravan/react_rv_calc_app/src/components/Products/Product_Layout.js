import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Checkbox from '../CalculatorFunctions/Checkbox';
import InfoPopup from '../CalculatorFunctions/InfoPopup';
import ProductCalculations from '../CalculatorFunctions/ProductCalculations';
import { updateSubtotal } from '../../store/priceCalculationsSlice'; // Import the updateSubtotal action

const Product_Layout = ({ 
    product, 
    totalArea, 
    selectedProducts, 
    setSelectedProducts 
}) => {
    const dispatch = useDispatch(); // Initialize dispatch
    const productSubtotals = useSelector(state => state.priceCalculations.subtotals); // Access subtotals from Redux
    const localSubtotal = productSubtotals[product.name] || 0; // Get the local subtotal for this product

    // Function to update subtotal using Redux action
    const handleUpdateSubtotal = (newSubtotal) => {
        if (localSubtotal !== newSubtotal) {
            // Dispatch action only if subtotal has changed to prevent unnecessary re-renders
            dispatch(updateSubtotal({ productName: product.name, subtotal: newSubtotal }));
        }
    };

    // Check if product data is missing or invalid
    if (!product || !product.image || !product.name) {
        return <div>Loading product data...</div>; // Fallback UI while data is loading or missing
    }

    return (
        <div className="caravan-product-container">
            {/* COLUMN 1 - Product Image and Checkbox */}
            <div className="product-image">
                <img src={product.image} alt={product.name} />
                <label>
                    <Checkbox
                        productName={product.name}
                        selectedProducts={selectedProducts}
                        setSelectedProducts={setSelectedProducts}
                    />
                </label>
            </div>

            {/* COLUMN 2 - Product Name and Info Link */}
            <div className="nested-grid-for-mobile">
                <div className="product-name-and-link-container">
                    <div className="product-name">
                        {product.name}
                    </div>
                    <div className="info-popup-link-style">
                        <InfoPopup infoText={product.infoText} />
                    </div>
                </div>

                {/* COLUMN 3 - Product Calculations */}
                <div className="product-item-container">
                    <ProductCalculations
                        totalArea={totalArea}
                        setSubtotal={handleUpdateSubtotal} // Update subtotal using Redux
                        productVariants={product.variants} // Pass variants if available
                        coveragePerLitre={product.coveragePerLitre} // Pass coverage per litre for bucket-based products
                        productBuckets={product.buckets} // Pass bucket details if available
                        productType={product.type} // Pass the product type (e.g., 'geoTextile' or 'bonusProduct')
                    />
                </div>
            </div>

            {/* COLUMN 4 - Subtotal Display */}
            <div className="subtotal-price-container">
                <div className="subtotal-price">
                    <strong>${localSubtotal.toFixed(2)}</strong> {/* Display the calculated subtotal from Redux */}
                </div>
            </div>
        </div>
    );
};

export default Product_Layout;
