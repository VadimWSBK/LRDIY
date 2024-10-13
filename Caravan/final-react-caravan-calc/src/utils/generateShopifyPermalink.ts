// utils/generateShopifyPermalink.ts
import { SelectedProductVariant } from '../types/index';

export const generateShopifyPermalink = (
  cartItems: SelectedProductVariant[],
  discountCode?: string
): string => {
  // Create the cart items string based on variantId and quantity
  const cartItemsString = cartItems
    .map((item) => `id=${item.variantId}&quantity=${item.quantity}`)
    .join('&');

  const discountParameter = discountCode
    ? `&discount=${encodeURIComponent(discountCode)}`
    : '';

  // Add the referral ID
  const referralId = `&sca_ref=3419258.V3jzDInQbZ`;

  // Redirect to cart instead of checkout
  const cartUrl = `https://www.liquidrubberdiy.com.au/cart/add?${cartItemsString}${discountParameter}${referralId}&utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit`;

  return cartUrl;
};