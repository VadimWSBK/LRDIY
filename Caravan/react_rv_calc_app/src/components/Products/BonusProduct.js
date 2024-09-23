import React from 'react';
import { useSelector } from 'react-redux';
import Product_Layout from './Product_Layout';

const BonusProduct = ({ selectedProducts, setSelectedProducts}) => {
    const product = useSelector((state) => state.products.waterproofsealant); // Access product data from Redux store

    return (
        <Product_Layout
            product={product}
            totalArea={totalArea}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
        />
    );
};


BonusProduct.displayName = 'BonusProduct';

export default BonusProduct;
