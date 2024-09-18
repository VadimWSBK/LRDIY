<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Caravan Roof Coating Kit Builder</title>
</head>
<body>

<caravan-calculator></caravan-calculator>

<script>
    class CaravanCalculator extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: 'open' });
            this.loadContent();
        }

        async loadContent() {
            try {
                // Fetch HTML, CSS, and JS
                const response = await fetch('https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.html');
                if (!response.ok) throw new Error('Failed to fetch HTML');
                const html = await response.text();

                // Create a style element (if you want to include additional styles)
                const style = document.createElement('style');
                style.textContent = `
                    /* Additional styles can be added here if needed */
                `;

                // Append the style and HTML to the shadow DOM
                this.shadowRoot.appendChild(style);
                this.shadowRoot.innerHTML += html;

                // Add the script tag if there's JavaScript needed from the HTML
                const script = document.createElement('script');
                script.textContent = `
                    // Include any JavaScript needed for functionality
                    // Ensure the code does not conflict with the Shadow DOM
                `;
                this.shadowRoot.appendChild(script);
            } catch (error) {
                console.error('Error loading content:', error);
                this.shadowRoot.innerHTML = '<p>Error loading the calculator. Please try again later.</p>';
            }
        }
    }

    // Define the custom element
    customElements.define('caravan-calculator', CaravanCalculator);
</script>

</body>
</html>


