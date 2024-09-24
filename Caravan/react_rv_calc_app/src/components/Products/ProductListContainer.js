import React from 'react';
import { useSelector } from 'react-redux';
import Product_Layout from './Product_Layout'; 
import { selectProducts } from '../../store/productDetailsSlice';

const ProductListContainer = ({ totalArea, roofType }) => {
    const products = useSelector(selectProducts); // Get all products from the store
    const selectedProducts = useSelector(state => state.calculator.selectedProducts); // Get selected products from Redux store

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

                const normalizedProductName = name.toLowerCase().replace(/\s/g, ''); // Normalize product name
                const productData = products[normalizedProductName]; // Access the product using normalized name

                if (!productData) {
                    console.error(`Product not found for: ${normalizedProductName}`);
                    return <div key={index}>Product not found</div>; // Fallback UI if product data is not found
                }

                return (
                    <Product_Layout 
                        key={index}
                        product={productData} 
                        totalArea={totalArea} 
                        selectedProducts={selectedProducts} 
                    />
                );
            })}
        </div>
    );
};

export default ProductListContainer;
