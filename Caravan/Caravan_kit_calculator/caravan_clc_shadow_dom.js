// Define the custom element
class CaravanRoofCalculator extends HTMLElement {
    constructor() {
        super();
        // Create a shadow root
        const shadow = this.attachShadow({ mode: 'open' });

        // Create styles
        const style = document.createElement('style');
        style.textContent = `
            /* Add your styles here or link to an external CSS file */
            @import url("https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.css");
        `;

        // Create the HTML structure
        const container = document.createElement('div');
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

        // Add event listeners for the calculator functionality
        this.calculateButton = shadow.getElementById('caravan-calculate-button');
        this.calculateButton.addEventListener('click', this.calculate.bind(this));
    }

    calculate() {
        // Implement the calculation logic here
        const length = parseFloat(this.shadowRoot.getElementById('caravan-length').value);
        const width = parseFloat(this.shadowRoot.getElementById('caravan-width').value);
        const totalArea = (length * width).toFixed(2);
        this.shadowRoot.getElementById('caravan-total-area').textContent = `Total Area: ${totalArea} m²`;
        
        // Additional calculation logic and product display can be added here
    }
}

// Define the new element
customElements.define('caravan-roof-calculator', CaravanRoofCalculator);
