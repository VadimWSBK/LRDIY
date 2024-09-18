document.addEventListener('DOMContentLoaded', () => {
    class CaravanCalculator extends HTMLElement {
        constructor() {
            super();
            const shadow = this.attachShadow({ mode: 'open' });

            const stylesheet = new CSSStyleSheet();
            stylesheet.replaceSync(`
            #rv-calculator-container .caravan-calculator-container {
                max-width: 600px;
                background-color: black;
                padding: 20px;
                border-radius: 20px;
                margin: auto;
                box-shadow: 
                    inset 0 6px 15px rgba(0, 166, 45, 0.5), /* Inner shadow */
                    0 6px 15px rgba(0, 0, 0, 0.3); /* Outer shadow */
                font-family: Helvetica, sans-serif;
                position: relative;
            }
            
            /* -------HEADING CONTAINER --------*/
            #rv-calculator-container .caravan-heading-container {
                text-align: center;
                margin-bottom: 20px;
                font-weight: 700;
            }
            #rv-calculator-container .caravan-heading-container h1 {
                color: #00A62D;
                margin-bottom: 3px;
                font-weight: 700;
                font-size: clamp(18px, 6vw, 32px);
            }
            #rv-calculator-container .caravan-heading-container p {
                color: black;
                margin-top: 0;
                font-weight: 700;
                font-size: clamp(14px, 3vw, 20px);
            }
            
            /* ------- INPUT SECTION --------  */
            #rv-calculator-container .caravan-calculator-container .caravan-input-row {
                display: flex;
                flex-wrap: wrap;
                gap: 8px;
                align-items: flex-start;
                justify-content: flex-start;
                width: 100%;
            }
            #rv-calculator-container .caravan-calculator-container .caravan-input-container {
                gap: 10px;
                background-color: black;
                padding: 5px;
                border-radius: 10px;
                display: flex;
                width: 100%;
                flex-direction: column;
                justify-content: bottom;
                flex: 1;
            }
            #rv-calculator-container .caravan-calculator-container .caravan-input-container label {
                font-weight: bold;
                display: block;
                color: whitesmoke;
                margin-bottom: 5px;
                text-align: left;
                font-size: clamp(16px, 2vw, 18px);
            }
            #rv-calculator-container .caravan-input-container .caravan-input-wrapper input[type="number"],
            #rv-calculator-container .caravan-input-container .caravan-input-wrapper select {
                all: unset;
                width: 100%; /* Fill the container */
                padding: 10px;
                font-size: clamp(16px, 5vw, 20px);
                border: 1px solid #ccc;
                border-radius: 10px;
                text-align: center;
                box-shadow: 0 6px 15px rgba(0, 166, 45, 0.5);
                background-color: whitesmoke;
                font-weight: 600;
            }
            #rv-calculator-container .caravan-calculator-container .caravan-input-wrapper {
                display: flex;
                align-items: center;
            }
        
            #rv-calculator-container .caravan-calculator-container .caravan-unit {
                margin-left: 5px;
                font-size: clamp(14px, 5vw, 18px);
                color: white;
            }
            
        
        
            
            /*------ CALCULATE BUTTON AND TOTAL AREA -------*/
            #rv-calculator-container .caravan-calculate-button-container {
                background-color: black;
                border-radius: 10px;
                width: 100%;
                margin-top: 10px;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            #rv-calculator-container .caravan-calculate-button {
                background-color: #00A62D;
                color: white;
                border-radius: 10px;
                padding: 10px 20px;
                font-size: clamp(16px, 5vw, 20px);
                border: none;
                cursor: pointer;
                margin-top: 5px;
                box-shadow: 0 4px 10px rgba(0, 166, 45, 0.5);
                transition: transform 0.2s, background-color 0.2s;
            }
            #rv-calculator-container .caravan-calculate-button:hover {
                background-color: #00A62D;
                transform: scale(1.05);
            }
            #rv-calculator-container .caravan-total-area {
                color: whitesmoke;
                font-size: clamp(14px, 5vw, 20px);
                padding: 10px;
                font-style: bold;
                border-radius: 10px;
                margin-right: 10px;
            }
            
            /* -------SUB_HEADING CONTAINER --------*/
            #rv-calculator-container .caravan-subheading-container {
                text-align: center;
                margin-top: 20px;
                margin-bottom: 20px;
                font-weight: 700;
            }
            #rv-calculator-container .caravan-subheading-container h2 {
                color: whitesmoke;
                margin-bottom: 2px;
                font-size: clamp(12px, 5vw, 20px);
            }
            #rv-calculator-container .caravan-subheading-container p {
                color: white;
                margin-top: 0;
                font-size: clamp(14px, 5vw, 14px);
                font-weight: 700;
                text-align: center;
            }
            
            /* ------ ADD-TO-CART-BUTTON AND TOTAL PRICE ------*/
            #rv-calculator-container .caravan-total-price-button-container {
                background-color: black;
                border-radius: 10px;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            #rv-calculator-container .caravan-buy-now-button {
                background-color: #00A62D;
                color: white;
                border-radius: 10px;
                padding: 10px 20px;
                font-size: clamp(14px, 4vw, 20px);
                border: none;
                cursor: pointer;
                margin-top: 5px;
                box-shadow: 0 4px 10px rgba(0, 166, 45, 0.5);
                transition: transform 0.2s, background-color 0.2s;
                flex-direction: column;
                align-items: center;
                text-align: center;
            }
            #rv-calculator-container .caravan-buy-now-button:hover {
                background-color: #00A62D;
                transform: scale(1.05);
            }
            #rv-calculator-container .caravan-buy-now-button-subtext {
                font-size: clamp(12px, 4vw, 16px);
                margin-top: 2px;
            }
            #rv-calculator-container .caravan-total-price-container {
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                gap: 5px;
            }
            #rv-calculator-container .caravan-total-price-info {
                display: flex;
                gap: 5px;
            }
            #rv-calculator-container .caravan-total-price-text {
                color: whitesmoke;
                font-size: clamp(14px, 5vw, 20px);
                font-weight: 600;
            }
            #rv-calculator-container .caravan-total-price {
                margin: 0;
                color: #B04327;
                text-decoration: line-through;
                font-size: clamp(14px, 5vw, 20px);
                border-right: 1px solid white;
                padding-right: 5px;
            }
            #rv-calculator-container .caravan-discounted-price {
                color: #00A62D;
                font-size: clamp(14px, 5vw, 20px);
                font-weight: 600;
            }
            #rv-calculator-container .caravan-total-savings-info {
                align-items: center;
                font-weight: 600;
            }
            #rv-calculator-container .caravan-total-savings {
                color: #00A62D;
                font-size: clamp(12px, 5vw, 14px);
                margin-top: 2px;
                display: flex;
                font-weight: 600;
            }
            #rv-calculator-container .caravan-total-savings-text {
                color: whitesmoke;
                font-size: clamp(12px, 5vw, 14px);
                font-weight: 600;
                margin-right: 5px;
                display: flex;
            }
            #rv-calculator-container .caravan-product-gst_shipping {
                color: whitesmoke;
                padding: 0px;
                margin-top: 2px;
            }
            #rv-calculator-container .caravan-product-gst_shipping p {
                font-size: clamp(8px, 5vw, 10px);
                margin: 0;
            }
            
            /* ------- PRODUCT LIST --------  */
            #rv-calculator-container .caravan-product-list-container {
                margin-bottom: 20px;
                background-color: black;
            }
            #rv-calculator-container .caravan-product-container {
                display: flex;
                margin-bottom: 10px;
                border: 1px solid;
                border-color: #ccc;
                border-radius: 10px;
                justify-content: space-between;
                align-items: center;
                padding: 10px;
                background-color: whitesmoke;
                box-shadow: 0 6px 12px rgba(0, 166, 45, 0.5);
            }
            #rv-calculator-container .caravan-product-image-container {
                position: relative;
            }
            #rv-calculator-container .caravan-product-image-container img {
                width: 100px;
            }
            #rv-calculator-container .caravan-calculator-container input[type="checkbox"] {
                position: absolute;
                top: 0;
                left: 0;
                width: 14px;
                height: 14px;
                accent-color: #00A62D;
                transform: scale(1.3);
                transform-origin: 0 0;
            }
            #rv-calculator-container .caravan-product-name {
                color: black;
                font-weight: bold;
            }
            #rv-calculator-container .caravan-info-popup {
                display: none;
                position: absolute;
                background-color: #00A62D;
                color: white;
                padding: 10px;
                border-radius: 10px;
                font-size: 12px;
                max-width: 200px;
                z-index: 120;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                margin-top: 10px;
            }
            #rv-calculator-container .caravan-info-popup.active {
                display: block;
            }
            #rv-calculator-container .caravan-info-popup::after {
                content: "";
                position: absolute;
                top: -10px;
                left: 20px;
                border-width: 10px;
                border-style: solid;
                border-color: transparent transparent green transparent;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
            }
            #rv-calculator-container .caravan-product-details {
                flex-grow: 1;
                margin-left: 20px;
                position: relative;
                font-size: clamp(16px, 5vw, 18px);
            }
            #rv-calculator-container .caravan-info-link {
                color: #00A62D;
                text-decoration: underline;
                cursor: pointer;
                font-size: 12px;
            }
            #rv-calculator-container .caravan-product-quantity {
                display: flex;
                flex-direction: column;
                gap: 2px;
            }
            #rv-calculator-container .caravan-quantity-item {
                display: inline-block;
                margin: 0;
                padding: 0;
                line-height: 1;
                font-size: clamp(13px, 3vw, 16px);
            }
            #rv-calculator-container .caravan-product-price {
                color: #00A62D;
                font-weight: bold;
                font-size: clamp(14px, 3vw, 18px);
                margin-left: 20px;
            }
            
            /* -------ALERT POPUP------------- */
            #rv-calculator-container .caravan-alert-popup {
                background-color: #B04327;
                color: white;
                padding: 10px;
                border-radius: 10px;
                font-size: 13px;
                max-width: 200px;
                z-index: 120;
                display: block;
                border-color: transparent transparent #00A62D transparent;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
                margin-top: 10px;
            }
            
            /* -------Responsive Styles ------------- */
            /* Small devices (portrait tablets and large phones, 481px and up) */
            @media (max-width: 767px) {
                #rv-calculator-container .caravan-input-container {
                    flex: 1 1 45%;
                }
                #rv-calculator-container .caravan-input-container:nth-child(3) {
                    flex: 1 1 100%;
                }
                #rv-calculator-container .caravan-product-price {
                    margin-left: 10px;
                }
            }
            /* -------- MAX PHONES ----------- */
            @media (max-width: 520px) {
                #rv-calculator-container .caravan-subheading-container h2 {
                    color: whitesmoke;
                    margin-bottom: 2px;
                    font-size: clamp(12px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-product-quantity {
                    font-size: clamp(12px, 5vw, 14px);
                    margin-right: 10px;
                }
                #rv-calculator-container .caravan-product-details {
                    flex-grow: 1;
                    margin-left: 5px;
                    position: relative;
                }
                #rv-calculator-container .caravan-input-row {
                    display: block;
                    gap: 10px;
                    align-items: center;
                }
                #rv-calculator-container .caravan-input-container {
                    gap: 10px;
                    padding: 5px;
                    border-radius: 10px;
                    display: block;
                    min-width: 10%;
                }
            }
            /* ------ Iphone 13/14 max---------- */
            @media (max-width: 500px) {
                #rv-calculator-container .caravan-product-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    flex-wrap: wrap;
                    position: relative;
                }
                #rv-calculator-container .caravan-product-image-container {
                    flex-basis: 20%;
                }
                #rv-calculator-container .caravan-product-details {
                    position: absolute;
                    left: 120px;
                    top: 30px;
                    flex-basis: auto;
                }
                #rv-calculator-container .caravan-product-quantity {
                    position: absolute;
                    left: 125px;
                    top: 80px;
                    flex-basis: auto;
                }
                #rv-calculator-container .caravan-quantity-item {
                    font-size: clamp(12px, 3vw, 14px);
                }
                #rv-calculator-container .caravan-product-price {
                    position: absolute;
                    right: 10px;
                    top: 45%;
                    flex-basis: auto;
                }
                #rv-calculator-container .caravan-total-price-text {
                    font-size: clamp(12px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-total-price {
                    font-size: clamp(12px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-discounted-price {
                    font-size: clamp(12px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-product-gst_shipping {
                    color: whitesmoke;
                    font-size: clamp(12px, 3vw, 14px);
                }
            }
            /* ------ Iphone 13/14 ---------- */
            @media (max-width: 420px) {
                #rv-calculator-container .caravan-total-price-button-container {
                    align-items: center;
                    flex-direction: column;
                }
                #rv-calculator-container .caravan-total-price-container {
                    align-items: center;
                }
                #rv-calculator-container .caravan-buy-now-button {
                    width: 100%;
                    justify-content: center;
                    font-weight: 600;
                    font-size: clamp(16px, 4vw, 20px);
                    margin-bottom: 20px;
                    flex-direction: column;
                }
                #rv-calculator-container .caravan-buy-now-button-subtext {
                    font-size: clamp(12px, 4vw, 16px);
                    margin-top: 2px;
                }
                #rv-calculator-container .caravan-product-details {
                    font-size: clamp(14px, 4vw, 14px);
                }
                #rv-calculator-container .caravan-product-quantity {
                    font-size: clamp(12px, 3vw, 14px);
                }
                #rv-calculator-container .caravan-quantity-item {
                    font-size: clamp(12px, 3vw, 14px);
                }
                #rv-calculator-container .caravan-total-price-text {
                    font-size: clamp(14px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-total-price {
                    font-size: clamp(14px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-discounted-price {
                    font-size: clamp(14px, 5vw, 16px);
                }
                #rv-calculator-container .caravan-product-gst_shipping {
                    color: whitesmoke;
                    font-size: clamp(14px, 3vw, 14px);
                }
            }
        
            `);
            shadow.adoptedStyleSheets = [stylesheet];
            
            const container = document.createElement('div');
            container.innerHTML = `
                <div id="rv-calculator-container">
                    <div class="caravan-calculator-container">
                        <div class="caravan-heading-container">
                            <h1>How Big Is Your Caravan? </h1>
                        </div>
                        <div class="caravan-input-row">
                            <div class="caravan-input-container">
                                <label for="caravan-length">Enter Length:</label>
                                <div class="caravan-input-wrapper">
                                    <input type="number" id="caravan-length" value="6" min="0" max="20" step="0.1" />
                                    <span class="caravan-unit">m</span>
                                </div>
                            </div>
                            <div class="caravan-input-container">
                                <label for="caravan-width">Enter Width:</label>
                                <div class="caravan-input-wrapper">
                                    <input type="number" id="caravan-width" value="2.5" min="0" max="3" step="0.1" />
                                    <span class="caravan-unit">m</span>
                                </div>
                            </div>
                            <div class="caravan-input-container">
                                <label for="caravan-roof-type">Select Roof Surface:</label>
                                <div class="caravan-input-wrapper">
                                    <select id="caravan-roof-type">
                                        <option value="painted" selected>Painted Surface</option>
                                        <option value="metal">Raw Metal Surface</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class="caravan-calculate-button-container">
                            <button id="caravan-calculate-button" class="caravan-calculate-button">👉 Calculate</button>
                            <div class="caravan-total-area" id="caravan-total-area">Total Area: 15.00 m²</div>
                        </div>
                        <div class="caravan-subheading-container">
                            <h2>👇 Everything You Need To Seal Your Caravan Roof.</h2>
                        </div>
                        <div id="caravan-product-list" class="caravan-product-list-container"></div>
                        <div id="caravan-alert-popup" class="caravan-alert-popup" style="display: none;">
                            Please select at least one product before adding the BONUS product.
                        </div>
                        <div class="caravan-total-price-button-container">
                            <button id="caravan-buy-now-button" class="caravan-buy-now-button">
                                <div class="caravan-buy-now-button-text">ADD KIT TO CART</div>
                                <div class="caravan-buy-now-button-subtext">And Save 10%</div>
                            </button>
                            <div class="caravan-total-price-container">
                                <div class="caravan-total-price-info">
                                    <span class="caravan-total-price-text">Total:</span>
                                    <div class="caravan-total-price" id="caravan-total-price">$0.00</div>
                                    <div class="caravan-discounted-price" id="caravan-discounted-price">$0.00</div>
                                </div>
                                <div class="caravan-total-savings-info">
                                    <div class="caravan-total-savings">
                                        <span class="caravan-total-savings-text">Total Savings:</span>
                                        <div id="caravan-total-savings">$0.00</div>
                                    </div>
                                </div>
                                <div class="caravan-product-gst_shipping">
                                    <p>GST Included + FREE Shipping</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
            shadow.appendChild(container);
            this.products = this.initializeProducts();

            // Add event listeners
            this.calculateButton = shadow.getElementById('caravan-calculate-button');
            this.calculateButton.addEventListener('click', this.calculate.bind(this));

            shadow.getElementById('caravan-roof-type').addEventListener('change', this.updateProducts.bind(this));
            shadow.getElementById('caravan-length').addEventListener('input', this.enforceMaxValue.bind(this, 20));
            shadow.getElementById('caravan-width').addEventListener('input', this.enforceMaxValue.bind(this, 3));

            // Initialize products on load
            this.init();
        }

        initializeProducts() {
            return [
                {
                    name: 'Waterproof Sealant',
                    image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d2066e697100ccddc6e54f.webp',
                    coveragePerLitre: 0.7 * 1.15,
                    buckets: [
                        { size: 1, price: 49, variantId: '40021385117829' },
                        { size: 4, price: 99, variantId: '40021385052293' },
                        { size: 15, price: 299, variantId: '40021385019525' }
                    ],
                    infoText: 'Waterproof Sealant is essential for keeping your roof protected from water damage.',
                },
                {
                    name: 'Geo Textile',
                    image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d206a057f60d1680e999ad.webp',
                    variants: [
                        { name: '100mm x 20m', price: 19.95, areaLimit: 10 * 1.1, variantId: '40021432696965' },
                        { name: '100mm x 50m', price: 31.95, areaLimit: Infinity, variantId: '40161100103813' }
                    ],
                    infoText: 'Geo Textile reinforces the roof coating system and helps with waterproofing.',
                },
                {
                    // Placeholder for Sealer/Primer or Etch Primer based on roof type
                },
                {
                    name: 'Thermal Coating',
                    image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d985c90720ed72.webp',
                    coveragePerLitre: 2 * 1.15,
                    buckets: [
                        { size: 1, price: 39, variantId: '40083835977861' },
                        { size: 4, price: 99, variantId: '40083835224197' },
                        { size: 15, price: 299, variantId: '40083834503301' }
                    ],
                    infoText: 'Thermal Coating reflects UV rays, protects against damage, and keeps your caravan cool.',
                },
                {
                    name: 'BONUS',
                    image: 'https://cdn.shopify.com/s/files/1/0556/0614/9253/files/Brush_and_Roller_Kit.png?v=1726414468',
                    variants: [
                        { name: 'Brush + Roller Kit', price: 0, variantId: '40918670606469' }
                    ],
                    infoText: 'Everything you need to apply the Products.',
                }
            ];
        }

        init() {
            const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value) || 0;
            const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value) || 0;
            const roofType = this.shadowRoot.getElementById('caravan-roof-type').value;
            this.updatePrimerProduct(roofType);
            
            // Calculate products and display them
            this.calculate(); // Ensure it shows the products and calculates the total area
        }

        function ccalc_updatePrimerProduct(roofType) {
            let primerProduct = {
                name: roofType === 'painted' ? 'Sealer/Primer' : 'Etch Primer',
                image: roofType === 'painted'
                    ? 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d9850ff720ed71.webp'
                    : 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded766f982f5e25b033.webp',
                coveragePerLitre: roofType === 'painted' ? 8 * 1.2 : 6 * 1.2,
                buckets: [
                    {
                        size: 1,
                        price: roofType === 'painted' ? 29 : 39,
                        variantId: roofType === 'painted' ? '40021404778629' : '40021407498373'
                    },
                    {
                        size: 4,
                        price: roofType === 'painted' ? 99 : 109,
                        variantId: roofType === 'painted' ? '40021404713093' : '40021407432837'
                    }
                ],
                infoText: roofType === 'painted'
                ? 'Sealer/Primer is used to protect painted roof surfaces to improve adhesion.'
                : 'Etch Primer is essential for raw metal surfaces to improve adhesion.'
        };

        products[2] = primerProduct; // Update the third product in the array
    }
        

    enforceMaxValue(maxValue, event) {
        if (event.target.value > maxValue) {
            event.target.value = maxValue;
        }
    }

    calculate() {
        const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value) || 0;
        const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value) || 0;
        const area = (length * width).toFixed(2);
        this.shadowRoot.getElementById('caravan-total-area').innerText = `Total Area: ${area} m²`;
        this.displayProducts(area);
        this.updateTotalPrice(area);
    }

    displayProducts(area) {
        const productListContainer = this.shadowRoot.getElementById('caravan-product-list');
        productListContainer.innerHTML = ''; // Clear previous entries

        this.products.forEach(product => {
            if (product.variants) {
                const variant = product.variants.find(v => area <= v.areaLimit);
                if (variant) {
                    const productDiv = document.createElement('div');
                    productDiv.className = 'product';
                    productDiv.innerHTML = `
                        <img src="${product.image}" alt="${product.name}" />
                        <h3>${product.name}</h3>
                        <p>${product.infoText}</p>
                        <p>Price: $${variant.price}</p>
                        <input type="checkbox" class="product-checkbox" data-price="${variant.price}" data-name="${product.name}">
                    `;
                    productListContainer.appendChild(productDiv);
                }
            } else {
                const productDiv = document.createElement('div');
                productDiv.className = 'product';
                productDiv.innerHTML = `
                    <img src="${product.image}" alt="${product.name}" />
                    <h3>${product.name}</h3>
                    <p>${product.infoText}</p>
                    <p>Price: $${product.buckets[0].price} for ${product.buckets[0].size}L</p>
                    <input type="checkbox" class="product-checkbox" data-price="${product.buckets[0].price}" data-name="${product.name}">
                `;
                productListContainer.appendChild(productDiv);
            }
        });
    }

    updateTotalPrice(area) {
        const totalPriceContainer = this.shadowRoot.getElementById('caravan-total-price');
        const totalSavingsContainer = this.shadowRoot.getElementById('caravan-total-savings');
        const discountedPriceContainer = this.shadowRoot.getElementById('caravan-discounted-price');
        const checkboxes = this.shadowRoot.querySelectorAll('.product-checkbox');

        let totalPrice = 0;
        let totalSavings = 0;
        let selectedProducts = 0;

        checkboxes.forEach(checkbox => {
            if (checkbox.checked) {
                totalPrice += parseFloat(checkbox.dataset.price);
                selectedProducts++;
            }
        });

        if (selectedProducts > 0) {
            totalPriceContainer.innerText = `$${totalPrice.toFixed(2)}`;
            const discount = totalPrice * 0.1;
            totalSavings = discount;
            discountedPriceContainer.innerText = `$${(totalPrice - discount).toFixed(2)}`;
            totalSavingsContainer.innerText = `$${totalSavings.toFixed(2)}`;
        } else {
            totalPriceContainer.innerText = '$0.00';
            discountedPriceContainer.innerText = '$0.00';
            totalSavingsContainer.innerText = '$0.00';
        }
    }
}

customElements.define('caravan-calculator', CaravanCalculator);
});

