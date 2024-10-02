// utils/generateShopifyPermalink.ts
import { SelectedProductVariant } from '../types/index';

export const generateShopifyPermalink = (
  cartItems: SelectedProductVariant[],
  discountCode?: string
): string => {
  // Create the cart items string based on variantId and quantity
  const cartItemsString = cartItems
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  const discountParameter = discountCode
    ? `discount=${encodeURIComponent(discountCode)}`
    : '';

  const checkoutUrl = `https://www.liquidrubberdiy.com.au/cart/${cartItemsString}?${discountParameter}&utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit`;

  return checkoutUrl;
};
