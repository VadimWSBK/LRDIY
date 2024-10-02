import React, { useState, useEffect, useMemo } from 'react';
import LengthInput from './components/Inputs/LenghtInput/LengthInput';
import WidthInput from './components/Inputs/WidthInput/WidthInput';
import RoofTypeSelect from './components/Inputs/RoofTypeSelect/RoofTypeSelect';
import styles from './MainCalculator.module.css';
import useStore from './store/useStore'; // Zustand store access
import ProductList from './components/Product_List/ProductList/ProductList';
import { products } from './utils/products';
import calculateProductWithCosts from './utils/calculateProductWithCosts';
import useShopifyPermalink from './hooks/useShopifyPermalink';
import { useAlertPopup } from './hooks/useAlertPopup';

// Memoized components that don't change frequently
const Header = React.memo(() => (
  <div className={styles.headingContainer}>
    <h1>How Big Is Your Caravan?</h1>
  </div>
));

const Footer = React.memo(() => (
  <div className={styles.gstShippingInfo}>
    <p>GST Included + FREE Shipping</p>
  </div>
));

const MainCalculator: React.FC = () => {
  const [length, setLength] = useState<number>(6);
  const [width, setWidth] = useState<number>(2.5);

  const { isVisible, alertMessage, showAlert, alertRef } = useAlertPopup();

  const {
    initializeSelectedProducts,
    setRoofType,
    selectedProducts,
    roofType,
    bucketsNeeded,
    recommendedVariants,
    setProductSelection,
    setTotalArea,
  } = useStore();

  // Initialize selected products on component mount
  useEffect(() => {
    initializeSelectedProducts();
  }, [initializeSelectedProducts]);

  // Log selected products whenever they change
  useEffect(() => {
    console.log('Selected Products:', selectedProducts);
  }, [selectedProducts]);

  // Memoize total area calculation
  const calculatedArea = useMemo(() => length * width, [length, width]);

  // Update Zustand store with total area
  useEffect(() => {
    setTotalArea(calculatedArea);
  }, [calculatedArea, setTotalArea]);

  // Update Zustand store with roof type
  useEffect(() => {
    setRoofType(roofType);
  }, [roofType, setRoofType]);

  // Compute costs for each product
  const calculatedProducts = useMemo(() => {
    return Object.entries(products).map(([productKey, product]) => {
      const isSelected = selectedProducts.includes(productKey);

      // Determine 'show' based on 'roofType'
      let show = true;
      if (productKey === 'sealerPrimer' && roofType !== 'painted') {
        show = false;
      }
      if (productKey === 'etchPrimer' && roofType !== 'raw metal') {
        show = false;
      }

      const {
        bucketsNeeded,
        recommendedVariant,
        bucketCost,
        variantCost,
      } = calculateProductWithCosts(product, calculatedArea, isSelected);

      return {
        ...product,
        productKey,
        bucketsNeeded,
        recommendedVariant,
        bucketCost,
        variantCost,
        isSelected,
        show, // include 'show' property
      };
    });
  }, [products, calculatedArea, selectedProducts, roofType]);

  // Calculate total cost for selected products
  const totalCost = useMemo(() => {
    return calculatedProducts
      .filter((product) => product.isSelected)
      .reduce(
        (sum, product) =>
          sum + (product.bucketCost || 0) + (product.variantCost || 0),
        0
      );
  }, [calculatedProducts]);

  // Calculate total quantity
  const totalQuantity = useMemo(() => {
    return calculatedProducts.reduce((total, product) => {
      if (product.isSelected) {
        const bucketQuantity =
          product.bucketsNeeded?.reduce(
            (sum, bucket) => sum + bucket.count,
            0
          ) || 0;
        const variantQuantity = product.recommendedVariant?.quantity || 0;
        return total + bucketQuantity + variantQuantity;
      }
      return total;
    }, 0);
  }, [calculatedProducts]);
  
  const { generatePermalink } = useShopifyPermalink(calculatedProducts);

  // Handle the "Buy Now" button click
  const handleBuyNowClick = () => {
    // Check if no product is selected
    if (!calculatedProducts.some((product) => product.isSelected)) {
      showAlert('Please select at least one product.');
      return;
    }
    // Check if only BONUS product is selected
    const selectedProductKeys = calculatedProducts
      .filter((product) => product.isSelected)
      .map((product) => product.productKey);
  
    if (
      selectedProductKeys.length === 1 &&
      selectedProductKeys.includes('bonusProduct')
    ) {
      showAlert('Please select at least one other product.');
      return;
    }
  
    // Generate Shopify permalink and open in new tab
    const shopifyPermalink = generatePermalink();
    window.open(shopifyPermalink, '_blank');
  };
  

  const handleToggleSelection = (productKey: string, isChecked: boolean) => {
    setProductSelection(productKey, isChecked);
  };


  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.caravanCalculatorContainer}>
        <Header />

        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <LengthInput length={length} setLength={setLength} />
          </div>
          <div className={styles.inputContainer}>
            <WidthInput width={width} setWidth={setWidth} />
          </div>
        </div>

        <div className={styles.totalAreaAndSelect}>
          <div className={styles.selectContainer}>
            <RoofTypeSelect roofType={roofType} setRoofType={setRoofType} />
          </div>

          <div className={styles.totalArea}>
            <h4 className={styles.totalAreaHeading}>Total Area:</h4>
            <div className={styles.totalAreaValue}>
              {calculatedArea.toFixed(2)} m<sup>2</sup>
            </div>
          </div>
        </div>

        <div className={styles.productList}>
        <ProductList
          products={calculatedProducts}
          onToggleSelection={handleToggleSelection}
        />
        </div>

        <div className={styles.totalItemAndSubtotalContainer}>
          <div className={styles.quantityTextContainer}>
            <span className={styles.quantityText}>Items:</span>
            <span className={styles.quantity}>{totalQuantity}</span>
          </div>
          <div className={styles.subtotalTextContainer}>
            <span className={styles.subtotalText}>Subtotal:</span>
            <span className={styles.priceText}>
              ${totalCost.toFixed(2)}
            </span>
          </div>
        </div>

        <div className={styles.totalPriceButtonContainer}>
          <div className={styles.buttonAndTextUnder}>
            <button
              onClick={handleBuyNowClick}
              className={`${styles.buyNowButton} ${styles.buyNowButtonWiggleEffect}`}
            >
              <div className={styles.buyNowButtonText}>Grab Your Kit Now</div>
              <div className={styles.buyNowButtonSubtext}>And Save 10%</div>
            </button>
          </div>

          <div className={styles.totalPriceContainer}>
            <div className={styles.discountTextContainer}>
              <span className={styles.discountText}>Total Savings:</span>
              <span className={styles.discount}>
                &minus; ${(totalCost - totalCost * 0.9).toFixed(2)}
              </span>
            </div>

            <div className={styles.totalAmount}>
              <span className={styles.totalAmountText}>Total AUD:</span>
              <span className={styles.totalPrice}>
                ${(totalCost * 0.9).toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        <Footer />

        {/* Render the alert popup when it's visible */}
        const isVisible = true; // Declare the isVisible variable

        {isVisible && (
          <div className={styles.alertPopupOverlay}>
            <div className={styles.alertPopup} ref={alertRef}>
              <div className={styles.alertContent}>{alertMessage}</div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCalculator;
