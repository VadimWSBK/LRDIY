// src/store/productDetailsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    products: {
        waterproofsealant: {
            name: 'Waterproof Sealant',
            image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d2066e697100ccddc6e54f.webp',
            coveragePerLitre: 0.8,
            buckets: [
                { size: 1, price: 49, variantId: '40021385117829' },
                { size: 4, price: 99, variantId: '40021385052293' },
                { size: 15, price: 299, variantId: '40021385019525' }
            ],
            infoText: 'Waterproof Sealant is essential for keeping your roof protected from water damage.',
        },
        geotextile: {
            name: 'Geo Textile',
            image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d206a057f60d1680e999ad.webp',
            variants: [
                { name: '100mm x 20m', price: 19.95, variantId: '40021432696965' },
                { name: '100mm x 50m', price: 31.95, variantId: '40161100103813' }
            ],
            infoText: 'Geo Textile reinforces the roof coating system and helps with waterproofing.',
        },
        thermalcoating: {
            name: 'Thermal Coating',
            image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d985c90720ed72.webp',
            coveragePerLitre: 2,
            buckets: [
                { size: 1, price: 39, variantId: '40083835977861' },
                { size: 4, price: 99, variantId: '40083835224197' },
                { size: 15, price: 299, variantId: '40083834503301' }
            ],
            infoText: 'Thermal Coating reflects UV rays and keeps your caravan cool.',
        },
        sealerprimer: {
            name: 'Sealer / Primer',
            image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d9850ff720ed71.webp',
            coveragePerLitre: 9,
            buckets: [
                { size: 1, price: 29, variantId: '40021404778629' },
                { size: 4, price: 39, variantId: '40021407498373' }
            ],
            infoText: 'Sealer/Primer is used to protect painted roof surfaces to improve adhesion.',
        },
        etchprimer: {
            name: 'Etch Primer',
            image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded766f982f5e25b033.webp',
            coveragePerLitre: 7,
            buckets: [
                { size: 1, price: 99, variantId: '40021404713093' },
                { size: 4, price: 109, variantId: '40021407432837'}
            ],
            infoText: 'Etch Primer is essential for raw metal surfaces to improve adhesion.',
        },
        bonusproduct: {
            name: 'BONUS',
            image: 'https://cdn.shopify.com/s/files/1/0556/0614/9253/files/Brush_and_Roller_Kit.png?v=1726414468',
            variants: [
                { name: 'Brush Kit', price: 0, variantId: '40918671163525'},
                { name: 'Brush+Roller', price: 0, variantId: '40918670606469' }
            ],
            infoText: 'Everything you need to apply the Products.',
        },
    }
};

const productDetailsSlice = createSlice({
    name: 'productDetails',
    initialState,
    reducers: {
        // Define reducers if you need to update product details
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    }
});

export const { setProducts } = productDetailsSlice.actions;

export const selectProducts = (state) => state.productDetails.products;

export default productDetailsSlice.reducer;
