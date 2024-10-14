import { SelectedProductVariant } from '../types/index';

export const generateShopifyPermalink = (
  cartItems: SelectedProductVariant[],
  discountCode?: string,
  note?: string
): string => {
  // Create the cart items string based on variantId and quantity
  const cartItemsString = cartItems
    .map((item) => `${item.variantId}:${item.quantity}`)
    .join(',');

  const discountParameter = discountCode
    ? `&discount=${encodeURIComponent(discountCode)}`
    : '';

  // Add the referral ID
  const referralId = `&sca_ref=3419258.V3jzDInQbZ`;

  // Add the hard-coded project name to the note
  const hardCodedNote = 'Project: Caravan';
  const fullNote = note ? `${hardCodedNote} - ${note}` : hardCodedNote;

  // Add the note parameter if it exists
  const noteParameter = `&note=${encodeURIComponent(fullNote)}`;

  // Redirect to storefront instead of checkout
  const cartUrl = `https://www.liquidrubberdiy.com.au/cart/${cartItemsString}?${discountParameter}${referralId}${noteParameter}&utm_source=calculator&utm_medium=web&utm_campaign=caravan_kit&storefront=true`;

  return cartUrl;
};
