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

        // Append styles and container to shadow root
        shadow.appendChild(style);
        shadow.appendChild(container);

        // Load the external script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.js'; // Replace with your external .js file link
        script.onload = () => {
            this.init(); // Call init after the script is loaded
        };
        script.onerror = () => {
            console.error('Failed to load the external script.');
        };
        shadow.appendChild(script);
    }

    init() {
        // Add event listeners here
        const lengthInput = this.shadowRoot.getElementById('caravan-length');
        const widthInput = this.shadowRoot.getElementById('caravan-width');
        const roofTypeSelect = this.shadowRoot.getElementById('caravan-roof-type');

        // Validate that inputs are present
        if (!lengthInput || !widthInput || !roofTypeSelect) {
            console.error('Input elements not found.');
            return;
        }

        // Event listener for calculation
        this.shadowRoot.getElementById('caravan-calculate-button').addEventListener('click', () => {
            const newLength = parseFloat(lengthInput.value);
            const newWidth = parseFloat(widthInput.value);
            const newRoofType = roofTypeSelect.value;
            this.ccalc_displayProducts(newLength, newWidth, newRoofType);
        });

        // Initialize the values
        const length = parseFloat(lengthInput.value);
        const width = parseFloat(widthInput.value);
        const roofType = roofTypeSelect.value;

        this.ccalc_updatePrimerProduct(roofType);
        this.ccalc_displayProducts(length, width, roofType); // Ensure initial values are used
    }
}

customElements.define('caravan-calculator', CaravanCalculator);
