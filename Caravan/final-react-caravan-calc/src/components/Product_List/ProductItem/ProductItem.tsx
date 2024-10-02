// ProductItem.tsx
import React from 'react';
import styles from './ProductItem.module.css';
import { ProductItemProps } from '../../../types/index';
import {usePopup } from '../../../hooks/usePopup';

const ProductItem: React.FC<ProductItemProps> = ({
  product,
  onToggleSelection,
}) => {
  // Access properties directly from 'product'
  const { isSelected, bucketCost, variantCost, bucketsNeeded, recommendedVariant } = product;

  const hasBuckets = bucketsNeeded && bucketsNeeded.length > 0;
  const hasVariant = recommendedVariant && recommendedVariant.variant !== null;

  const { popupVisible, popupContent, showPopup, popupRef } = usePopup();

  
  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img src={product.image} alt={product.name} className={styles.customImage} />
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={isSelected}
            onChange={(e) => onToggleSelection(e.target.checked)} // Pass the new checked value
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
                <a href="#" onClick={() => showPopup(product.infoText ?? '')}>
                  Why do I need this?
                </a>
                
                {/* Popup content */}
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
              {/* Render buckets if available */}
              {hasBuckets ? (
                <div className={styles.productItem}>
                  <h4>Items</h4>
                  {bucketsNeeded.map((bucket, index) => (
                    <div key={index}>
                      {bucket.count} x {bucket.size}L Bucket
                    </div>
                  ))}
                </div>
              ) : hasVariant ? (
                // Only render variants if no buckets are available
                <div className={styles.productItem}>
                  <h4>Variant</h4>
                  <div>
                    {recommendedVariant.quantity} x {recommendedVariant.variant?.variant}
                  </div>
                </div>
              ) : (
                // Show a message when neither buckets nor variants are available
                <div className={styles.noItemsNeeded}>No items needed.</div>
              )}
          </div>
         
      </div>

        {/* Display subtotal price */}
        <div className={styles.subtotalPriceContainer}>
            <div className={styles.subtotalPrice}>
              {/* Display only the bucket cost if buckets exist */}
              {hasBuckets ? (
                bucketCost > 0 ? `$${bucketCost.toFixed(2)}` : '$0'
              ) : (
                // If no buckets, display variant cost if available
                hasVariant && variantCost > 0 ? `$${variantCost.toFixed(2)}` : '$0'
              )}
            </div>
          </div>  
    </div>
  );
};


export default React.memo(ProductItem);
