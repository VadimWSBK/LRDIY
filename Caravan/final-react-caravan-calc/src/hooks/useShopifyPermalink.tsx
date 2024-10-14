import { useCallback } from 'react';
import { generateShopifyPermalink } from '../utils/generateShopifyPermalink';
import { SelectedProductVariant, CalculatedProduct } from '../types/index';

const useShopifyPermalink = (
  calculatedProducts: CalculatedProduct[],
  roofType: string,
  totalArea: number // Add totalArea here
) => {
  const generatePermalink = useCallback(() => {
    // Filter selected products based on roof type
    const selectedProducts = calculatedProducts.filter((product) => {
      if (!product.isSelected) return false;

      // Exclude products based on roofType
      if (roofType === 'painted') {
        // For painted roofs, exclude 'etchPrimer'
        if (product.productKey === 'etchPrimer') return false;
      } else if (roofType === 'raw metal') {
        // For raw metal roofs, exclude 'sealerPrimer'
        if (product.productKey === 'sealerPrimer') return false;
      }
      // Include the product otherwise
      return true;
    });

    const cartItems: SelectedProductVariant[] = selectedProducts.flatMap(
      (product) => {
        const bucketItems: SelectedProductVariant[] = [];
        const variantItems: SelectedProductVariant[] = [];

        // Add bucket items if quantities are greater than zero
        if (
          product.bucketsNeeded &&
          product.bucketsNeeded.length > 0
        ) {
          product.bucketsNeeded.forEach((bucket) => {
            if (bucket.count > 0) {
              bucketItems.push({
                productKey: product.productKey,
                variantId: bucket.variantId,
                quantity: bucket.count,
              });
            }
          });
        }

        // Add variant items if quantities are greater than zero
        if (
          Array.isArray(product.recommendedVariants) &&
          product.recommendedVariants.length > 0
        ) {
          product.recommendedVariants.forEach((variant) => {
            if (variant.variant?.variantId && variant.quantity > 0) {
              variantItems.push({
                productKey: product.productKey,
                variantId: variant.variant.variantId,
                quantity: variant.quantity,
              });
            }
          });
        }

        // Return combined bucket and variant items
        return [...bucketItems, ...variantItems];
      }
    );

    // Exclude products with zero quantities
    const nonZeroCartItems = cartItems.filter((item) => item.quantity > 0);

    // Generate the Shopify permalink if there are items to add
    if (nonZeroCartItems.length === 0) {
      return ''; // Return an empty string or handle accordingly
    }

    // Create note with total area and roof type
    const note = `Total Area: ${totalArea.toFixed(
      2
    )} sqm, Roof Type: ${roofType}`;

    return generateShopifyPermalink(
      nonZeroCartItems,
      'Caravan-KIT-10OFF-Offer',
      note // Pass the note to the permalink generator
    );
  }, [calculatedProducts, roofType, totalArea]); // Include totalArea in dependencies

  return { generatePermalink };
};

export default useShopifyPermalink;
