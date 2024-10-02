import { Product, ProductVariant, BucketCount, ProductCost } from '../types/index';
import { calculateBuckets } from '../utils/BucketCalculations';

// Define a unified result type
interface ProductCalculationResult extends ProductCost {
  bucketsNeeded: BucketCount[];
  recommendedVariant: {
    variant: ProductVariant | null;
    quantity: number;
  };
}

export const calculateProductWithCosts = (
  product: Product,
  totalArea: number,
  isSelected: boolean
): ProductCalculationResult => {
  // Safeguard: Ensure `product.variants` is an array
  if (!product.variants || product.variants.length === 0) {
    console.error('Product variants are missing or empty for product:', product.name);
    return {
      bucketsNeeded: [],
      recommendedVariant: { variant: null, quantity: 0 },
      bucketCost: 0,
      variantCost: 0,
    };
  }

  // Handle case when totalArea is 0
  if (totalArea === 0) {
    return {
      bucketsNeeded: [],
      recommendedVariant: { variant: null, quantity: 0 },
      bucketCost: 0,
      variantCost: 0,
    };
  }

  // Calculate required volume for products with coverage per litre
  const requiredVolume = totalArea > 0 && product.coveragePerLitre
    ? totalArea / product.coveragePerLitre
    : 0;

  // Calculate buckets needed
  let bucketsNeeded: BucketCount[] = [];
  let recommendedVariant: ProductVariant | null = null;
  let quantityNeeded = 0;

  // Check if the product is a "bucket" type or a "variant" type
  const isBucketProduct = product.coveragePerLitre !== undefined; // Products with coverage are treated as bucket products
  const isVariantProduct = product.name === 'Geo Textile' || product.name === 'BONUS';

  if (isBucketProduct) {
    // Calculate buckets for bucket-type products
    bucketsNeeded = requiredVolume > 0 ? calculateBuckets(product, requiredVolume) : [];
  } else if (product.name === 'BONUS') {
    // Handle the BONUS product logic based on totalArea
    if (totalArea > 3) {
      recommendedVariant = product.variants.find(
        (variant) => variant.variant === 'Brush Kit + Roller'
      ) || null;
    } else if (totalArea > 0 && totalArea <= 3) {
      recommendedVariant = product.variants.find(
        (variant) => variant.variant === 'Brush Kit'
      ) || null;
    }
    quantityNeeded = 1; // Only one bonus item is needed
  } else if (product.name === 'Geo Textile') {
    // Simplified logic for Geo Textile
    if (totalArea < 12) {
      recommendedVariant = product.variants.find(
        (variant) => variant.variant === '100mm x 20m'
      ) || null;
      quantityNeeded = 1; // Single quantity for under 12sqm
    } else {
      recommendedVariant = product.variants.find(
        (variant) => variant.variant === '100mm x 50m'
      ) || null;
      quantityNeeded = 1; // Single quantity for 12sqm or more
    }
  } else {
    // Safeguard: Ensure we are accessing a valid variant
    recommendedVariant = product.variants[0] || null;
  }

  // Calculate bucket cost and variant cost (if selected)
  let bucketCost = 0;
  let variantCost = 0;

  if (isSelected) {
    // Calculate bucket cost for bucket-type products
    if (isBucketProduct && bucketsNeeded.length > 0) {
      bucketCost = bucketsNeeded.reduce((total, bucket) => total + bucket.count * bucket.price, 0);
    }

    // Calculate variant cost for variant-type products
    if (isVariantProduct && recommendedVariant) {
      variantCost = recommendedVariant.price * quantityNeeded;
    }
  }

  return {
    bucketsNeeded,
    recommendedVariant: { variant: recommendedVariant, quantity: quantityNeeded },
    bucketCost,
    variantCost,
  };
};

export default calculateProductWithCosts;
