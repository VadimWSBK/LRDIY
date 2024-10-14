// calculateProductAmount.ts

import { Product, ProductVariant, BucketCount } from '../types/index';
import { calculateBuckets } from '../utils/BucketCalculations';
import calculateGeoTextileCoverage from '../utils/GeoTextileCalculations';

// Define a unified result type without costs
interface ProductCalculationResult {
  bucketsNeeded: BucketCount[];
  recommendedVariants: {
    variant: ProductVariant | null;
    quantity: number;
  }[];
}

export const calculateProductAmount = (
  product: Product,
  totalArea: number,
  length: number = 0,
  width: number = 0
): ProductCalculationResult => {
  // Safeguard: Ensure `product.variants` is an array
  if (!product.variants || product.variants.length === 0) {
    console.error('Product variants are missing or empty for product:', product.name);
    return {
      bucketsNeeded: [],
      recommendedVariants: [],
    };
  }

  // Handle case when totalArea is 0
  if (totalArea === 0) {
    return {
      bucketsNeeded: [],
      recommendedVariants: [],
    };
  }

  // Calculate required volume for products with coverage per litre
  const requiredVolume = totalArea > 0 && product.coveragePerLitre
    ? totalArea / product.coveragePerLitre
    : 0;

  // Calculate buckets needed
  let bucketsNeeded: BucketCount[] = [];
  let recommendedVariants: { variant: ProductVariant | null; quantity: number }[] = [];

  // Check if the product is a "bucket" type or a "variant" type
  const isBucketProduct = product.coveragePerLitre !== undefined; // Products with coverage are treated as bucket products
  const isVariantProduct = product.name === 'Geo Textile' || product.name === 'BONUS';

  if (isBucketProduct) {
    // Calculate buckets for bucket-type products
    bucketsNeeded = requiredVolume > 0 ? calculateBuckets(product, requiredVolume) : [];
  } else if (product.name === 'BONUS') {
    // Handle the BONUS product logic based on totalArea
    if (totalArea > 3) {
      recommendedVariants.push({
        variant: product.variants.find(
          (variant) => variant.variant === 'Brush Kit + Roller'
        ) || null,
        quantity: 1,
      });
    } else if (totalArea > 0 && totalArea <= 3) {
      recommendedVariants.push({
        variant: product.variants.find(
          (variant) => variant.variant === 'Brush Kit'
        ) || null,
        quantity: 1,
      });
    }
  } else if (product.name === 'Geo Textile') {
    const geoTextileResult = calculateGeoTextileCoverage(product, length, width);
    recommendedVariants = geoTextileResult.variants;
  } else {
    // Safeguard: Ensure we are accessing a valid variant
    recommendedVariants.push({
      variant: product.variants[0] || null,
      quantity: 1,
    });
  }

  return {
    bucketsNeeded,
    recommendedVariants,
  };
};

export default calculateProductAmount;
