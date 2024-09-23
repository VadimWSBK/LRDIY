// src/components/Calculator.js
import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectProducts } from '../store/productDetailsSlice';
import RoofTypeSelect from './RoofTypeSelect'; 
import LengthInput from './LengthInput'; 
import WidthInput from './WidthInput';
import ProductListContainer from './Products/ProductListContainer';
import '../styles/rv-calculator.css';

const Calculator = () => {
    const products = useSelector(selectProducts);
    const [length, setLength] = useState(6);
    const [width, setWidth] = useState(2.5);
    const [roofType, setRoofType] = useState('painted');
    const [totalArea, setTotalArea] = useState(15);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [overallTotal, setOverallTotal] = useState(0); 
    const [totalSavings, setTotalSavings] = useState(0);
    const [discountedPrice, setDiscountedPrice] = useState(0);

    // Update total area based on length and width
    useEffect(() => {
        setTotalArea(length * width || 0);
    }, [length, width]);

    // Set initial selected products based on available products
    useEffect(() => {
        if (products && Object.keys(products).length > 0) {
            const initialSelectedProducts = Object.keys(products).map(productName => products[productName].name);
            setSelectedProducts(initialSelectedProducts);
        }
    }, [products]);

    // Calculate the discounted price based on overall total and savings
    useEffect(() => {
        const discount = overallTotal > 0 ? overallTotal * 0.10 : 0; // Calculate 10% savings
        setTotalSavings(discount);
        setDiscountedPrice(Math.max(overallTotal - discount, 0)); // Calculate the final discounted price
    }, [overallTotal]);

    return (
        <div id="rv-calculator-container">
            <div className="caravan-calculator-container">
                <div className="caravan-heading-container">
                    <h1>How Big Is Your Caravan?</h1>
                </div>

                <div className="caravan-input-row">
                    <div className="caravan-width-length-container">
                        <div className="caravan-input-container">
                            <LengthInput length={length} setLength={(value) => dispatch(setLength(value))} />
                        </div>
                        <div className="caravan-input-container">
                            <WidthInput width={width} setWidth={(value) => dispatch(setWidth(value))} />
                        </div>
                    </div>
                    <div className="caravan-input-container">
                        <RoofTypeSelect roofType={roofType} setRoofType={(value) => dispatch(setRoofType(value))} />
                    </div>
                </div>

                <div className="caravan-total-area">
                    <div>Total Area: {totalArea.toFixed(2)} m²</div>
                </div>

                <div className="caravan-subheading-container">
                    <h2>👇 Everything You Need To Seal Your Caravan Roof.</h2>
                </div>

                <div className="caravan-product-list-container">
                    <div className="caravan-product-list">
                        <ProductListContainer
                            totalArea={totalArea}
                            roofType={roofType}
                            selectedProducts={selectedProducts}
                            setOverallTotal={(total) => dispatch(setOverallTotal(total))}
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
