// hooks/useBuyNow.ts
import { useCallback } from 'react';
import useStore from '../store/useStore'; // Zustand store
import useShopifyPermalink from './useShopifyPermalink';
import useAlertPopup from './useAlertPopup'; // Assuming you already have this for showing popups

const useBuyNow = () => {
  const { selectedProducts } = useStore((state) => ({
    selectedProducts: state.selectedProducts,
  }));

  const { generatePermalink } = useShopifyPermalink(); // Use existing hook to generate permalink
  const { show } = useAlertPopup(); // Use existing hook to show alerts

  // Handle the Buy Now button click
  const handleBuyNow = useCallback(() => {
    // Check if no product is selected
    if (selectedProducts.length === 0) {
      show('Please select at least one Product.');
      return;
    }

    // Check if only BONUS product is selected
    if (selectedProducts.length === 1 && selectedProducts.includes('BONUS')) {
      show('Please select at least one other product.');
      return;
    }

    // Generate Shopify permalink and open in new tab
    const checkoutUrl = generatePermalink();
    window.open(checkoutUrl, '_blank');
  }, [selectedProducts, generatePermalink, show]);

  return { handleBuyNow };
};

export default useBuyNow;
