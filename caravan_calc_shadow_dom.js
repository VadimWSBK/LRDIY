class CaravanCalculator extends HTMLElement {
    constructor() {
        super();
        // Attach a shadow root to the custom element
        const shadow = this.attachShadow({ mode: 'open' });

        // Create a container for the calculator
        const container = document.createElement('div');
        container.setAttribute('id', 'rv-calculator-container');
        
        // Add styles
        const style = document.createElement('link');
        style.setAttribute('rel', 'stylesheet');
        style.setAttribute('href', 'https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY/caravan_calc_style.css');

        // Set inner HTML
        container.innerHTML = `
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
        `;

        // Append styles and container to shadow root
        shadow.appendChild(style);
        shadow.appendChild(container);

       
        // Add the main script logic here
        this.init();
        }

        init() {
            // Initialize the correct primer product on page load
            const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value);
            const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value);
            const roofType = this.shadowRoot.getElementById('caravan-roof-type').value;
            
            this.ccalc_updatePrimerProduct(roofType);
            this.ccalc_displayProducts(length, width, roofType);

            // Add event listeners
            this.shadowRoot.getElementById('caravan-calculate-button').addEventListener('click', () => {
                // Recalculate on button click
                const newLength = parseFloat(this.shadowRoot.getElementById('caravan-length').value);
                const newWidth = parseFloat(this.shadowRoot.getElementById('caravan-width').value);
                const newRoofType = this.shadowRoot.getElementById('caravan-roof-type').value;
                this.ccalc_displayProducts(newLength, newWidth, newRoofType);
            });
        }

        // Define your calculation functions here
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

        ccalc_displayProducts(length = 6, width = 2.5, roofType = 'painted') {
            const productList = document.getElementById('caravan-product-list');
            let totalPrice = 0;

            // Reset product list to prevent duplication
            productList.innerHTML = '';

            const area = length * width;

            // Update the total area display
            document.getElementById('caravan-total-area').innerText = `Area: ${area.toFixed(2)} m²`;

            globalProductSelections = []; // Reset global selections

            products.forEach((product) => {
                if (!product.name || !product.image) return;

                // Proceed with creating and appending product elements
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
                const productDetails = document.createElement('div');
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

                const productQuantity = document.createElement('div');
                productQuantity.classList.add('caravan-product-quantity');
                const bucketSizes = ccalc_calculateBucketSizes(product, length, width, roofType);
                productQuantity.innerHTML = bucketSizes.map(size => `<span class="caravan-quantity-item">${size}</span>`).join('');

                const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);

                const productPrice = document.createElement('div');
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
        }

        customElements.define('caravan-calculator', CaravanCalculator);
