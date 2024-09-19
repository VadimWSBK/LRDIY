// src/components/Calculator.js

import React, { useState } from 'react';
import './Users/vadimw/GitHub_LRDIY/LRDIY/Caravan/react_rv_calc_app/src/styles/rv-calculator.css';  // Create a CSS file if needed

const Calculator = () => {
    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [roofType, setRoofType] = useState('painted');

    const handleCalculate = () => {
        // Your calculation logic here
    };

    return (
        <div>
            <h1>Caravan Roof Calculator</h1>
            <input
                type="number"
                placeholder="Length (m)"
                value={length}
                onChange={(e) => setLength(e.target.value)}
            />
            <input
                type="number"
                placeholder="Width (m)"
                value={width}
                onChange={(e) => setWidth(e.target.value)}
            />
            <select value={roofType} onChange={(e) => setRoofType(e.target.value)}>
                <option value="painted">Painted</option>
                <option value="raw">Raw Metal</option>
            </select>
            <button onClick={handleCalculate}>Calculate</button>
        </div>
    );
};

export default Calculator;
