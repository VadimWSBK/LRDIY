import React from 'react';
import Checkbox from '../../Inputs/Checkbox/Checkbox';
import Popup from '../../Popups/WhyDoIneedThis/Popup';
import { BucketCount } from '../../../types/index';
import useTotalArea from '../../../hooks/useTotalArea';
import useStore from '../../../store/useStore'; // Import Zustand store
import { useProductCalculations } from '../../../hooks/useProductCalculations';
import styles from './ProductItem.module.css';
import { ProductItemProps } from '../../../types/index';

const ProductItem: React.FC<ProductItemProps> = ({ product }) => {
  // Get the total area using the useTotalArea hook
  const totalArea = useTotalArea();

  // Access selectedProducts and setSelectedProducts directly from Zustand
  const { selectedProducts, setSelectedProducts } = useStore((state) => ({
    selectedProducts: state.selectedProducts,
    setSelectedProducts: state.setSelectedProducts,
  }));

  // Toggle product selection directly
  const toggleProductSelection = (productName: string) => {
    const isSelected = selectedProducts.includes(productName);
    const updatedProducts = isSelected
      ? selectedProducts.filter((name) => name !== productName)
      : [...selectedProducts, productName];
    setSelectedProducts(updatedProducts);
  };

  // Check if the product is selected
  const isSelected = selectedProducts.includes(product.name);

  // Use the useProductCalculations hook to get all necessary calculations
  const { bucketCost, variantCost, bucketsNeeded, recommendedVariant } = useProductCalculations(product);

  // Check if product has buckets or variants
  const hasBuckets = bucketsNeeded && bucketsNeeded.length > 0;
  const hasVariant = recommendedVariant && recommendedVariant.variant !== null;

  return (
    <div className={styles.productContainer}>
      <div className={styles.productImage}>
        <img className={styles.customImage} />
        {/* Use toggleProductSelection for the Checkbox */}
        <Checkbox 
          productName={product.name} 
          isSelected={isSelected} 
          onChange={() => toggleProductSelection(product.name)}
        />
      </div>

      <div className={styles.nestedGridForMobile}>
        <div className={styles.productNameAndLinkContainer}>
          <div className={styles.productName}>{product.name}</div>
          <div className={styles.infoPopupLinkStyle}>
            {product.infoText && (
              <Popup id={`${product.name}-popup`} infoText={product.infoText} />
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
                <div key={`${bucket.size}-${index}`} className={!isSelected ? styles.unselectedItem : ''}>
                  {bucket.count} x {bucket.size}L Bucket
                </div>
              ))}
            </div>
          ) : hasVariant ? (
            <div className={styles.productItem}>
              <h4>Items</h4>
              {recommendedVariant && recommendedVariant.variant && (
                <div className={!isSelected ? styles.unselectedItem : ''}>
                  {recommendedVariant.quantity} x {recommendedVariant.variant.variant}
                </div>
              )}
            </div>
          ) : (
            <div className={styles.noItemsNeeded}>No items needed.</div>
          )}
        </div>
      </div>

      {/* Show the correct subtotal for either buckets or variants */}
      <div className={`${styles.subtotalPriceContainer} ${!isSelected ? styles.crossedOut : ''}`}>
        <div className={`${styles.subtotalPrice} ${totalArea === 0 ? styles.redZero : ''}`}>
          {totalArea === 0 ? (
            <div>$0</div>
          ) : hasBuckets ? (
            <div>{`$${bucketCost.toFixed(2)}`}</div>
          ) : hasVariant && recommendedVariant && recommendedVariant.variant ? (
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
