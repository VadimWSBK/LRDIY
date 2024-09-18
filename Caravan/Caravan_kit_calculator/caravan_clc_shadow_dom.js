class CaravanCalculator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a container for the calculator
        const container = document.createElement('div');
        container.setAttribute('id', 'rv-calculator-container');

        // Add styles
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.css');

        // Set inner HTML
        container.innerHTML = `
            <div class="caravan-calculator-container">
                <h1>How Big Is Your Caravan?</h1>
                <div class="caravan-input-row">
                    <div class="caravan-input-container">
                        <label for="caravan-length">Enter Length:</label>
                        <input type="number" id="caravan-length" value="6" min="0" max="20" step="0.1" />
                        <span class="caravan-unit">m</span>
                    </div>
                    <div class="caravan-input-container">
                        <label for="caravan-width">Enter Width:</label>
                        <input type="number" id="caravan-width" value="2.5" min="0" max="3" step="0.1" />
                        <span class="caravan-unit">m</span>
                    </div>
                    <div class="caravan-input-container">
                        <label for="caravan-roof-type">Select Roof Surface:</label>
                        <select id="caravan-roof-type">
                            <option value="painted" selected>Painted Surface</option>
                            <option value="metal">Raw Metal Surface</option>
                        </select>
                    </div>
                </div>
                <button id="caravan-calculate-button">👉 Calculate</button>
                <div id="caravan-total-area">Total Area: 15.00 m²</div>
                <h2>👇 Everything You Need To Seal Your Caravan Roof.</h2>
                <div id="caravan-product-list"></div>
                <div id="caravan-alert-popup" style="display: none;">Please select at least one product before adding the BONUS product.</div>
                <button id="caravan-buy-now-button">ADD KIT TO CART</button>
                <div id="caravan-total-price">$0.00</div>
                <div id="caravan-discounted-price">$0.00</div>
                <p>GST Included + FREE Shipping</p>
            </div>
        `;

            // Creating a script element
            const script = document.createElement('script');
            script.textContent = `
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
            `;

            // Append script to the Shadow DOM
            shadowRoot.appendChild(script);

        }
    }