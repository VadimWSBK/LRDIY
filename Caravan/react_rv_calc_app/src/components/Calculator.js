import React from 'react';
import { useSelector } from 'react-redux';
import RoofTypeSelect from './RoofTypeSelect'; 
import LengthInput from './LengthInput'; 
import WidthInput from './WidthInput';
import '../styles/rv-calculator.css';
import ProductListContainer from './Products/ProductListContainer';

const Calculator = () => {
    // Access state values using useSelector
    const totalArea = useSelector((state) => state.calculator.totalArea); // Directly get the calculated totalArea from Redux
    const roofType = useSelector((state) => state.calculator.roofType);
    const overallTotal = useSelector((state) => state.priceCalculations.overallTotal);
    const totalSavings = useSelector((state) => state.priceCalculations.totalSavings);
    const discountedPrice = useSelector((state) => state.priceCalculations.discountedPrice);

    return (
        <div id="rv-calculator-container">
            <div className="caravan-calculator-container">
                <div className="caravan-heading-container">
                    <h1>How Big Is Your Caravan?</h1>
                </div>

                <div className="caravan-input-row">
                    <div className="caravan-width-length-container">
                        <div className="caravan-input-container">
                            <LengthInput />
                        </div>
                        <div className="caravan-input-container">
                            <WidthInput />
                        </div>
                    </div>
                    <div className="caravan-input-container">
                        <RoofTypeSelect />
                    </div>
                </div>

                <div className="caravan-total-area">
                    <div>Total Area: {totalArea.toFixed(2)} m²</div> {/* Display the calculated totalArea */}
                </div>

                <div className="caravan-subheading-container">
                    <h2>👇 Everything You Need To Seal Your Caravan Roof.</h2>
                </div>

                <div className="caravan-product-list-container">
                    <div className="caravan-product-list">
                        <ProductListContainer 
                            totalArea={totalArea} // Pass the totalArea from Redux
                            roofType={roofType} // Pass the roofType from Redux
                        />
                    </div>
                </div>
            </div>

            <div className="caravan-total-price-button-container">
                <button id="caravan-buy-now-button" className="caravan-buy-now-button">
                    <div className="caravan-buy-now-button-text">ADD KIT TO CART</div>
                    <div className="caravan-buy-now-button-subtext">And Save 10%</div>
                </button>

                <div className="caravan-total-price-container">
                    <div className="caravan-total-price-info">
                        <div>
                            <span className="caravan-total-price-text">Total:</span>
                        </div>
                        <div className="caravan-total-price">
                            ${discountedPrice.toFixed(2)}                        
                        </div>
                        <div className="caravan-discounted-price">
                            ${overallTotal.toFixed(2)}
                        </div>
                    </div>
                    <div className="caravan-total-savings-info">
                        <div className="caravan-total-savings">
                            <span className="caravan-total-savings-text">Savings:</span>
                            <div id="caravan-total-savings">${totalSavings.toFixed(2)}</div>
                        </div>
                    </div>
                    <div className="caravan-product-gst_shipping">
                        <p>GST Included + FREE Shipping</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Calculator;
