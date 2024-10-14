// products.ts or wherever you have your product data
import { Product } from '../types/index';

export const products: Record<string, Product> = {
    waterproofSealant: {
      productKey: 'waterproofSealant',
      name: 'Waterproof Sealant',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d2066e697100ccddc6e54f.webp',
      coveragePerLitre: 1,
      variants: [
        { size: 1, price: 49, variantId: '40021385117829' },
        { size: 4, price: 99, variantId: '40021385052293' },
        { size: 15, price: 299, variantId: '40021385019525' }
      ],
      infoText: 'Liquid Rubber Waterproof Sealant is essential for keeping your roof protected from water damage.',
    },
    thermalCoating: {
      productKey: 'thermalCoating',
      name: 'Thermal Coating',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d985c90720ed72.webp',
      coveragePerLitre: 2,
      variants: [
        { size: 1, price: 39, variantId: '40083835977861' },
        { size: 4, price: 99, variantId: '40083835224197' },
        { size: 15, price: 269, variantId: '40083834503301' }
      ],
      infoText: 'Thermal Coating reflects UV rays, keeps the interior cool, and shields your roof from the elements.',
    },
    sealerPrimer: {
      productKey: 'sealerPrimer',
      name: 'Sealer / Primer',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded61d9850ff720ed71.webp',
      coveragePerLitre: 8,
      variants: [
        { size: 1, price: 29, variantId: '40021404778629' },
        { size: 4, price: 99, variantId: '40021404713093' },
        { size: 15, price: 249, variantId: '40021404647557' }
      ],
      infoText: 'Sealer/Primer enhances adhesion on painted roofs, ensuring a strong bond for Thermal Coating.',
    },
    etchPrimer: {
      productKey: 'etchPrimer',
      name: 'Etch Primer',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d57ded766f982f5e25b033.webp',
      coveragePerLitre: 6,
      variants: [
        { size: 1, price: 39, variantId: '40021407498373' },
        { size: 4, price: 109, variantId: '40021407432837' },
        { size: 15, price: 289, variantId: '40021407367301' }
      ],
      infoText: 'Etch Primer enhances adhesion on raw metal roofs and prevents rust, ensuring a strong bond for Thermal Coating.',
    },
    geoTextile: {
      productKey: 'geoTextile',
      name: 'Geo Textile',
      image: 'https://storage.googleapis.com/msgsndr/ewm9gNGbZG828XI4tybh/media/66d206a057f60d1680e999ad.webp',
      variants: [
        { variant: '100mm x 20m', price: 19.95, variantId: '40021432696965' },
        { variant: '100mm x 50m', price: 31.95, variantId: '40161100103813' },
        { variant: '100mm x 100m', price: 42.95, variantId: '40021432598661' }
      ],
      infoText: 'Geo Textile reinforces the roof coating system and helps with waterproofing.',
    },
    bonusProduct: {
      productKey: 'bonusProduct',
      name: 'BONUS',
      image: 'https://cdn.shopify.com/s/files/1/0556/0614/9253/files/Brush_and_Roller_Kit.png?v=1726414468',
      variants: [
        { variant: 'Brush Kit', price: 0, variantId: '40918671163525' },
        { variant: 'Brush Kit + Roller', price: 0, variantId: '40918670606469' }
      ],
      infoText: 'Everything you need to apply the Products.',
    },
  };
  