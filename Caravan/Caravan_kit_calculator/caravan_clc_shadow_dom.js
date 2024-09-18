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

        // Load JavaScript
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY/caravan_calc_js_without_hidden_fields.js';
        shadow.appendChild(script);
    }
}

// Define the custom element
customElements.define('caravan-calculator', CaravanCalculator);
