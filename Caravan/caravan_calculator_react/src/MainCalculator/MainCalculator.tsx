import React, { useCallback } from 'react';
import LengthInput from '../components/Inputs/LenghtInput/LengthInput';
import WidthInput from '../components/Inputs/WidthInput/WidthInput';
import RoofTypeSelect from '../components/Inputs/RoofTypeSelect/RoofTypeSelect';
import ProductList from '../components/Product_List/ProductList/ProductList';
import useTotalArea from '../hooks/useTotalArea';
import useBuyNow from '../hooks/useBuyNow';
import ErrorBoundary from '../components/ErrorBoundary';
import styles from './MainCalculator.module.css'; // Updated import for CSS modules
import useStore from '../store/useStore'; // Zustand store access

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
  // Use custom hook to get total area
  const totalArea = useTotalArea();

  // Use custom hook to handle Buy Now button logic
  const { handleBuyNow } = useBuyNow();

  // Get the total item quantity and roof type from Zustand store


  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.caravanCalculatorContainer}>
        <ErrorBoundary>
          <Header />

          <div className={styles.inputRow}>
            <div className={styles.inputContainer}>
              <LengthInput />
            </div>
            <div className={styles.inputContainer}>
              <WidthInput />
            </div>
          </div>

          <div className={styles.totalAreaAndSelect}>
            <div className={styles.selectContainer}>
            <RoofTypeSelect />
            </div>

            <div className={styles.totalArea}>
              <h4 className={styles.totalAreaHeading}>Total Area:</h4>
              <div className={styles.totalAreaValue}>
                {totalArea.toFixed(2)} m<sup>2</sup>
              </div>
            </div>
          </div>

          <div className={styles.productList}>
            <ProductList />
          </div>

          <div className={styles.totalItemAndSubtotalContainer}>
            <div className={styles.quantityTextContainer}>
              <span className={styles.quantityText}>Items:</span>
              <span className={styles.quantity}>{totalQuantity}</span>
            </div>
            <div className={styles.subtotalTextContainer}>
              <span className={styles.subtotalText}>Subtotal:</span>
              <span className={styles.priceText}>
                ${totalPrice.toFixed(2)}
              </span>
            </div>
          </div>

          <div className={styles.totalPriceButtonContainer}>
            <div className={styles.buttonAndTextUnder}>
              <button
                onClick={handleBuyNow}
                className={styles.buyNowButton} // Combined styles for clean JSX
              >
                <div className={styles.buyNowButtonText}>Grab Your Kit Now</div>
                <div className={styles.buyNowButtonSubtext}>And Save 10%</div>
              </button>
            </div>

            <div className={styles.totalPriceContainer}>
              <div className={styles.discountTextContainer}>
                <span className={styles.discountText}>Total Savings:</span>
                <span className={styles.discount}>
                  &minus; ${totalSavings.toFixed(2)}
                </span>
              </div>

              <div className={styles.totalAmount}>
                <span className={styles.totalAmountText}>Total AUD:</span>
                <span className={styles.totalPrice}>
                  ${discountedPrice.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          <Footer />
        </ErrorBoundary>
      </div>
    </div>
  );
};

export default MainCalculator;