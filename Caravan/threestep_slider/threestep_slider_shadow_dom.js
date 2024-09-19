class ThreeStepsSlider extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });

        // Create the main container
        const container = document.createElement('div');
        container.setAttribute('class', 'threestepsslider-container');

        // Create the wrapper for slides
        const wrapper = document.createElement('div');
        wrapper.setAttribute('class', 'threestepsslider-wrapper');

        // Slides data
        const slidesData = [
            {
                imgSrc: 'https://assets.cdn.filesafe.space/ewm9gNGbZG828XI4tybh/media/66d56eb708d9605e507d0fa7.jpeg',
                headline: 'Step 1:',
                subheadline: 'Cleaning and Detailing',
                points: [
                    '👉 Wash/water-blast the entire surface.',
                    '👉 Apply Waterproof Sealant with brush to seams, joins, cracks, holes or rusty areas before embedding the pre-cut Geo-Textile.',
                    '👉 Apply 2 coats of Waterproof Sealant with brush or roller to the defected areas.'
                ]
            },
            {
                imgSrc: 'https://assets.cdn.filesafe.space/ewm9gNGbZG828XI4tybh/media/66d56eb7f10da4af4ddc4b32.jpeg',
                headline: 'Step 2:',
                subheadline: 'Apply Primer and 1 Coat of Thermal Coating',
                points: [
                    '👉 Apply Sealer/Primer to the entire surface.',
                    '👉 Apply one coat of Thermal Coating over the Waterproof Sealant.'
                ]
            },
            {
                imgSrc: 'https://assets.cdn.filesafe.space/ewm9gNGbZG828XI4tybh/media/66d56eb7cccab23a7649dc3b.jpeg',
                headline: 'Step 3:',
                subheadline: 'Apply 2 Coats of Thermal Coating',
                points: [
                    '👉 Apply 2 coats of Thermal Coating to the entire surface.',
                    '👉 DONE! Good Job 👍'
                ]
            }
        ];

        slidesData.forEach(slide => {
            const slideDiv = document.createElement('div');
            slideDiv.setAttribute('class', 'threestepsslider-slide');
            slideDiv.innerHTML = `
                <div class="threestepsslider-content">
                    <img src="${slide.imgSrc}" alt="${slide.headline}">
                    <div class="threestepsslider-text-content">
                        <div class="threestepsslider-headline">${slide.headline}</div>
                        <div class="threestepsslider-subheadline">${slide.subheadline}</div>
                        <ul class="threestepsslider-bulletpoints">
                            ${slide.points.map(point => `<li>${point}</li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
            wrapper.appendChild(slideDiv);
        });

        const prevButton = document.createElement('button');
        prevButton.setAttribute('class', 'threestepsslider-button-prev');
        prevButton.innerHTML = '&#10094;';
        prevButton.addEventListener('click', () => this.prevSlide());

        const nextButton = document.createElement('button');
        nextButton.setAttribute('class', 'threestepsslider-button-next');
        nextButton.innerHTML = '&#10095;';
        nextButton.addEventListener('click', () => this.nextSlide());

        container.appendChild(wrapper);
        container.appendChild(prevButton);
        container.appendChild(nextButton);
        shadow.appendChild(container);
        this.createStyles(shadow);
        
        this.currentIndex = 0;
        this.slides = shadow.querySelectorAll('.threestepsslider-slide');
        this.updateSlide();
    }

    createStyles(shadow) {
        const style = document.createElement('style');
        style.textContent = `
            .threestepsslider-container {
                width: 100%;
                height: 100%;
                overflow: hidden;
                position: relative;
                font-family: Helvetica, sans-serif;
            }
            .threestepsslider-wrapper {
                display: flex;
                transition: transform 0.5s ease;
            }
            .threestepsslider-slide {
                min-width: 100%;
                display: flex;
                padding: 40px;
                flex-direction: column;
                align-items: center;
                justify-content: top;
                box-sizing: border-box;
            }
            .threestepsslider-slide img {
                width: 100%;
                height: auto;
                border-radius: 15px;
                object-fit: cover;
            }
            .threestepsslider-text-content {
                text-align: left;
                padding: 10px;
                box-sizing: border-box;
            }
            .threestepsslider-headline {
                font-weight: bold;
                font-size: 1.4em;
                margin-bottom: 5px;
                color: #00A62D;
            }
            .threestepsslider-subheadline {
                font-size: 1.2em;
                margin: 5px 0;
                font-weight: bold;
            }
            .threestepsslider-bulletpoints {
                list-style: none;
                padding: 0;
                margin: 0;
            }
            .threestepsslider-bulletpoints li {
                margin: 5px 0;
            }
            .threestepsslider-button-next, .threestepsslider-button-prev {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                background-color: transparent;
                color: #00A62D;
                border: none;
                cursor: pointer;
                font-size: 30px;
            }
            .threestepsslider-button-prev {
                left: 10px;
            }
            .threestepsslider-button-next {
                right: 10px;
            }
            @media (min-width: 1024px) {
                .threestepsslider-slide {
                    min-width: 33.33%;
                }
                .threestepsslider-button-next, .threestepsslider-button-prev {
                    display: none;
                }
            }
            @media (min-width: 768px) and (max-width: 1023px) {
                .threestepsslider-slide {
                    min-width: 50%;
                }
            }
            @media (max-width: 767px) {
                .threestepsslider-slide {
                    min-width: 100%;
                }
            }
        `;
        shadow.appendChild(style);
    }

    updateSlide() {
        const slidesPerView = this.getSlidesPerView();
        const wrapper = this.shadowRoot.querySelector('.threestepsslider-wrapper');
        const maxIndex = this.slides.length - slidesPerView;
        this.currentIndex = Math.max(0, Math.min(this.currentIndex, maxIndex));
        wrapper.style.transform = `translateX(-${this.currentIndex * (100 / slidesPerView)}%)`;
    }

    getSlidesPerView() {
        if (window.innerWidth >= 1024) return 3;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    nextSlide() {
        const slidesPerView = this.getSlidesPerView();
        if (this.currentIndex < this.slides.length - slidesPerView) {
            this.currentIndex++;
            this.updateSlide();
        }
    }

    prevSlide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
            this.updateSlide();
        }
    }

    connectedCallback() {
        window.addEventListener('resize', () => this.updateSlide());
    }

    disconnectedCallback() {
        window.removeEventListener('resize', () => this.updateSlide());
    }
}

customElements.define('threeslider-widget', ThreeStepsSlider);
