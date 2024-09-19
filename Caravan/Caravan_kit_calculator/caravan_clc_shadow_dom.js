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
            shadow.appendChild(container);
    }

    (function() {
        document.addEventListener('DOMContentLoaded', function () {
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
    
            // Function to update the primer product based on roof type
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
    
            // Function to handle popups
            function ccalc_showInfoPopup(linkElement, popupText) {
                const popup = linkElement.nextElementSibling;
                popup.innerHTML = popupText;
                popup.classList.toggle('active');
            }
    
            // Function to handle popups on ALERT
            function ccalc_showCustomAlert(message) {
                const alertPopup = document.getElementById('caravan-alert-popup');
                alertPopup.innerText = message;
                alertPopup.style.display = 'flex';
    
                // Hide the popup after 3 seconds
                setTimeout(() => {
                    alertPopup.style.display = 'none';
                }, 3000);
            }
    
            // Close any open popup when clicking outside
            window.addEventListener('click', function (event) {
                if (!event.target.matches('.caravan-info-link')) {
                    const popups = document.querySelectorAll('.caravan-info-popup');
                    popups.forEach(popup => popup.classList.remove('active'));
                }
            });
    
            // Event listener for roofType selection change
            document.getElementById('caravan-roof-type').addEventListener('change', function () {
                const length = parseFloat(document.getElementById('caravan-length').value);
                const width = parseFloat(document.getElementById('caravan-width').value);
                const roofType = this.value;
                ccalc_updatePrimerProduct(roofType); // Update primer product
                ccalc_displayProducts(length, width, roofType);
            });
    
            // Event listener for Calculate button
            document.getElementById('caravan-calculate-button').addEventListener('click', function () {
                const length = parseFloat(document.getElementById('caravan-length').value);
                const width = parseFloat(document.getElementById('caravan-width').value);
                const roofType = document.getElementById('caravan-roof-type').value;
                ccalc_updatePrimerProduct(roofType);
                ccalc_displayProducts(length, width, roofType);
            });
    
            // Event listeners for input fields to enforce max values
            document.getElementById('caravan-length').addEventListener('input', function () {
                this.value = ccalc_enforceMaxValue(this.value, 20);
            });
    
            document.getElementById('caravan-width').addEventListener('input', function () {
                this.value = ccalc_enforceMaxValue(this.value, 3);
            });
    
            // Function to enforce maximum values
            function ccalc_enforceMaxValue(value, max) {
                value = parseFloat(value);
                if (isNaN(value) || value < 0) {
                    return 0; // Return 0 if the value is invalid
                }
                return Math.min(value, max); // Return the lesser of value or max
            }
    
            // Initialize the correct primer product on page load
            window.onload = function () {
                const length = parseFloat(document.getElementById('caravan-length').value);
                const width = parseFloat(document.getElementById('caravan-width').value);
                const roofType = document.getElementById('caravan-roof-type').value;
                ccalc_updatePrimerProduct(roofType);
                ccalc_displayProducts(length, width, roofType);
            };
    
            // Function to display products
            function ccalc_displayProducts(length = 6, width = 2.5, roofType = 'painted') {
                const productList = document.getElementById('caravan-product-list');
                let totalPrice = 0;
    
                // Reset product list to prevent duplication
                productList.innerHTML = '';
    
                const area = length * width;
    
                // Update the total area display
                document.getElementById('caravan-total-area').innerText = `Area: ${area.toFixed(2)} m²`;
    
                let globalProductSelections = []; // Reset global selections
    
                products.forEach((product) => {
                    if (!product.name || !product.image) return;
    
                    // Create product elements
                    const productContainer = document.createElement('div');
                    productContainer.classList.add('caravan-product-container');
    
                    const productImageContainer = document.createElement('div');
                    productImageContainer.classList.add('caravan-product-image-container');
                    const productImage = document.createElement('img');
                    productImage.src = product.image;
    
                    const productCheckbox = document.createElement('input');
                    productCheckbox.type = 'checkbox';
                    productCheckbox.checked = true;
    
                    // Checkbox change function
                    productCheckbox.addEventListener('change', function () {
                        const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);
    
                        // BONUS product check/uncheck logic
                        if (product.name === 'BONUS') {
                            if (this.checked) {
                                if (globalProductSelections.length === 0 || globalProductSelections.every(p => p.variantId === product.variants[0].variantId)) {
                                    globalProductSelections.push(product.variants[0]); // Only add the variant if not already added
                                }
                            } else {
                                globalProductSelections = globalProductSelections.filter(p => p.variantId !== product.variants[0].variantId);
                            }
                        } else {
                            if (this.checked) {
                                totalPrice += priceForProduct;
                                globalProductSelections.push(product.buckets[0]); // Assuming the first bucket is selected
                            } else {
                                totalPrice -= priceForProduct;
                                globalProductSelections = globalProductSelections.filter(p => p.size !== product.buckets[0].size);
                            }
                        }
                        
                        // Update total price display
                        document.getElementById('caravan-total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
                    });
    
                    productImageContainer.appendChild(productImage);
                    productImageContainer.appendChild(productCheckbox);
                    productContainer.appendChild(productImageContainer);
                    productList.appendChild(productContainer);
                });
    
                // Update total price display
                document.getElementById('caravan-total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
            }
    
            // Function to calculate price based on area
            function ccalc_calculateProductPrice(product, length, width, roofType) {
                const area = length * width;
    
                if (product.name === 'Geo Textile') {
                    // Calculate based on area limits
                    return product.variants.find(variant => area <= variant.areaLimit).price;
                } else {
                    const coveragePerLitre = product.coveragePerLitre || 0;
                    const totalLitresRequired = area / coveragePerLitre;
                    return Math.ceil(totalLitresRequired) * product.buckets[0].price; // Using the first bucket for simplicity
                }
            }
        });
    })();
    
});

