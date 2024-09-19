// src/components/Calculator.js

import React, { useState, useEffect } from 'react';
import '../styles/rv-calculator.css'; // Adjust the path as necessary

const Calculator = () => {
    const [length, setLength] = useState(6);
    const [width, setWidth] = useState(2.5);
    const [roofType, setRoofType] = useState('painted');
    const [totalArea, setTotalArea] = useState(0);
    const [products, setProducts] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [selectedProducts, setSelectedProducts] = useState([]);

    useEffect(() => {
        // Initialize products
        const initialProducts = [
            // Your product objects go here
            {
                name: 'Waterproof Sealant',
                image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d2066e697100ccddc6e54f.webp',
                coveragePerLitre: 0.7 * 1.15,
                buckets: [
                    { size: 1, price: 49 },
                    { size: 4, price: 99 },
                    { size: 15, price: 299 }
                ],
                infoText: 'Waterproof Sealant is essential for keeping your roof protected from water damage.',
            },
            {
                name: 'Geo Textile',
                image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d206a057f60d1680e999ad.webp',
                variants: [
                    { name: '100mm x 20m', price: 19.95, areaLimit: 10 * 1.1 },
                    { name: '100mm x 50m', price: 31.95, areaLimit: Infinity }
                ],
                infoText: 'Geo Textile reinforces the roof coating system and helps with waterproofing.',
            },
            {
                name: 'BONUS',
                image: 'https://cdn.shopify.com/s/files/1/0556/0614/9253/files/Brush_and_Roller_Kit.png?v=1726414468',
                variants: [{ name: 'Brush + Roller Kit', price: 0 }],
                infoText: 'Everything you need to apply the Products.',
            }
        ];
        
        setProducts(initialProducts);
        updatePrimerProduct(roofType);
    }, []);

    const updatePrimerProduct = (roofType) => {
        const primerProduct = {
            name: roofType === 'painted' ? 'Sealer/Primer' : 'Etch Primer',
            image: roofType === 'painted'
                ? 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d9850ff720ed71.webp'
                : 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded766f982f5e25b033.webp',
            coveragePerLitre: roofType === 'painted' ? 8 * 1.2 : 6 * 1.2,
            buckets: [
                {
                    size: 1,
                    price: roofType === 'painted' ? 29 : 39
                },
                {
                    size: 4,
                    price: roofType === 'painted' ? 99 : 109
                }
            ],
            infoText: roofType === 'painted'
                ? 'Sealer/Primer is used to protect painted roof surfaces to improve adhesion.'
                : 'Etch Primer is essential for raw metal surfaces to improve adhesion.'
        };
        setProducts(prevProducts => {
            const updatedProducts = [...prevProducts];
            updatedProducts[2] = primerProduct; // Update the third product
            return updatedProducts;
        });
    };

    const calculateProductPrice = (product) => {
        const area = length * width;
        if (product.name === 'Geo Textile') {
            const variant = product.variants.find(v => area <= v.areaLimit);
            return variant.price;
        }

        if (product.name === 'BONUS') {
            return 0;
        }

        if (product.coveragePerLitre && product.buckets) {
            let requiredArea = area;
            if (product.name === 'Waterproof Sealant') {
                requiredArea *= 0.2; // Only 20% of the area needs to be covered
            }
            const litresRequired = requiredArea / product.coveragePerLitre;
            let totalPrice = 0;
            product.buckets.forEach(bucket => {
                const bucketsNeeded = Math.ceil(litresRequired / bucket.size);
                totalPrice += bucketsNeeded * bucket.price;
            });
            return totalPrice;
        }
        return 0;
    };

    const displayProducts = () => {
        const area = length * width;
        setTotalPrice(0);
        const updatedSelections = products.map(product => {
            const priceForProduct = calculateProductPrice(product);
            return { ...product, calculatedPrice: priceForProduct };
        });
        setSelectedProducts(updatedSelections);
        const total = updatedSelections.reduce((sum, product) => sum + product.calculatedPrice, 0);
        setTotalPrice(total);
    };

    const handleCalculate = () => {
        updatePrimerProduct(roofType);
        displayProducts();
        setTotalArea((length * width).toFixed(2));
    };

    return (
        <div id="rv-calculator-container">
            <h1>Caravan Roof Calculator</h1>
            <div>
                <label>Length (m):</label>
                <input
                    type="number"
                    value={length}
                    onChange={e => setLength(Math.min(e.target.value, 20))}
                />
            </div>
            <div>
                <label>Width (m):</label>
                <input
                    type="number"
                    value={width}
                    onChange={e => setWidth(Math.min(e.target.value, 3))}
                />
            </div>
            <div>
                <label>Roof Type:</label>
                <select value={roofType} onChange={e => setRoofType(e.target.value)}>
                    <option value="painted">Painted</option>
                    <option value="raw">Raw Metal</option>
                </select>
            </div>
            <button onClick={handleCalculate}>Calculate</button>

            <div>Total Area: {totalArea} m²</div>
            <div id="caravan-product-list">
                {selectedProducts.map(product => (
                    <div key={product.name} className="caravan-product-container">
                        <img src={product.image} alt={product.name} />
                        <div>{product.name}</div>
                        <div>Price: ${product.calculatedPrice.toFixed(2)}</div>
                    </div>
                ))}
            </div>
            <div>Total Price: ${totalPrice.toFixed(2)}</div>
        </div>
    );
};

export default Calculator;
