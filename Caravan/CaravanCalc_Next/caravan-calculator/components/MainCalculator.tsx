import React, { useEffect} from 'react';
import useStore from '../hooks/useStore';
import useRoofType from '../hooks/useRoofType'; // Import custom hook
import LengthInput from './LengthInput';
import WidthInput from './WidthInput';
import RoofTypeSelect from './RoofTypeSelect';
import ProductList from './ProductList';
import { usePriceCalculations } from '../hooks/usePriceCalculations';
import '../styles/globals.css';
import AlertPopup from './AlertPopup';
import useAlertPopup from '../hooks/useAlertPopup'; // Updated import path
import useShopifyPermalink from '../hooks/useShopifyPermalink'; // Import custom hook for permalink



const MainCalculator: React.FC = () => {
    const { length, width, totalArea, setTotalArea, selectedProducts, products } = useStore((state) => ({
        length: state.length,
        width: state.width,
        totalArea: state.totalArea,
        setTotalArea: state.setTotalArea,
        selectedProducts: state.selectedProducts,
        products: Object.values(state.products), // Convert products object to an array
    }));

    // Use custom hook to get total and discounted prices
    const { totalPrice, discountedPrice } = usePriceCalculations();

    // Use custom hook for roof type logic
    const { roofType, handleRoofTypeChange } = useRoofType();

    // Call custom hook to get permalink function
    const { generatePermalink } = useShopifyPermalink(); 


    // Calculate the total area whenever length or width changes
    useEffect(() => {
        if (length > 0 && width > 0) {
            const area = length * width;
            setTotalArea(area);
        } else {
            setTotalArea(0); // Set total area to 0 if either length or width is 0
        }
    }, [length, width, setTotalArea]);
    

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
    console.log("Generated Checkout URL:", checkoutUrl);

    window.open(checkoutUrl, '_blank');
  };
    

    return (
        <div className="rv-calculator-container">
            <div className="caravan-calculator-container">
                <div className="caravan-heading-container">
                    <h1>How Big Is Your Caravan?</h1>
                </div>

                <div className="caravan-input-row">
                    <div className="caravan-input-container">
                        <LengthInput />
                    </div>
                    <div className="caravan-input-container">
                        <WidthInput />
                    </div>
                </div>

                <div className="total-area-and-select">
                    <div className="caravan-select-container">
                        <RoofTypeSelect onRoofTypeChange={handleRoofTypeChange} />
                    </div>

                    <div className="caravan-total-area">
                            <h4>Total Area:</h4>
                        <div className="total-area">
                            {totalArea.toFixed(2)} m<sup>2</sup>
                        </div>
                    </div>

                </div>

                <div className="caravan-subheading-container">
                    <h2>👇 All You Need For Your Caravan Roof.</h2>
                </div>

                <div className="caravan-product-list-container">
                    <ProductList />
                </div>

                <AlertPopup 
                        message={alertMessage} // Pass the alert message state here
                        isVisible={isVisible} 
                    />

                <div className="caravan-total-price-button-container">
               
                    <div className='button-and-text-under'>
                        <button onClick={handleBuyNow} className="caravan-buy-now-button wiggle-effect">
                        <div className="caravan-buy-now-button-text">Grab Your Kit Now</div>
                        <div className="caravan-buy-now-button-subtext">And Save 10%</div>
                        </button>
                    
                        <div className="caravan-product-gst_shipping">
                                <p>GST Included + FREE Shipping</p>
                        </div>
                    </div>
                    <div className="caravan-total-price-container">
                         <div className="caravan-total-price-info">
                            <span className="caravan-total-price-text">Total:</span>
                            <div className="caravan-total-price">
                                ${totalPrice.toFixed(2)}
                            </div>
                            <div className="caravan-discounted-price">
                                ${discountedPrice.toFixed(2)}
                            </div>
                         </div>
                         <div className="caravan-total-savings-info">
                            <div className="caravan-total-savings">
                                <span className="caravan-total-savings-text">Total Savings:</span>
                                <div>${(totalPrice - discountedPrice).toFixed(2)}</div>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
    );
};

export default MainCalculator;
