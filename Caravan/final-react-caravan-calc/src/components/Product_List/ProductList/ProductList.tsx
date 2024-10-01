import React from 'react';
import useStore from '../../../store/useStore'; // Zustand store hook
import ProductItem from '../ProductItem/ProductItem'; // Import ProductItem component
import { products } from '../../../utils/products'; // Assuming your products data is here
import styles from './ProductList.module.css'; // Import CSS

const ProductList: React.FC = () => {
    const roofType = useStore((state) => state.roofType); // Access the state once

    // Memoize the product list based on the roofType
    const isNotNull = <T,>(value: T | null): value is T => value !== null;

    const filteredProducts = React.useMemo(() => {
        return Object.entries(products)
            .map(([key, product]) => {
                // Logic for filtering products based on roofType
                if (key === 'sealerPrimer' && roofType !== 'painted') return null;
                if (key === 'etchPrimer' && roofType !== 'raw metal') return null;
                return product;
            })
            .filter(isNotNull); // Use type guard to remove null values and ensure proper typing
    }, [roofType]);// Only recalculate when roofType changes

    return (
        <div className={styles.productListContainer}>
            {filteredProducts.map((product) => (
                <ProductItem 
                    key={product.name}  // Use product name as a unique key
                    product={product}   // Pass the entire product object
                />
            ))}
        </div>
    );
};

export default ProductList;
