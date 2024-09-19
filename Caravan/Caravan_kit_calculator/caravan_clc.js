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

        // Function to update the primer product based on roof type
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
            products[2] = primerProduct; // Update the third product in the array
        }

        // Function to handle popups (remains the same)
        function ccalc_showInfoPopup(linkElement, popupText) {
            const popup = linkElement.nextElementSibling;
            popup.innerHTML = popupText;
            popup.classList.toggle('active');
        }

        // Function to handle popups on ALERT
        function ccalc_showCustomAlert(message) {
            const alertPopup = document.getElementById('caravan-alert-popup');
            alertPopup.innerText = message;
            alertPopup.style.display = 'flex';

            // Hide the popup after 3 seconds
            setTimeout(() => {
                alertPopup.style.display = 'none';
            }, 3000);
        }

        // Close any open popup when clicking outside
        window.addEventListener('click', function (event) {
            if (!event.target.matches('.caravan-info-link')) {
                const popups = document.querySelectorAll('.caravan-info-popup');
                popups.forEach(popup => popup.classList.remove('active'));
            }
        });

        // Event listener for roofType selection change
        document.getElementById('caravan-roof-type').addEventListener('change', function () {
            const length = parseFloat(document.getElementById('caravan-length').value);
            const width = parseFloat(document.getElementById('caravan-width').value);
            const roofType = this.value;
            ccalc_updatePrimerProduct(roofType); // Update primer product
            ccalc_displayProducts(length, width, roofType);
        });

        // Event listener for Calculate button
        document.getElementById('caravan-calculate-button').addEventListener('click', function () {
            const length = parseFloat(document.getElementById('caravan-length').value);
            const width = parseFloat(document.getElementById('caravan-width').value);
            const roofType = document.getElementById('caravan-roof-type').value;
            ccalc_updatePrimerProduct(roofType);
            ccalc_displayProducts(length, width, roofType);
        });


        // Event listeners for input fields to enforce max values
        document.getElementById('caravan-length').addEventListener('input', function () {
            this.value = ccalc_enforceMaxValue(this.value, 20);
        });

        document.getElementById('caravan-width').addEventListener('input', function () {
            this.value = ccalc_enforceMaxValue(this.value, 3);
        });

        // Function to enforce maximum values
        function ccalc_enforceMaxValue(value, max, elementId) {
            value = parseFloat(value);
            if (isNaN(value) || value < 0) {
                value = 0;
            }
            if (value > max) {
                value = max;
                if (elementId) {
                    document.getElementById(elementId).value = max;
                }
            }
            return value;
        }

        // Initialize the correct primer product on page load
            window.onload = function () {
                const length = parseFloat(document.getElementById('caravan-length').value);
                const width = parseFloat(document.getElementById('caravan-width').value);
                const roofType = document.getElementById('caravan-roof-type').value;
                ccalc_updatePrimerProduct(roofType);
                ccalc_displayProducts(length, width, roofType);
            };

        // Function to display products
        function ccalc_displayProducts(length = 6, width = 2.5, roofType = 'painted') {
            const productList = document.getElementById('caravan-product-list');
            let totalPrice = 0;

            // Reset product list to prevent duplication
            productList.innerHTML = '';

            const area = length * width;

            // Update the total area display
            document.getElementById('caravan-total-area').innerText = `Area: ${area.toFixed(2)} m²`;

            globalProductSelections = []; // Reset global selections

            products.forEach((product) => {
                if (!product.name || !product.image) return;

                // Proceed with creating and appending product elements
                const productContainer = document.createElement('div');
                productContainer.classList.add('caravan-product-container');

                const productImageContainer = document.createElement('div');
                productImageContainer.classList.add('caravan-product-image-container');
                const productImage = document.createElement('img');
                productImage.src = product.image;
                const productCheckbox = document.createElement('input');
                productCheckbox.type = 'checkbox';
                productCheckbox.checked = true;

                // Checkbox change function
                productCheckbox.addEventListener('change', function () {
                    const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);

                    // BONUS product check/uncheck logic
                    if (product.name === 'BONUS') {
                        if (this.checked) {
                            if (globalProductSelections.length === 0 || globalProductSelections.every(p => p.variantId === product.variants[0].variantId)) {
                                ccalc_showCustomAlert('You must select at least one other product before adding the BONUS product.');
                                this.checked = false;
                                return;
                            }
                            ccalc_addProductToSelections(product, length, width, roofType);
                        } else {
                            ccalc_removeProductFromSelections(product);
                        }
                    } else {
                        if (this.checked) {
                            totalPrice += priceForProduct;
                            ccalc_addProductToSelections(product, length, width, roofType);
                        } else {
                            totalPrice -= priceForProduct;
                            ccalc_removeProductFromSelections(product);
                        }
                        ccalc_updateTotalPrice(totalPrice);
                    }
                });

                productImageContainer.appendChild(productCheckbox);
                productImageContainer.appendChild(productImage);

                // Product info text function
                const productDetails = document.createElement('div');
                productDetails.classList.add('caravan-product-details');

                // Set the HTML content for product details
                productDetails.innerHTML = `
                    <div class="caravan-product-name">${product.name}</div>
                    <div class="caravan-info-link">Why do I need it?</div>
                    <div class="caravan-info-popup">${product.infoText}</div>
                `;

                // Attach the event listener to the "Why do I need it?" link
                const infoLink = productDetails.querySelector('.caravan-info-link');
                infoLink.addEventListener('click', function () {
                    ccalc_showInfoPopup(this, product.infoText);
                });

                const productQuantity = document.createElement('div');
                productQuantity.classList.add('caravan-product-quantity');
                const bucketSizes = ccalc_calculateBucketSizes(product, length, width, roofType);
                productQuantity.innerHTML = bucketSizes.map(size => `<span class="caravan-quantity-item">${size}</span>`).join('');

                const priceForProduct = ccalc_calculateProductPrice(product, length, width, roofType);

                const productPrice = document.createElement('div');
                productPrice.classList.add('caravan-product-price');
                productPrice.innerHTML = `$${priceForProduct.toFixed(2)}`;

                totalPrice += priceForProduct;

                productContainer.appendChild(productImageContainer);
                productContainer.appendChild(productDetails);
                productContainer.appendChild(productQuantity);
                productContainer.appendChild(productPrice);
                productList.appendChild(productContainer);

                // Add product to global selections
                ccalc_addProductToSelections(product, length, width, roofType);
            });

            ccalc_updateTotalPrice(totalPrice);
        }

        function ccalc_calculateProductPrice(product, length, width, roofType) {
            const area = length * width;

            if (product.name === 'Geo Textile') {
                const variant = product.variants.find(v => area <= v.areaLimit);
                return variant.price;
            }

            if (product.name === 'BONUS') {
                return 0; // BONUS product has a price of $0 but should still be added
            }

            if (product.coveragePerLitre && product.buckets) {
                let requiredArea = area;
                if (product.name === 'Waterproof Sealant') {
                    requiredArea = area * 0.2; // Only 20% of the area needs to be covered
                }

                const requiredVolume = requiredArea / product.coveragePerLitre;
                const bestCombination = ccalc_findBestBucketCombination(requiredVolume, product.buckets);

                const adjustedCombination = ccalc_adjustBucketCounts(bestCombination, product.buckets, product);

                return adjustedCombination.totalCost;
            }

            return 0;
        }

        function ccalc_calculateBucketSizes(product, length, width, roofType) {
            const area = length * width;
            let buckets = [];

            if (product.name === 'Geo Textile') {
                const variant = product.variants.find(v => area <= v.areaLimit);
                buckets.push(`1 x ${variant.name}`);
            } else if (product.name === 'BONUS') {
                const variant = product.variants.find(v => v.variantId === '40918670606469');
                if (variant) {
                    buckets.push(`1 x ${variant.name}`);
                }
            } else if (product.coveragePerLitre && product.buckets) {
                let requiredArea = area;
                if (product.name === 'Waterproof Sealant') {
                    requiredArea = area * 0.2; // Only 20% of the area needs to be covered
                }
                const requiredVolume = requiredArea / product.coveragePerLitre;
                const bestCombination = ccalc_findBestBucketCombination(requiredVolume, product.buckets);
                const adjustedCombination = ccalc_adjustBucketCounts(bestCombination, product.buckets, product);

                adjustedCombination.buckets.forEach(bucket => {
                    if (bucket.count > 0) {
                        buckets.push(`${bucket.count} x ${bucket.size}L Bucket`);
                    }
                });
            }

            return buckets;
        }

        function ccalc_findBestBucketCombination(requiredVolume, buckets) {
            let minTotalCost = Infinity;
            let minWaste = Infinity;
            let bestCombination = null;

            const maxCounts = buckets.map(bucket => Math.ceil(requiredVolume / bucket.size) + 1);
            const countsArray = buckets.map((bucket, index) => {
                return [...Array(maxCounts[index] + 1).keys()];
            });

            const combinations = ccalc_cartesianProduct(...countsArray);

            combinations.forEach(counts => {
                let totalVolume = 0;
                let totalCost = 0;
                counts.forEach((count, index) => {
                    totalVolume += count * buckets[index].size;
                    totalCost += count * buckets[index].price;
                });

                if (totalVolume >= requiredVolume) {
                    const waste = totalVolume - requiredVolume;
                    if (totalCost < minTotalCost || (totalCost === minTotalCost && waste < minWaste)) {
                        minTotalCost = totalCost;
                        minWaste = waste;
                        bestCombination = {
                            buckets: counts.map((count, index) => ({
                                size: buckets[index].size,
                                count: count,
                                price: buckets[index].price
                            })),
                            totalVolume: totalVolume,
                            totalCost: totalCost,
                            waste: waste
                        };
                    }
                }
            });

            return bestCombination;
        }

        function ccalc_cartesianProduct(...arrays) {
            return arrays.reduce((acc, curr) => {
                const res = [];
                acc.forEach(a => {
                    curr.forEach(b => {
                        res.push(a.concat([b]));
                    });
                });
                return res;
            }, [[]]);
        }

        function ccalc_adjustBucketCounts(bestCombination, availableBuckets, product) {
            let bucketCounts = {};
            bestCombination.buckets.forEach(bucket => {
                bucketCounts[bucket.size] = bucket.count;
            });

            if (product.name === 'Sealer/Primer' || product.name === 'Etch Primer') {
                if ((bucketCounts[1] || 0) >= 3) {
                    bucketCounts[4] = (bucketCounts[4] || 0) + 1;
                    bucketCounts[1] = 0;
                }
                if ((bucketCounts[4] || 0) >= 3) {
                    bucketCounts[15] = (bucketCounts[15] || 0) + 1;
                    bucketCounts[4] = 0;
                }
            } else {
                if ((bucketCounts[1] || 0) >= 2) {
                    bucketCounts[4] = (bucketCounts[4] || 0) + 1;
                    bucketCounts[1] = 0;
                }
                if ((bucketCounts[4] || 0) >= 3) {
                    bucketCounts[15] = (bucketCounts[15] || 0) + 1;
                    bucketCounts[4] = 0;
                }
            }

            let adjustedBuckets = [];
            let totalCost = 0;

            for (let size in bucketCounts) {
                size = parseInt(size);
                let count = bucketCounts[size];
                if (count > 0) {
                    let bucketInfo = availableBuckets.find(b => b.size === size);
                    let price = bucketInfo.price;
                    adjustedBuckets.push({ size: size, count: count, price: price, variantId: bucketInfo.variantId });
                    totalCost += count * price;
                }
            }

            return {
                buckets: adjustedBuckets,
                totalCost: totalCost
            };
        }

        function ccalc_updateTotalPrice(totalPrice) {
            const discountRate = 0.10;
            const discountedPrice = totalPrice * (1 - discountRate);
            const totalSavings = totalPrice - discountedPrice;

            document.getElementById('caravan-total-price').innerText = `$${totalPrice.toFixed(2)}`;
            document.getElementById('caravan-discounted-price').innerText = `$${discountedPrice.toFixed(2)}`;
            document.getElementById('caravan-total-savings').innerText = `$${totalSavings.toFixed(2)}`;
        }

        function ccalc_addProductToSelections(product, length, width, roofType) {
            const area = length * width;

            if (product.name === 'Geo Textile') {
                const variant = product.variants.find(v => area <= v.areaLimit);
                globalProductSelections.push({
                    variantId: variant.variantId,
                    quantity: 1
                });
            } else if (product.name === 'BONUS') {
                if (globalProductSelections.length === 0 || globalProductSelections.every(p => p.variantId === product.variants[0].variantId)) {
                    ccalc_showCustomAlert('You must select at least one product before adding the BONUS product.');
                    this.checked = false;
                    return;
                }
                globalProductSelections.push({
                    variantId: product.variants[0].variantId,
                    quantity: 1
                });
            } else if (product.coveragePerLitre && product.buckets) {
                let requiredArea = area;
                if (product.name === 'Waterproof Sealant') {
                    requiredArea = area * 0.2;
                }
                const requiredVolume = requiredArea / product.coveragePerLitre;
                const bestCombination = ccalc_findBestBucketCombination(requiredVolume, product.buckets);
                const adjustedCombination = ccalc_adjustBucketCounts(bestCombination, product.buckets, product);

                adjustedCombination.buckets.forEach(bucket => {
                    globalProductSelections.push({
                        variantId: bucket.variantId,
                        quantity: bucket.count
                    });
                });
            }
        }

        function ccalc_removeProductFromSelections(product) {
            if (product.name === 'BONUS') {
                globalProductSelections = globalProductSelections.filter(item => item.variantId !== product.variants[0].variantId);
            } else if (product.coveragePerLitre && product.buckets) {
                const variantIds = product.buckets.map(bucket => bucket.variantId);
                globalProductSelections = globalProductSelections.filter(item => !variantIds.includes(item.variantId));
            } else if (product.name === 'Geo Textile') {
                globalProductSelections = globalProductSelections.filter(selection => !product.variants.some(variant => variant.variantId === selection.variantId));
            }

            const hasOnlyBonusProduct = globalProductSelections.length === 1 && globalProductSelections[0].variantId === '40918670606469';

            if (globalProductSelections.length === 0 || hasOnlyBonusProduct) {
                ccalc_showCustomAlert('Please select at least one product.');
                
                if (hasOnlyBonusProduct) {
                    globalProductSelections = [];
                }
            }
        }

        document.getElementById('caravan-buy-now-button').addEventListener('click', function () {
            if (globalProductSelections.length === 0) {
                ccalc_showCustomAlert('Please select at least one product.');
                return;
            }

            const cartItems = globalProductSelections.map(selection => `${selection.variantId}:${selection.quantity}`).join(',');

            const utmParameters = 'utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit';

            const discountCode = 'Caravan-KIT-10OFF-Offer';
            const discountParameter = `discount=${encodeURIComponent(discountCode)}`;

            const checkoutUrl = `https://www.liquidrubberdiy.com.au/cart/${cartItems}?storefront=true&${utmParameters}&${discountParameter}&note=Caravan_Kit_With_Brush_and_Roller&sca_ref=3419258.V3jzDInQbZ`;

            window.open(checkoutUrl, '_blank');
        });
    });
})();
