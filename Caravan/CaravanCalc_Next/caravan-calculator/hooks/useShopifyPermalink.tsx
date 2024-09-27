// hooks/useShopifyPermalink.ts
import { useCallback } from 'react';
import useStore from './useStore'; // Zustand store
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
        if (recommendedVariants[productName]?.quantity > 0) {
          variantItems.push({
            productName,
            variantId: recommendedVariants[productName].variant.variantId,
            quantity: recommendedVariants[productName].quantity, // Use calculated quantity
          });
        }
      }

      // Log each bucket and variant item for debugging
      console.log(`Bucket Items for ${productName}:`, bucketItems);
      console.log(`Variant Items for ${productName}:`, variantItems);

      // Return bucket items if available, otherwise return variant items
      return bucketItems.length > 0 ? bucketItems : variantItems;
    });

    // Log the final cart items to be sent in the permalink
    console.log('Final Cart Items for Permalink:', cartItems);

    // Generate Shopify permalink with cart items, discount code, and UTM parameters
    return generateShopifyPermalink(
      cartItems,
      'Caravan-KIT-10OFF-Offer', // Discount code
      'utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit' // UTM parameters
    );
  }, [selectedProducts, bucketsNeeded, recommendedVariants]);

  return { generatePermalink };
};

export default useShopifyPermalink;
