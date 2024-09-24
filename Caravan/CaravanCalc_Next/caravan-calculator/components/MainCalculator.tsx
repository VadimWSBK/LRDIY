import React, { useEffect } from 'react';
import useStore from '../hooks/useStore';
import "../styles/globals.css";
import LengthInput from './LengthInput';
import WidthInput from './WidthInput';
import RoofTypeSelect from './RoofTypeSelect';
import ProductList from './ProductList'; 
import 'tailwindcss/tailwind.css';

// Define the types for the store state
interface StoreState {
  length: number;
  width: number;
  totalPrice: number;
  totalArea: number;
  discountedPrice: number;
  setTotalArea: (area: number) => void;
  setTotalPrice: (price: number) => void;
  setDiscountedPrice: (price: number) => void;
}

const MainCalculator: React.FC = () => {
    const { length, width, totalPrice, totalArea, discountedPrice, setTotalArea, setTotalPrice, setDiscountedPrice } = useStore() as StoreState;

    const calculateTotalArea = () => {
        const totalArea = length * width;
        setTotalArea(totalArea);
    };
    
    useEffect(() => {
        calculateTotalArea();
    }, [length, width]);

    useEffect(() => {
        // Calculate discounted price and set as number
        setDiscountedPrice(parseFloat((totalPrice * 0.9).toFixed(2)));
    }, [totalPrice]);

    return (
        <div id="rv-calculator-container">
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
                    <div className="caravan-select-container">
                        <RoofTypeSelect />
                    </div>
                </div>

                <div className="caravan-total-area" id="caravan-total-area">
                    Total Area: ${totalArea.toFixed(2)} m²
                </div>

                <div className="caravan-subheading-container">
                    <h2>👇 Everything You Need To Seal Your Caravan Roof.</h2>
                </div>

                <div id="caravan-product-list" className="caravan-product-list-container">
                    <ProductList />
                </div>

                <div className="caravan-total-price-button-container">
                    <button id="caravan-buy-now-button" className="caravan-buy-now-button">
                        <div className="caravan-buy-now-button-text">ADD KIT TO CART</div>
                        <div className="caravan-buy-now-button-subtext">And Save 10%</div>
                    </button>
                    <div className="caravan-total-price-container">
                        <div className="caravan-total-price-info">
                            <span className="caravan-total-price-text">Total:</span>
                            <div className="caravan-total-price">${totalPrice.toFixed(2)}</div>
                            <div className="caravan-discounted-price">${discountedPrice}</div>
                        </div>
                        <div className="caravan-total-savings-info">
                            <div className="caravan-total-savings">
                                <span className="caravan-total-savings-text">Total Savings:</span>
                                <div id="caravan-total-savings">$0.00</div>
                            </div>
                        </div>
                        <div className="caravan-product-gst_shipping">
                            <p>GST Included + FREE Shipping</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MainCalculator;
