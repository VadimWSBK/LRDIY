// useShopifyPermalink.ts
import { useCallback } from 'react';
import { generateShopifyPermalink } from '../utils/generateShopifyPermalink';
import { SelectedProductVariant, CalculatedProduct } from '../types/index';

const useShopifyPermalink = (calculatedProducts: CalculatedProduct[]) => {
  const generatePermalink = useCallback(() => {
    const selectedProducts = calculatedProducts.filter(
      (product) => product.isSelected
    );

    const cartItems: SelectedProductVariant[] = selectedProducts.flatMap(
      (product) => {
        const bucketItems: SelectedProductVariant[] = [];
        const variantItems: SelectedProductVariant[] = [];

        // Add bucket items if quantities are greater than zero
        if (
          product.bucketsNeeded &&
          product.bucketsNeeded.length > 0 &&
          product.bucketsNeeded.some((bucket) => bucket.count > 0)
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

        // Add variant items if quantity is greater than zero
        if (
          product.recommendedVariant?.variant?.variantId &&
          product.recommendedVariant.quantity > 0
        ) {
          variantItems.push({
            productKey: product.productKey,
            variantId: product.recommendedVariant.variant.variantId,
            quantity: product.recommendedVariant.quantity,
          });
        }

        // Return bucket items if available; otherwise, return variant items
        return bucketItems.length > 0 ? bucketItems : variantItems;
      }
    );

    // Exclude products with zero quantities
    const nonZeroCartItems = cartItems.filter((item) => item.quantity > 0);

    // Generate the Shopify permalink if there are items to add
    if (nonZeroCartItems.length === 0) {
      return ''; // Return an empty string or handle accordingly
    }

    return generateShopifyPermalink(
      nonZeroCartItems,
      'Caravan-KIT-10OFF-Offer'
    );
  }, [calculatedProducts]);

  return { generatePermalink };
};

export default useShopifyPermalink;
