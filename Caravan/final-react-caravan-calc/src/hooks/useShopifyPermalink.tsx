import { useCallback } from 'react';
import { generateShopifyPermalink } from '../utils/generateShopifyPermalink';
import { SelectedProductVariant } from '../types/index';
import { CalculatedProduct } from '../types/index';

const useShopifyPermalink = (calculatedProducts: CalculatedProduct[]) => {
  const generatePermalink = useCallback(() => {
    const selectedProducts = calculatedProducts.filter((product) => product.isSelected);

    const cartItems: SelectedProductVariant[] = selectedProducts.flatMap((product) => {
      const bucketItems: SelectedProductVariant[] = [];
      const variantItems: SelectedProductVariant[] = [];

      // Add bucket items
      if (product.bucketsNeeded && product.bucketsNeeded.length > 0) {
        product.bucketsNeeded.forEach((bucket) => {
          bucketItems.push({
            productKey: product.productKey,
            variantId: bucket.variantId,
            quantity: bucket.count,
          });
        });
      }

      // Add variant items
      if (product.recommendedVariant && product.recommendedVariant.quantity > 0) {
        const recommendedVariant = product.recommendedVariant;
        if (recommendedVariant.variant && recommendedVariant.variant.variantId) {
          variantItems.push({
            productKey: product.productKey,
            variantId: recommendedVariant.variant.variantId,
            quantity: recommendedVariant.quantity,
          });
        }
      }

      // Return bucket items if available, else variant items
      return bucketItems.length > 0 ? bucketItems : variantItems;
    });

    // Generate the Shopify permalink
    return generateShopifyPermalink(cartItems, 'Caravan-KIT-10OFF-Offer');
  }, [calculatedProducts]);

  return { generatePermalink };
};

export default useShopifyPermalink;
