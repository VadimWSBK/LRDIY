// components/ProductItem.tsx

import React from 'react';
import useStore from '../hooks/useStore';
import Checkbox from './Checkbox';
import Popup from './Popup';
import { useBucketCalculations } from '../hooks/useBucketCalculations';
import { Product, BucketCount } from '../types/index';

interface ProductItemProps {
  product: Product;
}

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  const { selectedProducts, setSelectedProducts } = useStore((state) => ({
    selectedProducts: state.selectedProducts as string[],
    setSelectedProducts: state.setSelectedProducts,
  }));

  const toggleProductSelection = (productName: string) => {
    if (selectedProducts.includes(productName)) {
      setSelectedProducts(selectedProducts.filter((name) => name !== productName));
    } else {
      setSelectedProducts([...selectedProducts, productName]);
    }
  };

  if (!product || !product.image || !product.name) {
    return <div>Loading product data...</div>;
  }

  const { bucketsNeeded } = useBucketCalculations(product);

  return (
    <div className="caravan-product-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <label>
          <Checkbox
            productName={product.name}
            isSelected={selectedProducts.includes(product.name)}
            toggleProductSelection={toggleProductSelection}
          />
        </label>
      </div>

      <div className="nested-grid-for-mobile">
        <div className="product-name-and-link-container">
          <div className="product-name">{product.name}</div>
          <div className="info-popup-link-style">
            {product.infoText && <Popup infoText={product.infoText} />}
          </div>
        </div>

        <div className="product-item-container">
          {bucketsNeeded && bucketsNeeded.length > 0 && (
            <div>
              <h4>Items</h4>
              {bucketsNeeded.map((bucket: BucketCount, index: number) => (
                <div key={`${bucket.size}-${index}`}>
                  {bucket.count} x {bucket.size}L Bucket
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
