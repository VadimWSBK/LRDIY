// ProductList.tsx
import React from 'react';
import ProductItem from '../ProductItem/ProductItem';
import styles from './ProductList.module.css';
import { ProductListProps } from '../../../types/index';

const ProductList: React.FC<ProductListProps> = ({
  products,
  onToggleSelection,
}) => {
  return (
    <div className={styles.productListContainer}>
      {products.map((product) => {
        if (!product.show) return null;

        return (
          <ProductItem
            key={product.productKey}
            product={product}
            onToggleSelection={(isChecked) =>
              onToggleSelection(product.productKey, isChecked)
            }
          />
        );
      })}
    </div>
  );
};

export default ProductList;
