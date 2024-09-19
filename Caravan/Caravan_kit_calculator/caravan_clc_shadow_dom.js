document.addEventListener('DOMContentLoaded', () => {
            class CaravanShadowComponent extends HTMLElement {
                constructor() {
                    super();
                    const shadow = this.attachShadow({ mode: 'open' });

                    // Create HTML structure
                    const wrapper = document.createElement('div');
                    wrapper.innerHTML = `
                        <style>
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
                        </style>

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

                    this.init();
                }
                                init() {
                                    this.shadowRoot.addEventListener('DOMContentLoaded', () => {
                                        // Place your existing JavaScript code here
                                        // Replace document.getElementById() with this.shadowRoot.querySelector()
                                        
                                    // Initialize the correct primer product on page load
                                        const length = parseFloat(shadow.getElementById('caravan-length').value);
                                        const width = parseFloat(shadow.getElementById('caravan-width').value);
                                        const roofType = shadow.getElementById('caravan-roof-type').value;
                                        ccalc_updatePrimerProduct(roofType);
                                        ccalc_displayProducts(length, width, roofType);

                                        const products = [
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

                            //All EVENT LISTENERS
                                    // Event listener for roofType selection change
                                        this.shadowRoot.getElementById('caravan-roof-type').addEventListener('change', () => {
                                            const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value);
                                            const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value);
                                            const roofType = this.shadowRoot.getElementById('caravan-roof-type').value;
                                            this.ccalc_updatePrimerProduct(roofType);
                                            this.ccalc_displayProducts(length, width, roofType);
                                        });

                                    // Event listener for Calculate button
                                        this.shadowRoot.getElementById('caravan-calculate-button').addEventListener('click', function () {
                                            const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value);
                                            const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value);
                                            const roofType = this.shadowRoot.getElementById('caravan-roof-type').value;
                                            ccalc_updatePrimerProduct(roofType);
                                            ccalc_displayProducts(length, width, roofType);
                                        });

                                    // Event listeners for input fields to enforce max values
                                        this.shadowRoot.getElementById('caravan-length').addEventListener('input', function () {
                                            this.value = ccalc_enforceMaxValue(this.value, 20);
                                        });

                                        this.shadowRoot.getElementById('caravan-width').addEventListener('input', function () {
                                            this.value = ccalc_enforceMaxValue(this.value, 3);
                                        });

                                    // Attach the event listener to the "Why do I need it?" link
                                        const infoLink = productDetails.querySelector('.caravan-info-link');
                                        infoLink.addEventListener('click', function () {
                                            ccalc_showInfoPopup(this, product.infoText);
                                        });
                                        
                                    // Close any open popup when clicking outside
                                        window.addEventListener('click', function (event) {
                                            if (!event.target.matches('.caravan-info-link')) {
                                                const popups = this.shadowRoot.querySelectorAll('.caravan-info-popup');
                                                popups.forEach(popup => popup.classList.remove('active'));
                                            }
                                        });
                                        // Add other event listeners and functions as needed...
                                    });
                                }
                                
                                // ALL FUNCTIONS
                
                            
                                    // Function to update the primer product based on roof type
                                        ccalc_updatePrimerProduct(roofType) {
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

                                        
                            
                                    // Function to display products
                                        ccalc_displayProducts(length = 6, width = 2.5, roofType = 'painted') {
                                            const productList = this.shadowRoot.getElementById('caravan-product-list');
                                            let totalPrice = 0;

                                            // Reset product list to prevent duplication
                                            productList.innerHTML = '';

                                            const area = length * width;

                                            // Update the total area display
                                            this.shadowRoot.getElementById('caravan-total-area').innerText = `Area: ${area.toFixed(2)} m²`;

                                            globalProductSelections = []; // Reset global selections

                                            products.forEach((product) => {
                                                if (!product.name || !product.image) return;

                                                // Proceed with creating and appending product elements
                                                const productContainer = this.shadowRoot.createElement('div');
                                                productContainer.classList.add('caravan-product-container');

                                                const productImageContainer = this.shadowRoot.createElement('div');
                                                productImageContainer.classList.add('caravan-product-image-container');
                                                const productImage = this.shadowRoot.createElement('img');
                                                productImage.src = product.image;
                                                const productCheckbox = this.shadowRoot.createElement('input');
                                                productCheckbox.type = 'checkbox';
                                                productCheckbox.checked = true;

                                                // Checkbox change function
                                                productCheckbox.addEventListener('change', function () {
                                                    const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);

                                                    // BONUS product check/uncheck logic
                                                    if (product.name === 'BONUS') {
                                                        if (this.checked) {
                                                            if (globalProductSelections.length === 0 || globalProductSelections.every(p => p.variantId === product.variants[0].variantId)) {
                                                                ccalc_showCustomAlert('You must select at least one other product before adding the BONUS product.');
                                                                this.checked = false;
                                                                return;
                                                            }
                                                            ccalc_addProductToSelections(product, length, width, roofType);
                                                        } else {
                                                            ccalc_removeProductFromSelections(product);
                                                        }
                                                    } else {
                                                        if (this.checked) {
                                                            totalPrice += priceForProduct;
                                                            ccalc_addProductToSelections(product, length, width, roofType);
                                                        } else {
                                                            totalPrice -= priceForProduct;
                                                            ccalc_removeProductFromSelections(product);
                                                        }
                                                        ccalc_updateTotalPrice(totalPrice);
                                                    }
                                                });

                                                productImageContainer.appendChild(productCheckbox);
                                                productImageContainer.appendChild(productImage);

                                                // Product info text function
                                                const productDetails = this.shadowRoot.createElement('div');
                                                productDetails.classList.add('caravan-product-details');

                                                // Set the HTML content for product details
                                                productDetails.innerHTML = `
                                                    <div class="caravan-product-name">${product.name}</div>
                                                    <div class="caravan-info-link">Why do I need it?</div>
                                                    <div class="caravan-info-popup">${product.infoText}</div>
                                                `;

                                                // Attach the event listener to the "Why do I need it?" link
                                                const infoLink = productDetails.querySelector('.caravan-info-link');
                                                infoLink.addEventListener('click', function () {
                                                    ccalc_showInfoPopup(this, product.infoText);
                                                });

                                                const productQuantity = this.shadowRoot.createElement('div');
                                                productQuantity.classList.add('caravan-product-quantity');
                                                const bucketSizes = ccalc_calculateBucketSizes(product, length, width, roofType);
                                                productQuantity.innerHTML = bucketSizes.map(size => `<span class="caravan-quantity-item">${size}</span>`).join('');

                                                const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);

                                                const productPrice = this.shadowRoot.createElement('div');
                                                productPrice.classList.add('caravan-product-price');
                                                productPrice.innerHTML = `$${priceForProduct.toFixed(2)}`;

                                                totalPrice += priceForProduct;

                                                productContainer.appendChild(productImageContainer);
                                                productContainer.appendChild(productDetails);
                                                productContainer.appendChild(productQuantity);
                                                productContainer.appendChild(productPrice);
                                                productList.appendChild(productContainer);

                                                // Add product to global selections
                                                ccalc_addProductToSelections(product, length, width, roofType);
                                            });

                                            ccalc_updateTotalPrice(totalPrice);
                                        }

                                    // Product Price calculation function
                                            ccalc_calculateProductPrice(product, length, width, roofType) {
                                                const area = length * width;
                                    
                                                if (product.name === 'Geo Textile') {
                                                    const variant = product.variants.find(v => area <= v.areaLimit);
                                                    return variant.price;
                                                }
                                    
                                                if (product.name === 'BONUS') {
                                                    return 0; // BONUS product has a price of $0 but should still be added
                                                }
                                    
                                                if (product.coveragePerLitre && product.buckets) {
                                                    let requiredArea = area;
                                                    if (product.name === 'Waterproof Sealant') {
                                                        requiredArea = area * 0.2; // Only 20% of the area needs to be covered
                                                    }
                                    
                                                    const requiredVolume = requiredArea / product.coveragePerLitre;
                                                    const bestCombination = ccalc_findBestBucketCombination(requiredVolume, product.buckets);
                                    
                                                    const adjustedCombination = ccalc_adjustBucketCounts(bestCombination, product.buckets, product);
                                    
                                                    return adjustedCombination.totalCost;
                                                }
                                    
                                                return 0;
                                            }
                                        


                                    // BUCKET SIZE CALCULATION FUNCTION
                                        ccalc_calculateBucketSizes(product, length, width, roofType) {
                                            const area = length * width;
                                            let buckets = [];
                                
                                            if (product.name === 'Geo Textile') {
                                                const variant = product.variants.find(v => area <= v.areaLimit);
                                                buckets.push(`1 x ${variant.name}`);
                                            } else if (product.name === 'BONUS') {
                                                const variant = product.variants.find(v => v.variantId === '40918670606469');
                                                if (variant) {
                                                    buckets.push(`1 x ${variant.name}`);
                                                }
                                            } else if (product.coveragePerLitre && product.buckets) {
                                                let requiredArea = area;
                                                if (product.name === 'Waterproof Sealant') {
                                                    requiredArea = area * 0.2; // Only 20% of the area needs to be covered
                                                }
                                                const requiredVolume = requiredArea / product.coveragePerLitre;
                                                const bestCombination = ccalc_findBestBucketCombination(requiredVolume, product.buckets);
                                                const adjustedCombination = ccalc_adjustBucketCounts(bestCombination, product.buckets, product);
                                
                                                adjustedCombination.buckets.forEach(bucket => {
                                                    if (bucket.count > 0) {
                                                        buckets.push(`${bucket.count} x ${bucket.size}L Bucket`);
                                                    }
                                                });
                                            }
                                
                                            return buckets;
                                        }


                                        // Function to adjust bucket counts
                                
                                            ccalc_findBestBucketCombination(requiredVolume, buckets) {
                                                let minTotalCost = Infinity;
                                                let minWaste = Infinity;
                                                let bestCombination = null;

                                                const maxCounts = buckets.map(bucket => Math.ceil(requiredVolume / bucket.size) + 1);
                                                const countsArray = buckets.map((bucket, index) => {
                                                    return [...Array(maxCounts[index] + 1).keys()];
                                                });

                                                const combinations = ccalc_cartesianProduct(...countsArray);

                                                combinations.forEach(counts => {
                                                    let totalVolume = 0;
                                                    let totalCost = 0;
                                                    counts.forEach((count, index) => {
                                                        totalVolume += count * buckets[index].size;
                                                        totalCost += count * buckets[index].price;
                                                    });

                                                    if (totalVolume >= requiredVolume) {
                                                        const waste = totalVolume - requiredVolume;
                                                        if (totalCost < minTotalCost || (totalCost === minTotalCost && waste < minWaste)) {
                                                            minTotalCost = totalCost;
                                                            minWaste = waste;
                                                            bestCombination = {
                                                                buckets: counts.map((count, index) => ({
                                                                    size: buckets[index].size,
                                                                    count: count,
                                                                    price: buckets[index].price
                                                                })),
                                                                totalVolume: totalVolume,
                                                                totalCost: totalCost,
                                                                waste: waste
                                                            };
                                                        }
                                                    }
                                                });

                                                return bestCombination;
                                            }
                                    
                                        // Function to adjust bucket counts
                                            ccalc_cartesianProduct(...arrays) {
                                                return arrays.reduce((acc, curr) => {
                                                    const res = [];
                                                    acc.forEach(a => {
                                                        curr.forEach(b => {
                                                            res.push(a.concat([b]));
                                                        });
                                                    });
                                                    return res;
                                                }, [[]]);
                                            }

                                            ccalc_adjustBucketCounts(bestCombination, availableBuckets, product) {
                                                let bucketCounts = {};
                                                bestCombination.buckets.forEach(bucket => {
                                                    bucketCounts[bucket.size] = bucket.count;
                                                });
                                    
                                                if (product.name === 'Sealer/Primer' || product.name === 'Etch Primer') {
                                                    if ((bucketCounts[1] || 0) >= 3) {
                                                        bucketCounts[4] = (bucketCounts[4] || 0) + 1;
                                                        bucketCounts[1] = 0;
                                                    }
                                                    if ((bucketCounts[4] || 0) >= 3) {
                                                        bucketCounts[15] = (bucketCounts[15] || 0) + 1;
                                                        bucketCounts[4] = 0;
                                                    }
                                                } else {
                                                    if ((bucketCounts[1] || 0) >= 2) {
                                                        bucketCounts[4] = (bucketCounts[4] || 0) + 1;
                                                        bucketCounts[1] = 0;
                                                    }
                                                    if ((bucketCounts[4] || 0) >= 3) {
                                                        bucketCounts[15] = (bucketCounts[15] || 0) + 1;
                                                        bucketCounts[4] = 0;
                                                    }
                                                }
                                    
                                                let adjustedBuckets = [];
                                                let totalCost = 0;
                                    
                                                for (let size in bucketCounts) {
                                                    size = parseInt(size);
                                                    let count = bucketCounts[size];
                                                    if (count > 0) {
                                                        let bucketInfo = availableBuckets.find(b => b.size === size);
                                                        let price = bucketInfo.price;
                                                        adjustedBuckets.push({ size: size, count: count, price: price, variantId: bucketInfo.variantId });
                                                        totalCost += count * price;
                                                    }
                                                }
                                    
                                                return {
                                                    buckets: adjustedBuckets,
                                                    totalCost: totalCost
                                                };
                                            }

                                            ccalc_updateTotalPrice(totalPrice) {
                                                const discountRate = 0.10;
                                                const discountedPrice = totalPrice * (1 - discountRate);
                                                const totalSavings = totalPrice - discountedPrice;
                                    
                                                this.shadowRoot.getElementById('caravan-total-price').innerText = `$${totalPrice.toFixed(2)}`;
                                                this.shadowRoot.getElementById('caravan-discounted-price').innerText = `$${discountedPrice.toFixed(2)}`;
                                                this.shadowRoot.getElementById('caravan-total-savings').innerText = `$${totalSavings.toFixed(2)}`;
                                            }

                                            ccalc_addProductToSelections(product, length, width, roofType) {
                                                const area = length * width;
                                    
                                                if (product.name === 'Geo Textile') {
                                                    const variant = product.variants.find(v => area <= v.areaLimit);
                                                    globalProductSelections.push({
                                                        variantId: variant.variantId,
                                                        quantity: 1
                                                    });
                                                } else if (product.name === 'BONUS') {
                                                    if (globalProductSelections.length === 0 || globalProductSelections.every(p => p.variantId === product.variants[0].variantId)) {
                                                        ccalc_showCustomAlert('You must select at least one product before adding the BONUS product.');
                                                        this.checked = false;
                                                        return;
                                                    }
                                                    globalProductSelections.push({
                                                        variantId: product.variants[0].variantId,
                                                        quantity: 1
                                                    });
                                                } else if (product.coveragePerLitre && product.buckets) {
                                                    let requiredArea = area;
                                                    if (product.name === 'Waterproof Sealant') {
                                                        requiredArea = area * 0.2;
                                                    }
                                                    const requiredVolume = requiredArea / product.coveragePerLitre;
                                                    const bestCombination = ccalc_findBestBucketCombination(requiredVolume, product.buckets);
                                                    const adjustedCombination = ccalc_adjustBucketCounts(bestCombination, product.buckets, product);
                                    
                                                    adjustedCombination.buckets.forEach(bucket => {
                                                        globalProductSelections.push({
                                                            variantId: bucket.variantId,
                                                            quantity: bucket.count
                                                        });
                                                    });
                                                }
                                            }

                                            ccalc_removeProductFromSelections(product) {
                                                if (product.name === 'BONUS') {
                                                    globalProductSelections = globalProductSelections.filter(item => item.variantId !== product.variants[0].variantId);
                                                } else if (product.coveragePerLitre && product.buckets) {
                                                    const variantIds = product.buckets.map(bucket => bucket.variantId);
                                                    globalProductSelections = globalProductSelections.filter(item => !variantIds.includes(item.variantId));
                                                } else if (product.name === 'Geo Textile') {
                                                    globalProductSelections = globalProductSelections.filter(selection => !product.variants.some(variant => variant.variantId === selection.variantId));
                                                }
                                    
                                                const hasOnlyBonusProduct = globalProductSelections.length === 1 && globalProductSelections[0].variantId === '40918670606469';
                                    
                                                if (globalProductSelections.length === 0 || hasOnlyBonusProduct) {
                                                    ccalc_showCustomAlert('Please select at least one product.');
                                                    
                                                    if (hasOnlyBonusProduct) {
                                                        globalProductSelections = [];
                                                    }
                                                }
                                            }


                                        // Function to handle popups
                                            
                                                ccalc_showInfoPopup(linkElement, popupText) {
                                                const popup = linkElement.nextElementSibling;
                                                popup.innerHTML = popupText;
                                                popup.classList.toggle('active');
                                            }

                                            // Function to handle popups on ALERT
                                            ccalc_showCustomAlert(message) {
                                                const alertPopup = this.shadowRoot.getElementById('caravan-alert-popup');
                                                alertPopup.innerText = message;
                                                alertPopup.style.display = 'flex';

                                                // Hide the popup after 3 seconds
                                                setTimeout(() => {
                                                    alertPopup.style.display = 'none';
                                                }, 3000);
                                            }

                                                   // Function to enforce maximum values
                                            ccalc_enforceMaxValue(value, max, elementId) {
                                                value = parseFloat(value);
                                                if (isNaN(value) || value < 0) {
                                                    value = 0;
                                                }
                                                if (value > max) {
                                                    value = max;
                                                    if (elementId) {
                                                        this.shadowRoot.getElementById(elementId).value = max;
                                                    }
                                                }
                                                return value;
                                            }

                                        // Event listeners for ADD TO CART BUTTON
                                        this.shadowRoot.getElementById('caravan-buy-now-button').addEventListener('click', function () {
                                            if (globalProductSelections.length === 0) {
                                                ccalc_showCustomAlert('Please select at least one product.');
                                                return;
                                            }
                                    
                                                const cartItems = globalProductSelections.map(selection => `${selection.variantId}:${selection.quantity}`).join(',');
                                    
                                                const utmParameters = 'utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit';
                                    
                                                const discountCode = 'Caravan-KIT-10OFF-Offer';
                                                const discountParameter = `discount=${encodeURIComponent(discountCode)}`;
                                    
                                                const checkoutUrl = `https://www.liquidrubberdiy.com.au/cart/${cartItems}?storefront=true&${utmParameters}&${discountParameter}&note=Caravan_Kit_With_Brush_and_Roller&sca_ref=3419258.V3jzDInQbZ`;
                                    
                                                window.open(checkoutUrl, '_blank');
                                            });

                                
                                        
                    // Define the new element
                    customElements.define('caravan-kit-creator-calculator', CaravanShadowComponent);
                });
