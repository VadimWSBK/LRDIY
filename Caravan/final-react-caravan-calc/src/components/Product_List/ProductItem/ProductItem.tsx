import React, { useMemo, useEffect, useCallback } from 'react';
import Popup from '../../Popups/WhyDoIneedThis/Popup';
import useStore from '../../../store/useStore'; // Zustand store
import styles from './ProductItem.module.css';
import { ProductItemProps } from '../../../types/index';
import { useBucketCalculations } from '../../../hooks/useBucketsCalculations';
import { useRecommendedVariant } from '../../../hooks/useRecommendedVariant';

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  // Access selectedProducts and toggleProductSelection from Zustand
  const { selectedProducts, toggleProductSelection, setProductCosts } = useStore((state) => ({
    selectedProducts: state.selectedProducts,
    toggleProductSelection: state.toggleProductSelection,
    setProductCosts: state.setProductCosts,
  }));

  const handleToggleSelection = useCallback(() => {
    toggleProductSelection(product.name);
  }, [toggleProductSelection, product.name]);

  // Check if the product is selected
  const isSelected = selectedProducts.includes(product.name);

  // Use the hooks to get necessary data
  const { bucketsNeeded } = useBucketCalculations(product);
  const recommendedVariant = useRecommendedVariant(product);

  // Compute bucketCost
  const bucketCost = useMemo(() => {
    if (!isSelected || !bucketsNeeded) return 0;
    return bucketsNeeded.reduce(
      (total, bucket) => total + bucket.count * bucket.price,
      0
    );
  }, [isSelected, bucketsNeeded]);
  
  const variantCost = useMemo(() => {
    if (!isSelected || !recommendedVariant) return 0;
    return recommendedVariant.variant
      ? recommendedVariant.variant.price * recommendedVariant.quantity
      : 0;
  }, [isSelected, recommendedVariant]);

  // Update the store with the costs
  useEffect(() => {
    if (bucketCost !== 0 || variantCost !== 0) {
      setProductCosts(product.name, bucketCost, variantCost);
    }
  }, [bucketCost, variantCost, setProductCosts, product.name]);

  // Determine the content for product items
  const productItemsContent = useMemo(() => {
    if (!isSelected) {
      return <div className={styles.noItemsNeeded}>No items needed.</div>;
    }
    if (bucketsNeeded && bucketsNeeded.length > 0) {
      return (
        <div className={styles.productItem}>
          <h4>Items</h4>
          {bucketsNeeded.map((bucket) => (
            <div key={`${bucket.size}-${bucket.count}`} className={styles.selectedItem}>
              {bucket.count} x {bucket.size}L Bucket
            </div>
          ))}
        </div>
      );
    }
    if (recommendedVariant && recommendedVariant.variant) {
      return (
        <div className={styles.productItem}>
          <h4>Items</h4>
          <div className={styles.selectedItem}>
            {recommendedVariant.quantity} x {recommendedVariant.variant.variant}
          </div>
        </div>
      );
    }
    return <div className={styles.noItemsNeeded}>No items needed.</div>;
  }, [isSelected, bucketsNeeded, recommendedVariant]);
  

  // Determine the content for subtotal
  let subtotalContent;

  if (!isSelected) {
    subtotalContent = <div>$0</div>;
  } else if (bucketsNeeded && bucketsNeeded.length > 0) {
    subtotalContent = <div>{`$${bucketCost.toFixed(2)}`}</div>;
  } else if (recommendedVariant && recommendedVariant.variant) {
    subtotalContent = <div>{`$${variantCost.toFixed(2)}`}</div>;
  } else {
    subtotalContent = <div>$0</div>;
  }

  return (
    <div className={styles.productContainer}>
      {/* Product Image and Checkbox */}
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} className={styles.customImage} />
        <div className={styles.checkboxContainer}>
        <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected}
            onChange={handleToggleSelection}
          />
        </div>
      </div>

      {/* Product Info and Popup */}
      <div className={styles.productNameAndLinkContainer}>
        <div className={styles.productName}>{product.name}</div>
        {product.infoText && <Popup id={`${product.name}-popup`} infoText={product.infoText} />}
      </div>

      {/* Product Items */}
      <div className={styles.productItemContainer}>{productItemsContent}</div>

      {/* Subtotal */}
      <div className={`${styles.subtotalPriceContainer} ${!isSelected ? styles.crossedOut : ''}`}>
        <div className={styles.subtotalPrice}>{subtotalContent}</div>
      </div>
    </div>
  );
};

export default ProductItem;
