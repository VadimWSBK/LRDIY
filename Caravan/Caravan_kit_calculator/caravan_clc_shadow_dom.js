<meta http-equiv="Content-Security-Policy" content="script-src 'self' 'unsafe-inline' https://cdn.jsdelivr.net;">
// Create a shadow root in your desired container
const container = document.createElement('div');
document.body.appendChild(container);
const shadowRoot = container.attachShadow({ mode: 'open' });

fetch('https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.html')
    .then(response => response.text())
    .then(html => {
        shadowRoot.innerHTML = html;
        
        // Create and append the script
        const script = document.createElement('script');
        script.src = 'https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/shadowdom_clc_modified_script.js'; // Your script file
        script.onload = () => {
            // Now your script is loaded and can access the DOM elements
            console.log('Script loaded and ready to execute');
        };
        shadowRoot.appendChild(script);
    })
    .catch(error => console.error('Error loading HTML:', error));

customElements.define('caravan-calculator', CaravanCalculator);
