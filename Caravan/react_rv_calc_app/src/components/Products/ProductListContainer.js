import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Product_Layout from './Product_Layout'; 
import { selectProducts } from '../../store/productDetailsSlice'; // Import the selector to access products from Redux store
import { updateSubtotal } from '../../store/priceCalculationsSlice'; // Import the action to update subtotal

const ProductListContainer = ({ 
    totalArea, 
    roofType, 
    selectedProducts, 
    setSelectedProducts 
}) => {
    const products = useSelector(selectProducts); // Use Redux selector to get all products from the store
    const dispatch = useDispatch(); // Use dispatch to update the Redux store

    // Function to update subtotal for each product in Redux store
    const handleUpdateSubtotal = (productName, newSubtotal) => {
        dispatch(updateSubtotal({ productName, subtotal: newSubtotal }));
    };

    // Determine which products to show based on the roof type
    const allProducts = [
        { name: 'Waterproof Sealant', show: true },
        { name: 'Geo Textile', show: true },
        { name: 'Sealer Primer', show: roofType === 'painted' },
        { name: 'Etch Primer', show: roofType === 'raw metal' },
        { name: 'Thermal Coating', show: true },
        { name: 'Bonus Product', show: true },
    ];

    return (
        <div className="caravan-product-list-container">
            {allProducts.map(({ name, show }, index) => {
                if (!show) return null;

                const productData = products[name.toLowerCase().replace(/\s/g, '')]; // Normalize product name to access the product
                if (!productData) {
                    return <div key={index}>Product not found</div>; // Fallback UI if product data is not found
                }

                return (
                    <Product_Layout 
                        key={index}
                        product={productData} 
                        totalArea={totalArea} 
                        selectedProducts={selectedProducts} 
                        setSelectedProducts={setSelectedProducts} 
                        setSubtotal={(newSubtotal) => handleUpdateSubtotal(name, newSubtotal)} // Function to update each product's subtotal in Redux
                    />
                );
            })}
        </div>
    );
};

export default ProductListContainer;
