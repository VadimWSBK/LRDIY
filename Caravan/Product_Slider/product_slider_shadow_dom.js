class ProductSlider extends HTMLElement {
    constructor() {
      super();
      this.attachShadow({ mode: 'open' });
      this.currentIndex = 0;
    }
  
    connectedCallback() {
      this.render();
      this.init();
    }
  
    render() {
      this.shadowRoot.innerHTML = `
        <style>
          /* Unique Swiper container for the productslider */
          .productslider-container {
            width: 100%;
            height: 100%;
            overflow: hidden;
            background: black;
            position: relative;
            font-family: Helvetica, sans-serif;
          }
  
          /* Slide wrapper */
          .productslider-wrapper {
            display: flex;
            transition: transform 0.5s ease;
          }
  
          /* Swiper slide container for image and text */
          .productslider-slide {
            min-width: 100%;
            display: flex;
            padding: 40px;
            flex-direction: column;
            align-items: center;
            justify-content: bottom;
            box-sizing: border-box;
            text-align: center;
          }
  
          /* Image within the Swiper slide */
          .productslider-slide img {
            width: 80%;
            height: auto;
            border-radius: 15px;
            object-fit: cover;
          }
  
          /* Text content */
          .productslider-text-content {
            padding: 10px;
            box-sizing: border-box;
          }
  
          /* Headline text */
          .productslider-carousel-item h3 {
            font-weight: bold;
            font-size: clamp(19px, 4vw, 22px);
            margin-bottom: 5px;
            color: #00A62D;
          }
  
          /* Subheadline text */
          .productslider-carousel-item p {
            font-size: clamp(16px, 4vw, 18px);
            margin: 5px 0;
            color: white;
          }
          
          .go-to-product-button {
            margin-top: 10px;
            padding: 12px 25px;
            font-size: 16px;
            color: white;
            background-color: transparent;
            border-radius: 5px;
            width: auto;
            text-align: center;
            cursor: pointer;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
            box-shadow: inset 0 6px 15px rgba(0, 166, 45, 0.5), 0 4px 10px rgba(0, 166, 45, 0.5);
          }
  
          .go-to-product-button:hover {
            color: white;
            border-color: white;
            transform: scale(1.05); /* Slight scale effect on hover */
            box-shadow: inset 0 6px 15px rgba(255, 255, 255, 0.5);
          }
  
          /* Navigation buttons */
          .productslider-button-next, .productslider-button-prev {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            background-color: transparent;
            color: #00A62D;
            border: none;
            cursor: pointer;
            font-size: 35px;
          }
  
          .productslider-button-prev {
            left: 10px;
          }
  
          .productslider-button-next {
            right: 10px;
          }
  
          /* Responsive breakpoints */
          @media (min-width: 1024px) {
            .productslider-slide {
              min-width: 33.33%;
            }
          }
  
          @media (min-width: 768px) and (max-width: 1023px) {
            .productslider-slide {
              min-width: 50%;
            }
          }
  
          @media (max-width: 767px) {
            .productslider-slide {
              min-width: 100%;
            }
          }
        </style>
  
        <div class="productslider-container">
          <div class="productslider-wrapper">
            ${this.getSlides()}
          </div>
          <button class="productslider-button-prev">&#10094;</button>
          <button class="productslider-button-next">&#10095;</button>
        </div>
      `;
  
      this.addEventListeners();
    }
  
    getSlides() {
      const slidesData = [
        {
          img: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d2066e697100ccddc6e54f.webp',
          title: 'Waterproof Sealant',
          text: 'This is the main player. Super durable, flexible, and waterproof.',
          link: 'https://liquidrubberdiy.com.au/products/waterproof-sealant?sca_ref=3419258.V3jzDInQbZ',
        },
        {
          img: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d206a057f60d1680e999ad.webp',
          title: 'Geo Textile',
          text: 'Reinforce cracks and boost sealant performance with this textile.',
          link: 'https://liquidrubberdiy.com.au/products/geo-textile?sca_ref=3419258.V3jzDInQbZ',
        },
        {
          img: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d9850ff720ed71.webp',
          title: 'Sealer / Primer',
          text: 'Enhances adhesion and protects pre-coated surfaces.',
          link: 'https://liquidrubberdiy.com.au/products/sealer?sca_ref=3419258.V3jzDInQbZ',
        },
        {
          img: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded766f982f5e25b033.webp',
          title: 'Etch Primer',
          text: 'Enhances adhesion and protects raw metal surfaces.',
          link: 'https://liquidrubberdiy.com.au/products/etch-primer?sca_ref=3419258.V3jzDInQbZ',
        },
        {
          img: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66ec0551c9252b9fe1fb1f5d.webp',
          title: 'Thermal Coating',
          text: 'Reflects heat and withstands harsh UV rays.',
          link: 'https://liquidrubberdiy.com.au/products/protective-top-coat?sca_ref=3419258.V3jzDInQbZ',
        }
      ];
  
      return slidesData.map(slide => `
        <div class="productslider-slide">
          <div class="productslider-carousel-item">
            <img src="${slide.img}" alt="${slide.title}">
            <h3>${slide.title}</h3>
            <p>${slide.text}</p>
            <a href="${slide.link}" target="_blank">
              <div class="go-to-product-button">Go to Product -></div>
            </a>
          </div>
        </div>
      `).join('');
    }
  
    addEventListeners() {
      this.shadowRoot.querySelector('.productslider-button-next').addEventListener('click', () => this.nextSlide());
      this.shadowRoot.querySelector('.productslider-button-prev').addEventListener('click', () => this.prevSlide());
      window.addEventListener('resize', () => this.showSlide(this.currentIndex));
      this.showSlide(this.currentIndex);
    }
  
    getSlidesPerView() {
      if (window.innerWidth >= 1024) {
        return 3; // 3 slides on desktop
      } else if (window.innerWidth >= 768) {
        return 2; // 2 slides on tablet
      } else {
        return 1; // 1 slide on mobile
      }
    }
  
    showSlide(index) {
      const slidesPerView = this.getSlidesPerView();
      const wrapper = this.shadowRoot.querySelector('.productslider-wrapper');
      const slides = this.shadowRoot.querySelectorAll('.productslider-slide');
  
      if (index < 0) {
        this.currentIndex = 0;
      } else if (index >= slides.length - slidesPerView) {
        this.currentIndex = slides.length - slidesPerView;
      } else {
        this.currentIndex = index;
      }
  
      wrapper.style.transform = `translateX(-${this.currentIndex * (100 / slidesPerView)}%)`;
    }
  
    nextSlide() {
      const slidesPerView = this.getSlidesPerView();
      if (this.currentIndex < this.shadowRoot.querySelectorAll('.productslider-slide').length - slidesPerView) {
        this.showSlide(this.currentIndex + 1);
      }
    }
  
    prevSlide() {
      if (this.currentIndex > 0) {
        this.showSlide(this.currentIndex - 1);
      }
    }
  
    init() {
        this.showSlide(this.currentIndex);
      }
    }
    
    // Define the custom element
    customElements.define('product-slider-widget', ProductSlider);