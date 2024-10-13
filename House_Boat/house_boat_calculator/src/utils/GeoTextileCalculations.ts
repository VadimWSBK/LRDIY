import { Product, ProductVariant } from '../types/index';

const VENT_COUNT = 4;
const EXTRA_COVERAGE_PER_FEATURE = 2;

export const calculateGeoTextileCoverage = (
  product: Product,
  length: number,
  width: number
) => {
  if (!product.variants || product.variants.length === 0) {
    console.error('Product variants are missing or empty for product:', product.name);
    return { variant: null, quantity: 0 };
  }

  // Calculate perimeter and extra coverage
  const perimeter = 2 * (length + width);
  const extraCoverage = VENT_COUNT * EXTRA_COVERAGE_PER_FEATURE;
  const totalCoverageLength = perimeter + extraCoverage;

  // Determine the appropriate variant
  let recommendedVariant: ProductVariant | null = null;
  let quantityNeeded = 0;

  if (totalCoverageLength <= 20) {
    recommendedVariant = product.variants.find((variant) => variant.variant === '100mm x 20m') || null;
    quantityNeeded = 1;
  } else if (totalCoverageLength <= 50) {
    recommendedVariant = product.variants.find((variant) => variant.variant === '100mm x 50m') || null;
    quantityNeeded = 1;
  } else {
    recommendedVariant = product.variants.find((variant) => variant.variant === '100mm x 100m') || null;
    quantityNeeded = Math.ceil(totalCoverageLength / 100);
  }

  return { variant: recommendedVariant, quantity: quantityNeeded };
};

export default calculateGeoTextileCoverage;
