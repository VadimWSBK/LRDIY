// ProductList.tsx

import React from 'react';
import useStore from '../../../store/useStore'; // Import the useStore hook
import ProductItem from '../ProductItem/ProductItem';
import { Product } from '../../../types/index'; // Import the Product type
import styles from './ProductList.module.css';

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
        <div className={styles.productListContainer}>
            {allProducts.map(({ name, show }, index) => {
                if (!show) return null;

                const productData: Product | undefined = products[name];
                if (!productData) {
                    return (
                        <div key={index} className={styles.productNotFound}>
                            Product not found
                        </div>
                    ); // Fallback UI if product data is not found
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
