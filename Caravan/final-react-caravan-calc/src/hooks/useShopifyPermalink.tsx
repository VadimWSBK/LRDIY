import { useCallback } from 'react';
import useStore from '../store/useStore'; // Zustand store
import { generateShopifyPermalink } from '../utils/generateShopifyPermalink';
import { SelectedProductVariant, BucketCount } from '../types/index';

const useShopifyPermalink = () => {
  // Access the store to get selected products and their details
  const { selectedProducts, bucketsNeeded, recommendedVariants } = useStore((state) => ({
    selectedProducts: state.selectedProducts,
    bucketsNeeded: state.bucketsNeeded, // Access bucketsNeeded from the store
    recommendedVariants: state.recommendedVariants, // Access recommendedVariants from the store
  }));

  // Generate permalink only for selected products
  const generatePermalink = useCallback(() => {
    // Iterate over selected products and generate cart items for each product
    const cartItems: SelectedProductVariant[] = selectedProducts.flatMap((productName) => {
      const bucketItems: SelectedProductVariant[] = [];
      const variantItems: SelectedProductVariant[] = [];

      // Check if there are bucket items for the product
      if (bucketsNeeded[productName]?.length > 0) {
        bucketsNeeded[productName].forEach((bucket: BucketCount) => {
          bucketItems.push({
            productName,
            variantId: bucket.variantId, // Use variantId from the bucket
            quantity: bucket.count, // Use count as quantity for buckets
          });
        });
      }

  // Check if there are variant items for the product (only add if no buckets are present)
  if (!bucketsNeeded[productName] || bucketsNeeded[productName].length === 0) {
    const recommendedVariant = recommendedVariants[productName];

    // Ensure recommendedVariant is not null and has a valid variant with a variantId
    if (recommendedVariant?.quantity > 0 && recommendedVariant.variant && recommendedVariant.variant.variantId) {
      variantItems.push({
        productName,
        variantId: recommendedVariant.variant.variantId, // Access variantId only if the variant exists
        quantity: recommendedVariant.quantity, // Use calculated quantity
      });
    }
  }

      // Return bucket items if available, otherwise return variant items
      return bucketItems.length > 0 ? bucketItems : variantItems;
    });
    // Generate Shopify permalink with cart items, discount code, and UTM parameters
    return generateShopifyPermalink(
      cartItems,
      'Caravan-KIT-10OFF-Offer', // Discount code
    );
  }, [selectedProducts, bucketsNeeded, recommendedVariants]);

  return { generatePermalink };
};

export default useShopifyPermalink;
