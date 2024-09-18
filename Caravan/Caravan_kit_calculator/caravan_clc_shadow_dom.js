class CaravanCalculator extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.loadContent();
    }

    async loadContent() {
        const response = await fetch('https://cdn.jsdelivr.net/gh/VadimWSBK/LRDIY@main/Caravan/Caravan_kit_calculator/caravan_clc.html');
        const html = await response.text();

        const cssResponse = await fetch('https://raw.githubusercontent.com/VadimWSBK/LRDIY/main/Caravan/Caravan_kit_calculator/caravan_clc.css');
        const css = await cssResponse.text();

        // Create a constructed stylesheet
        const sheet = new CSSStyleSheet();
        await sheet.replace(css); // Use replace instead of insertRule

        this.shadowRoot.adoptedStyleSheets = [sheet];
        this.shadowRoot.innerHTML += html;
    }
}

customElements.define('caravan-calculator', CaravanCalculator);



