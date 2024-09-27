// components/ProductItem.tsx
import React, { useEffect } from 'react';
import useStore from '../hooks/useStore';
import Checkbox from './Checkbox';
import Popup from './Popup';
import { Product, BucketCount } from '../types/index';
import { useBucketCalculations } from '../hooks/useBucketCalculations';
import useVariantCalculations from '../hooks/useVariantCalculations';

interface ProductItemProps {
  product: Product;
  totalArea: number;
}

const ProductItem: React.FC<ProductItemProps> = ({ product, totalArea }) => {
  const {
    selectedProducts,
    setBucketCost,
    setVariantCost,
  } = useStore((state) => ({
    selectedProducts: state.selectedProducts,
    setBucketCost: state.setBucketCost,
    setVariantCost: state.setVariantCost,
  }));

  // Check if product is selected
  const isSelected = selectedProducts.includes(product.name);

  // Use custom hook to get the updated bucket calculations
  const { bucketsNeeded } = useBucketCalculations(product);

  // Use custom hook to get the recommended variant calculations
  const { recommendedVariant } = useVariantCalculations({
    totalArea,
    productVariants: product.variants,
    type: product.name,
  });

  // Calculate bucket cost for the product only if the product has variants with size
  const bucketCost = product.variants[0]?.size
    ? bucketsNeeded.reduce((total, bucket) => total + bucket.count * bucket.price, 0)
    : 0;

  // Calculate variant cost for the product only if the product has variants with a variant property
  const variantCost = product.variants[0]?.variant
    ? recommendedVariant?.variant
      ? recommendedVariant.variant.price * recommendedVariant.quantity
      : 0
    : 0;

  // Store bucket cost and variant cost in Zustand store
  useEffect(() => {
    setBucketCost({ productName: product.name, cost: bucketCost });
    setVariantCost({ productName: product.name, cost: variantCost });
  }, [bucketCost, variantCost, product.name, setBucketCost, setVariantCost]);

  // Check if product has buckets or variants
  const hasBuckets = bucketsNeeded && bucketsNeeded.length > 0;
  const hasVariant = recommendedVariant && recommendedVariant.variant !== null;



  
  return (
    <div className="caravan-product-container">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <label>
          <Checkbox productName={product.name} isSelected={isSelected} />
        </label>
      </div>

      <div className="nested-grid-for-mobile">
        <div className="product-name-and-link-container">
          <div className="product-name">{product.name}</div>
          <div className="info-popup-link-style">
            {product.infoText && (
              <Popup id={`${product.name}-popup`} infoText={product.infoText} />
            )}
          </div>
        </div>

        <div className="product-item-container">
          {totalArea === 0 ? (
            <div className="no-items-needed">No items needed.</div>
          ) : hasBuckets ? (
            <div className="product-item">
              <h4>Items</h4>
              {bucketsNeeded.map((bucket: BucketCount, index: number) => (
                <div 
                  key={`${bucket.size}-${index}`} 
                  className={!isSelected ? 'unselected-item' : ''}
                >
                  {bucket.count} x {bucket.size}L Bucket
                </div>
              ))}
            </div>
          ) : hasVariant && recommendedVariant.variant ? (
            <div className="product-item">
              <h4>Items</h4>
              <div className={!isSelected ? 'unselected-item' : ''}>
                {recommendedVariant.quantity} x {recommendedVariant.variant.variant}
              </div>
            </div>
          ) : (
            <div className="no-items-needed">No items needed.</div>
          )}
        </div>
      </div>

      <div className={`subtotal-price-container ${!isSelected ? 'crossed-out' : ''}`}>
        <div className={`subtotal-price ${totalArea === 0 ? 'red-zero' : ''}`}>
          {totalArea === 0 ? (
            <div>$0</div>
          ) : hasBuckets ? (
            <div>{`$${bucketCost.toFixed(2)}`}</div>
          ) : hasVariant && recommendedVariant.variant ? (
            <div>{`$${variantCost.toFixed(2)}`}</div>
          ) : (
            <div>$0</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
