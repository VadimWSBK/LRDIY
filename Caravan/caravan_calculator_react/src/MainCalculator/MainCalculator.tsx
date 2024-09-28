import useStore from '../store/useStore';
import useRoofType from '../hooks/useRoofType'; // Import custom hook
import LengthInput from '../components/Inputs/LenghtInput/LengthInput'; // Import the LengthInput component
import WidthInput from '../components/Inputs/WidthInput/WidthInput'; // Import the WidthInput component
import RoofTypeSelect from '../components/Inputs/RoofTypeSelect/RoofTypeSelect'; // Import the RoofTypeSelect component
import ProductList from '../components/Product_List/ProductList/ProductList';
import { usePriceCalculations } from '../hooks/usePriceCalculations';
import AlertPopup from '../components/Popups/AlertPopup/AlertPopup' // Updated import path
import useAlertPopup from '../hooks/useAlertPopup'; // Updated import path
import useShopifyPermalink from '../hooks/useShopifyPermalink'; // Import custom hook for permalink
import useQuantityCalculations from '../hooks/useQuantityCalculations'; // Import the new hook
import styles from './MainCalculator.module.css';


const MainCalculator: React.FC = () => {
    const {totalArea, selectedProducts } = useStore((state) => ({
        length: state.length,
        width: state.width,
        totalArea: state.totalArea,
        setTotalArea: state.setTotalArea,
        selectedProducts: state.selectedProducts,
        products: Object.values(state.products), // Convert products object to an array
    }));

    // Use custom hook to get total and discounted prices
    const { totalPrice, discountedPrice, totalSavings } = usePriceCalculations();

    // Use custom hook for roof type logic
    const { handleRoofTypeChange } = useRoofType();

    // Call custom hook to get permalink function
    const { generatePermalink } = useShopifyPermalink(); 

    // Get the bucket count from the store
    const { totalQuantity } = useQuantityCalculations(); // Use the new hook
    

    // Custom hook for shown alert popup
    const { show, isVisible, alertMessage } = useAlertPopup(); 


  // Handle the Buy Now button click
  const handleBuyNow = () => {
    // Check if no product is selected
    if (selectedProducts.length === 0) {
      show("Please select at least one Product.");
      return;
    }

    // Check if only BONUS product is selected
    if (selectedProducts.length === 1 && selectedProducts.includes('BONUS')) {
      show("Please select at least one other product.");
      return;
    }

    // Generate Shopify permalink and open in new tab
    const checkoutUrl = generatePermalink();
    window.open(checkoutUrl, '_blank');
  };
    

    return (
        <div className={styles.calculatorContainer}>
        <div className={styles.caravanCalculatorContainer}>
          
          <div className={styles.headingContainer}>
            <h1>How Big Is Your Caravan?</h1>
          </div>
  
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
              <RoofTypeSelect onRoofTypeChange={handleRoofTypeChange} />
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
  
          <AlertPopup 
            message={alertMessage} 
            isVisible={isVisible} 
          />

            <div className={styles.totalItemandSubtotalContainer}>
                <div className={styles.quantityTextContainer}>
                    <span className={styles.quantityText}>Items: </span>
                    <span className={styles.quantity}> {totalQuantity}</span>
                </div>
                <div className={styles.subtotalTextContainer}>
                    <span className={styles.subtotalText}>Subtotal: </span>
                    <span className={styles.priceText}>${totalPrice.toFixed(2)}</span>
                </div>
              </div>
      
              <div className={styles.totalPriceButtonContainer}>
                <div className={styles.buttonAndTextUnder}>
                  <button onClick={handleBuyNow} className={`${styles.buyNowButton} ${styles.buyNowButtonWiggleEffect}`}>
                    <div className={styles.buyNowButtonText}>Grab Your Kit Now</div>
                    <div className={styles.buyNowButtonSubtext}>And Save 10%</div>
                  </button>
                </div>
      
                <div className={styles.totalPriceContainer}>
                    <div className={styles.discountTextContainer}>
                      <span className={styles.discountText}>Total Savings:</span>
                      <span className={styles.discount}> − ${totalSavings .toFixed(2)}</span>
                    </div>

                  <div className={styles.totalAmount}>
                    <span className={styles.totalAmountText}>Total AUD:</span>
                    <span className={styles.totalPrice}>${discountedPrice.toFixed(2)}</span>
                  </div>
               </div>
              </div>

              <div className={styles.gstShippingInfo}>
                    <p>GST Included + FREE Shipping</p>
              </div>

        </div>
      </div>
    );
};

export default MainCalculator;
