import React from 'react';
import { useSelector } from 'react-redux';
import Product_Layout from './Product_Layout';


const EtchPrimer = ({ totalArea, selectedProducts, setSelectedProducts }) => {
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

EtchPrimer.displayName = 'etchPrimer'; // Add this line

export default EtchPrimer;
