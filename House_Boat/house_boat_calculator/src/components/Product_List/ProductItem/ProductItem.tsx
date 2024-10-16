import React from 'react';
import styles from './ProductItem.module.css';
import { ProductItemProps } from '../../../types/index';
import { usePopup } from '../../../hooks/usePopup';
import { calculateBucketCost, calculateVariantCost } from '../../../utils/calculateCosts';

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onToggleSelection,
}) => {
  const { isSelected, bucketsNeeded, recommendedVariants } = product;

  const hasBuckets = bucketsNeeded && bucketsNeeded.length > 0;
  const hasVariants = recommendedVariants && recommendedVariants.length > 0;

  const { popupVisible, popupContent, showPopup, popupRef } = usePopup();

  // Calculate bucket and variant costs dynamically if needed
  const bucketCost = hasBuckets ? calculateBucketCost(bucketsNeeded) : 0;
  const variantCost = hasVariants ? calculateVariantCost(recommendedVariants) : 0;

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} className={styles.customImage} />
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected}
            onChange={(e) => onToggleSelection(e.target.checked)}
          />
        </div>
      </div>

      <div className={styles.nestedGridForMobile}>
        <div className={styles.productNameAndLinkContainer}>
          <div className={styles.productName}>
            {product.name}
          </div>

          <div className={styles.infoPopupLinkStyle}>
            {product.infoText && (
              <>
                <button
                  className={styles.linkButton}
                  onClick={() => showPopup(product.infoText ?? '')}
                >
                  Why do I need this?
                </button>

                {popupVisible && (
                  <div className={styles.popupBubble} ref={popupRef}>
                    {popupContent}
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <div className={styles.productItemContainer}>
          {hasBuckets ? (
            <div className={styles.productItem}>
              <h4>Items</h4>
              {bucketsNeeded.map((bucket, index) => (
                <div
                  key={index}
                  className={!isSelected ? styles.crossedOut : undefined}
                >
                  {bucket.count} x {bucket.size}L Bucket
                </div>
              ))}
            </div>
          ) : hasVariants ? (
            <div className={styles.productItem}>
              <h4>Variants</h4>
              {recommendedVariants.map((variant, index) => (
                <div
                  key={index}
                  className={!isSelected ? styles.crossedOut : undefined}
                >
                  {variant.quantity} x {variant.variant?.variant}
                </div>
              ))}
            </div>
          ) : (
            <div className={styles.noItemsNeeded}>No items needed.</div>
          )}
        </div>
      </div>

      <div className={styles.subtotalPriceContainer}>
        <div className={styles.subtotalPrice}>
          {hasBuckets && bucketCost > 0
            ? `$${bucketCost.toFixed(2)}`
            : hasVariants && variantCost > 0
            ? `$${variantCost.toFixed(2)}`
            : '$0'}
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductItem);
