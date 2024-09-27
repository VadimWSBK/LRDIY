// ProductList.tsx

import React from 'react';
import useStore from '../hooks/useStore';
import ProductItem from './ProductItem';
import { Product } from '../types/index'; // Import the Product type

const ProductList: React.FC = () => {
    const { totalArea, roofType, products } = useStore((state) => ({
        totalArea: state.totalArea,
        roofType: state.roofType,
        products: state.products,
    }));

    const allProducts = [
        { name: 'waterproofSealant', show: true },
        { name: 'geoTextile', show: true },
        { name: 'sealerPrimer', show: roofType === 'painted' },
        { name: 'etchPrimer', show: roofType === 'raw metal' },
        { name: 'thermalCoating', show: true },
        { name: 'bonusProduct', show: true },
    ];

    return (
        <div className="caravan-product-list-container">
            {allProducts.map(({ name, show }, index) => {
                if (!show) return null;

                const productData: Product | undefined = products[name];
                if (!productData) {
                    console.error(`Product not found for: ${name}`);
                    return <div key={index}>Product not found</div>; // Fallback UI if product data is not found
                }

                return (
                    <ProductItem 
                        key={index}
                        product={productData} 
                        totalArea={totalArea} // Pass the totalArea prop correctly
                    />
                );
            })}
        </div>
    );
};

export default ProductList;
