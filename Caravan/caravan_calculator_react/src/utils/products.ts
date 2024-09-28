// products.ts or wherever you have your product data
import { Product } from '../types/index';

export const products: Record<string, Product> = {
    waterproofSealant: {
      name: 'Waterproof Sealant',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d2066e697100ccddc6e54f.webp',
      imageWidth: 150, // Set appropriate width
      imageHeight: 150, // Set appropriate height
      coveragePerLitre: 1,
      variants: [
        { size: 1, price: 49, variantId: '40021385117829' },
        { size: 4, price: 99, variantId: '40021385052293' },
        { size: 15, price: 299, variantId: '40021385019525' }
      ],
      infoText: 'Liquid Rubber Waterproof Sealant is essential for keeping your roof protected from water damage.',
    },
    thermalCoating: {
      name: 'Thermal Coating',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d985c90720ed72.webp',
      imageWidth: 150, // Set appropriate width
      imageHeight: 150, // Set appropriate height
      coveragePerLitre: 2,
      variants: [
        { size: 1, price: 39, variantId: '40083835977861' },
        { size: 4, price: 99, variantId: '40083835224197' },
        { size: 15, price: 269, variantId: '40083834503301' }
      ],
      infoText: 'Thermal Coating reflects UV rays, keeps the interior cool, and shields your roof from the elements.',
    },
    sealerPrimer: {
      name: 'Sealer / Primer',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d9850ff720ed71.webp',
      imageWidth: 150, // Set appropriate width
      imageHeight: 150, // Set appropriate height
      coveragePerLitre: 8,
      variants: [
        { size: 1, price: 29, variantId: '40021404778629' },
        { size: 4, price: 99, variantId: '40021407498373' }
      ],
      infoText: 'Sealer/Primer enhances adhesion on painted roofs, ensuring a strong bond for Thermal Coating.',
    },
    etchPrimer: {
      name: 'Etch Primer',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded766f982f5e25b033.webp',
      imageWidth: 150, // Set appropriate width
      imageHeight: 150, // Set appropriate height
      coveragePerLitre: 6,
      variants: [
        { size: 1, price: 39, variantId: '40021404713093' },
        { size: 4, price: 109, variantId: '40021407432837' }
      ],
      infoText: 'Etch Primer enhances adhesion on raw metal roofs and prevents rust, ensuring a strong bond for Thermal Coating.',
    },
    geoTextile: {
      name: 'Geo Textile',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d206a057f60d1680e999ad.webp',
      imageWidth: 150, // Set appropriate width
      imageHeight: 150, // Set appropriate height
      variants: [
        { variant: '100mm x 20m', price: 19.95, variantId: '40021432696965' },
        { variant: '100mm x 50m', price: 31.95, variantId: '40161100103813' }
      ],
      infoText: 'Geo Textile reinforces the roof coating system and helps with waterproofing.',
    },
    bonusProduct: {
      name: 'BONUS',
      image: 'https://cdn.shopify.com/s/files/1/0556/0614/9253/files/Brush_and_Roller_Kit.png?v=1726414468',
      imageWidth: 150, // Set appropriate width
      imageHeight: 150, // Set appropriate height
      variants: [
        { variant: 'Brush Kit', price: 0, variantId: '40918671163525' },
        { variant: 'Brush Kit + Roller', price: 0, variantId: '40918670606469' }
      ],
      infoText: 'Everything you need to apply the Products.',
    },
  };
  