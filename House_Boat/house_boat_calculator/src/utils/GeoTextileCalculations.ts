import { Product, ProductVariant } from '../types/index';

const VENT_COUNT = 4;
const EXTRA_COVERAGE_PER_FEATURE = 2;
const ADDITIONAL_COVERAGE_PERCENTAGE = 0.1; // Extra 15% coverage for safety

interface DPEntry {
  totalCost: number;
  counts: number[];
}

interface BestResult {
  totalCoverage: number;
  totalCost: number;
  counts: number[];
  waste: number;
}

// Utility function to extract the length from the variant string
function extractVariantLength(variant: ProductVariant): number | null {
  if (!variant.variant) return null;

  const match = variant.variant.match(/x\s*(\d+(?:\.\d+)?)m/);
  if (match) {
    const length = parseFloat(match[1]);
    if (!isNaN(length)) {
      return length;
    }
  }
  return null;
}

export const calculateGeoTextileCoverage = (
  product: Product,
  length: number,
  width: number,
  seamsAlongLength: number,
  seamsAlongWidth: number
): {
  variants: { variant: ProductVariant; quantity: number }[];
  totalCoverage: number;
} => {
  if (!product.variants || product.variants.length === 0) {
    console.error('Product variants are missing or empty for product:', product.name);
    return { variants: [], totalCoverage: 0 };
  }

  // Calculate the required coverage based on the user's specifications
  const lengthCoverage = 4 * length; // 5x length
  const widthCoverage = 5 * width;   // 6x width

  // Calculate seam coverage
  const seamCoverageLength = seamsAlongLength * length;
  const seamCoverageWidth = seamsAlongWidth * width;

  // Calculate extra coverage for vents and other features
  const extraCoverage = VENT_COUNT * EXTRA_COVERAGE_PER_FEATURE;

  // Sum up all coverage requirements
  let totalCoverageLength =
    lengthCoverage +
    widthCoverage +
    seamCoverageLength +
    seamCoverageWidth +
    extraCoverage;

  // Add additional coverage percentage for safety
  totalCoverageLength += totalCoverageLength * ADDITIONAL_COVERAGE_PERCENTAGE;

  // Process valid variants with extracted lengths
  const validVariants = product.variants
    .filter(
      (variant): variant is ProductVariant =>
        variant.variant !== undefined &&
        typeof variant.price === 'number' &&
        variant.price > 0
    )
    .map((variant) => {
      const length = extractVariantLength(variant);
      if (length !== null) {
        return { ...variant, length };
      } else {
        console.warn(`Invalid variant length in variant: ${variant.variant}`);
        return null;
      }
    })
    .filter(
      (variant): variant is ProductVariant & { length: number } => variant !== null
    );

  if (validVariants.length === 0) {
    console.warn(`No valid variants for ${product.name}`);
    return { variants: [], totalCoverage: totalCoverageLength };
  }

  // Sort product variants in descending order of their lengths
  const sortedVariants = validVariants.sort((a, b) => b.length - a.length);

  // Find the best combination of variants
  const bestCombination = findBestGeoTextileCombination(
    totalCoverageLength,
    sortedVariants
  );

  if (!bestCombination) {
    return { variants: [], totalCoverage: totalCoverageLength };
  }

  // Prepare structured variant data for each recommended variant
  const recommendedVariants = bestCombination.counts
    .map((count, index) => ({
      variant: sortedVariants[index],
      quantity: count,
    }))
    .filter((variant) => variant.quantity > 0);

  return { variants: recommendedVariants, totalCoverage: totalCoverageLength };
};

export const findBestGeoTextileCombination = (
  requiredCoverage: number,
  variants: Array<ProductVariant & { length: number }>
): BestResult | null => {
  if (requiredCoverage <= 0 || isNaN(requiredCoverage)) {
    console.warn(`Invalid required coverage: ${requiredCoverage}`);
    return null;
  }

  const scalingFactor = 100; // Scaling to handle decimal values (e.g., meters to centimeters)
  const scaledRequiredCoverage = Math.ceil(requiredCoverage * scalingFactor);

  // Scale variant lengths
  const scaledVariants = variants.map((variant) => ({
    ...variant,
    scaledLength: Math.round(variant.length * scalingFactor),
  }));

  const maxScaledVariantLength = Math.max(
    ...scaledVariants.map((v) => v.scaledLength)
  );

  const maxScaledCoverage = scaledRequiredCoverage + maxScaledVariantLength;

  // Initialize the dynamic programming array
  const dp: Array<DPEntry | null> = new Array(maxScaledCoverage + 1).fill(null);
  dp[0] = { totalCost: 0, counts: Array(scaledVariants.length).fill(0) };

  for (let coverage = 0; coverage <= scaledRequiredCoverage; coverage++) {
    const currentEntry = dp[coverage];
    if (currentEntry === null) continue;

    for (let i = 0; i < scaledVariants.length; i++) {
      const variant = scaledVariants[i];
      const variantLength = variant.scaledLength;
      const nextCoverage = coverage + variantLength;

      if (nextCoverage > maxScaledCoverage) continue;

      const nextCost = currentEntry.totalCost + variant.price;
      const existingEntry = dp[nextCoverage];

      if (
        !existingEntry ||
        nextCost < existingEntry.totalCost ||
        (nextCost === existingEntry.totalCost &&
          currentEntry.counts.reduce((a, b) => a + b, 0) + 1 <
            existingEntry.counts.reduce((a, b) => a + b, 0))
      ) {
        const nextCounts = currentEntry.counts.slice();
        nextCounts[i] += 1;
        dp[nextCoverage] = {
          totalCost: nextCost,
          counts: nextCounts,
        };
      }
    }
  }

  // Find the best result with minimal waste
  let bestResult: BestResult | null = null;
  for (
    let coverage = scaledRequiredCoverage;
    coverage <= maxScaledCoverage;
    coverage++
  ) {
    const entry = dp[coverage];
    if (entry) {
      const waste = coverage - scaledRequiredCoverage;
      if (
        !bestResult ||
        entry.totalCost < bestResult.totalCost ||
        (entry.totalCost === bestResult.totalCost && waste < bestResult.waste)
      ) {
        bestResult = {
          totalCoverage: coverage / scalingFactor,
          totalCost: entry.totalCost,
          counts: entry.counts,
          waste: waste / scalingFactor,
        };
      }
      // Early exit if exact match is found
      if (waste === 0) {
        break;
      }
    }
  }

  if (!bestResult) {
    console.warn('No suitable combination found for the required coverage');
    return null;
  }

  return bestResult;
};

export default calculateGeoTextileCoverage;
