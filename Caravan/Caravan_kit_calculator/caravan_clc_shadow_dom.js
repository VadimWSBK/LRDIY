<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;">
// Create a shadow root in your desired container
const container = document.createElement('div');
document.body.appendChild(container);
const shadowRoot = container.attachShadow({ mode: 'open' });

// Fetch and load your HTML content
fetch('https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.html')
    .then(response => response.text())
    .then(html => {
        shadowRoot.innerHTML = html;
    })
    .catch(error => console.error('Error loading HTML:', error));

// Define the custom element
customElements.define('caravan-calculator', CaravanCalculator);
