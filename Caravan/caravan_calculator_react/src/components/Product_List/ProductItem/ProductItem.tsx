// components/ProductItem.tsx
import React, { useEffect } from 'react';
import useStore from '../../../store/useStore';
import Checkbox from '../../Inputs/Checkbox/Checkbox';
import Popup from '../../Popups/WhyDoIneedThis/Popup'
import { Product, BucketCount } from '../../../types/index';
import { useBucketCalculations } from '../../../hooks/useBucketCalculations';
import useVariantCalculations from '../../../hooks/useVariantCalculations';
import styles from './ProductItem.module.css';

interface ProductItemProps {
  product: Product;
  totalArea: number;
}

interface PopupVisibility {
  [key: string]: boolean;
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
      : 0: 
      0;
   

  // Store bucket cost and variant cost in Zustand store
  useEffect(() => {
    setBucketCost({ productName: product.name, cost: bucketCost });
    setVariantCost({ productName: product.name, cost: variantCost });
  }, [bucketCost, variantCost, product.name, setBucketCost, setVariantCost]);

  // Check if product has buckets or variants
  const hasBuckets = bucketsNeeded && bucketsNeeded.length > 0;
  const hasVariant = recommendedVariant && recommendedVariant.variant !== null;

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img
          className={styles.customImage} 
        />
        <Checkbox productName={product.name} isSelected={isSelected} />
      </div>

      <div className={styles.nestedGridForMobile}>
        <div className={styles.productNameAndLinkContainer}>
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.infoPopupLinkStyle}>
            {product.infoText && (
              <Popup id= {`${product.name}-popup`} infoText={product.infoText} />
            )}
          </div>
        </div>

        <div className={styles.productItemContainer}>
          {totalArea === 0 ? (
            <div className={styles.noItemsNeeded}>No items needed.</div>
          ) : hasBuckets ? (
            <div className={styles.productItem}>
              <h4>Items</h4>
              {bucketsNeeded.map((bucket: BucketCount, index: number) => (
                <div 
                  key={`${bucket.size}-${index}`} 
                  className={!isSelected ? styles.unselectedItem : ''}
                >
                  {bucket.count} x {bucket.size}L Bucket
                </div>
              ))}
            </div>
          ) : hasVariant && recommendedVariant.variant ? (
            <div className={styles.productItem}>
              <h4>Items</h4>
              <div className={!isSelected ? styles.unselectedItem : ''}>
                {recommendedVariant.quantity} x {recommendedVariant.variant.variant}
              </div>
            </div>
          ) : (
            <div className={styles.noItemsNeeded}>No items needed.</div>
          )}
        </div>
      </div>

      <div className={`${styles.subtotalPriceContainer} ${!isSelected ? styles.crossedOut : ''}`}>
        <div className={`${styles.subtotalPrice} ${totalArea === 0 ? styles.redZero : ''}`}>
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
