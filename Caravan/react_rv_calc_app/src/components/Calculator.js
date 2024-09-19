// src/components/Calculator.js

import React, { useState } from 'react';
import './Users/vadimw/GitHub_LRDIY/LRDIY/Caravan/react_rv_calc_app/src/styles/rv-calculator.css';  // Adjust the path as necessary

const Calculator = () => {
    const [length, setLength] = useState(6);
    const [width, setWidth] = useState(2.5);
    const [roofType, setRoofType] = useState('painted');
    const [totalArea, setTotalArea] = useState(0);

    const handleCalculate = () => {
        const area = (length * width).toFixed(2);
        setTotalArea(area);
    };

    return (
        <div id="rv-calculator-container">
            <h1>Caravan Roof Calculator</h1>
            <div className="caravan-input-container">
                <label htmlFor="caravan-length">Enter Length:</label>
                <input
                    type="number"
                    id="caravan-length"
                    value={length}
                    min="0"
                    max="20"
                    step="0.1"
                    onChange={(e) => setLength(e.target.value)}
                />
                <span className="caravan-unit">m</span>
            </div>
            <div className="caravan-input-container">
                <label htmlFor="caravan-width">Enter Width:</label>
                <input
                    type="number"
                    id="caravan-width"
                    value={width}
                    min="0"
                    max="3"
                    step="0.1"
                    onChange={(e) => setWidth(e.target.value)}
                />
                <span className="caravan-unit">m</span>
            </div>
            <div className="caravan-input-container">
                <label htmlFor="caravan-roof-type">Select Roof Surface:</label>
                <select
                    id="caravan-roof-type"
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                >
                    <option value="painted">Painted Surface</option>
                    <option value="metal">Raw Metal Surface</option>
                </select>
            </div>
            <button onClick={handleCalculate}>Calculate</button>
            <div className="caravan-total-area">Total Area: {totalArea} m²</div>
        </div>
    );
};

export default Calculator;

