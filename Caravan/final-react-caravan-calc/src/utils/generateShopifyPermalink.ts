// utils/generateShopifyPermalink.ts
import { SelectedProductVariant } from '../types/index';


export const generateShopifyPermalink = (
  cartItems: SelectedProductVariant[], // Array of variant ID and quantity pairs
  discountCode?: string,

): string => {
  // Create the cart items string based on variantId and quantity
  const cartItemsString = cartItems
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  const discountParameter = discountCode
    ? `discount=${encodeURIComponent(discountCode)}`
    : '';


  const checkoutUrl = `https://www.liquidrubberdiy.com.au/cart/${cartItemsString}?&utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit&${discountParameter}`;

  return checkoutUrl;
};
