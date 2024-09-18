(function() {
    document.addEventListener('DOMContentLoaded', function () {
        const products = [
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

        function ccalc_updatePrimerProduct(roofType) {
            let primerProduct = {
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
            products[2] = primerProduct;
        }

        function ccalc_showInfoPopup(linkElement, popupText) {
            const popup = linkElement.nextElementSibling;
            popup.innerHTML = popupText;
            popup.classList.toggle('active');
        }

        function ccalc_showCustomAlert(message) {
            const alertPopup = document.getElementById('caravan-alert-popup');
            alertPopup.innerText = message;
            alertPopup.style.display = 'flex';

            setTimeout(() => {
                alertPopup.style.display = 'none';
            }, 3000);
        }

        window.addEventListener('click', function (event) {
            if (!event.target.matches('.caravan-info-link')) {
                const popups = document.querySelectorAll('.caravan-info-popup');
                popups.forEach(popup => popup.classList.remove('active'));
            }
        });

        const shadowRoot = document.getElementById('rv-calculator-container').shadowRoot; // Adjust as necessary

        shadowRoot.getElementById('caravan-roof-type').addEventListener('change', function () {
            const length = parseFloat(shadowRoot.getElementById('caravan-length').value);
            const width = parseFloat(shadowRoot.getElementById('caravan-width').value);
            const roofType = this.value;
            ccalc_updatePrimerProduct(roofType);
            ccalc_displayProducts(length, width, roofType);
        });

        shadowRoot.getElementById('caravan-calculate-button').addEventListener('click', function () {
            const length = parseFloat(shadowRoot.getElementById('caravan-length').value);
            const width = parseFloat(shadowRoot.getElementById('caravan-width').value);
            const roofType = shadowRoot.getElementById('caravan-roof-type').value;
            ccalc_updatePrimerProduct(roofType);
            ccalc_displayProducts(length, width, roofType);
        });

        shadowRoot.getElementById('caravan-length').addEventListener('input', function () {
            this.value = ccalc_enforceMaxValue(this.value, 20);
        });

        shadowRoot.getElementById('caravan-width').addEventListener('input', function () {
            this.value = ccalc_enforceMaxValue(this.value, 3);
        });

        function ccalc_enforceMaxValue(value, max) {
            value = parseFloat(value);
            if (isNaN(value) || value < 0) {
                return 0;
            }
            return Math.min(value, max);
        }

        window.onload = function () {
            const length = parseFloat(shadowRoot.getElementById('caravan-length').value);
            const width = parseFloat(shadowRoot.getElementById('caravan-width').value);
            const roofType = shadowRoot.getElementById('caravan-roof-type').value;
            ccalc_updatePrimerProduct(roofType);
            ccalc_displayProducts(length, width, roofType);
        };

        function ccalc_displayProducts(length = 6, width = 2.5, roofType = 'painted') {
            const productList = shadowRoot.getElementById('caravan-product-list');
            let totalPrice = 0;
            productList.innerHTML = '';

            const area = length * width;
            shadowRoot.getElementById('caravan-total-area').innerText = `Area: ${area.toFixed(2)} m²`;

            let globalProductSelections = [];

            products.forEach((product) => {
                if (!product.name || !product.image) return;

                const productContainer = document.createElement('div');
                productContainer.classList.add('caravan-product-container');

                const productImageContainer = document.createElement('div');
                productImageContainer.classList.add('caravan-product-image-container');
                const productImage = document.createElement('img');
                productImage.src = product.image;

                const productCheckbox = document.createElement('input');
                productCheckbox.type = 'checkbox';
                productCheckbox.checked = true;

                productCheckbox.addEventListener('change', function () {
                    const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);

                    if (product.name === 'BONUS') {
                        if (this.checked) {
                            if (globalProductSelections.length === 0 || globalProductSelections.every(p => p.variantId === product.variants[0].variantId)) {
                                globalProductSelections.push(product.variants[0]);
                            }
                        } else {
                            globalProductSelections = globalProductSelections.filter(p => p.variantId !== product.variants[0].variantId);
                        }
                    } else {
                        if (this.checked) {
                            totalPrice += priceForProduct;
                            globalProductSelections.push(product.buckets[0]);
                        } else {
                            totalPrice -= priceForProduct;
                            globalProductSelections = globalProductSelections.filter(p => p.size !== product.buckets[0].size);
                        }
                    }
                    shadowRoot.getElementById('caravan-total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
                });

                const productInfoLink = document.createElement('a');
                productInfoLink.classList.add('caravan-info-link');
                productInfoLink.innerText = 'Info';
                productInfoLink.href = '#';
                productInfoLink.addEventListener('click', function (e) {
                    e.preventDefault();
                    ccalc_showInfoPopup(this, product.infoText);
                });

                const productInfoPopup = document.createElement('div');
                productInfoPopup.classList.add('caravan-info-popup');

                const productName = document.createElement('p');
                productName.innerText = product.name;
                const productCheckboxLabel = document.createElement('label');
                productCheckboxLabel.appendChild(productCheckbox);
                productCheckboxLabel.appendChild(productName);

                productImageContainer.appendChild(productImage);
                productContainer.appendChild(productImageContainer);
                productContainer.appendChild(productCheckboxLabel);
                productContainer.appendChild(productInfoLink);
                productContainer.appendChild(productInfoPopup);

                productList.appendChild(productContainer);
            });

            shadowRoot.getElementById('caravan-total-price').innerText = `Total Price: $${totalPrice.toFixed(2)}`;
        }

        function ccalc_calculateProductPrice(product, length, width, roofType) {
            let area = length * width;
            if (product.coveragePerLitre) {
                return product.buckets.reduce((total, bucket) => {
                    const coverage = bucket.size * product.coveragePerLitre;
                    if (area <= coverage) {
                        return total + bucket.price;
                    }
                    return total;
                }, 0);
            } else if (product.variants) {
                for (const variant of product.variants) {
                    if (area <= variant.areaLimit) {
                        return variant.price;
                    }
                }
            }
            return 0;
        }
    });
})();
