
document.addEventListener('DOMContentLoaded', () => {
    // Your existing JavaScript code
class CaravanCalculator extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.innerHTML = `
            <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.css">
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

        this.products = this.initializeProducts();

        // Add event listeners
        this.calculateButton = this.shadowRoot.getElementById('caravan-calculate-button');
        this.calculateButton.addEventListener('click', this.calculate.bind(this));

        this.shadowRoot.getElementById('caravan-roof-type').addEventListener('change', this.updateProducts.bind(this));
        this.shadowRoot.getElementById('caravan-length').addEventListener('input', this.enforceMaxValue.bind(this, 20));
        this.shadowRoot.getElementById('caravan-width').addEventListener('input', this.enforceMaxValue.bind(this, 3));

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
        this.displayProducts(length, width, roofType); // Call to display products
        this.calculate(); // Call to ensure calculations are correct on load
    }

    updatePrimerProduct(roofType) {
        const primerProduct = {
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
        this.products[2] = primerProduct; // Update the third product in the array
    }

    enforceMaxValue(max, event) {
        const input = event.target;
        input.value = Math.min(parseFloat(input.value) || 0, max);
    }

    calculate() {
        const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value) || 0;
        const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value) || 0;
        const roofType = this.shadowRoot.getElementById('caravan-roof-type').value;
        this.updatePrimerProduct(roofType);
        this.displayProducts(length, width, roofType);
    }

    displayProducts(length = 6, width = 2.5, roofType = 'painted') {
        const productList = this.shadowRoot.getElementById('caravan-product-list');
        let totalPrice = 0;

        // Reset product list to prevent duplication
        productList.innerHTML = '';

        const area = length * width;
        this.shadowRoot.getElementById('caravan-total-area').innerText = `Area: ${area.toFixed(2)} m²`;

        this.products.forEach((product) => {
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
            productCheckbox.addEventListener('change', () => {
                const priceForProduct = this.calculateProductPrice(product, length, width, roofType);
                totalPrice += productCheckbox.checked ? priceForProduct : -priceForProduct;
                this.shadowRoot.getElementById('caravan-total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
            });

            productImageContainer.appendChild(productImage);
            productImageContainer.appendChild(productCheckbox);
            productContainer.appendChild(productImageContainer);
            productList.appendChild(productContainer);
        });

        // Update total price display
        this.shadowRoot.getElementById('caravan-total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
    }

    calculateProductPrice(product, length, width, roofType) {
        const area = length * width;

        if (product.name === 'Geo Textile') {
            return product.variants.reduce((total, variant) => {
                if (area <= variant.areaLimit) {
                    return total + variant.price;
                }
                return total;
            }, 0);
        }

        const coverage = product.coveragePerLitre || 0;
        const requiredLitres = area / coverage;
        let totalPrice = 0;

        product.buckets.forEach(bucket => {
            if (requiredLitres <= bucket.size) {
                totalPrice += bucket.price;
            }
        });

        return totalPrice;
    }
}

customElements.define('caravan-calculator', CaravanCalculator);
});