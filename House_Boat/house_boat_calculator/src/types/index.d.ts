// Popup Properties
export interface PopupProps {
  id: string;
  infoText: string;
}

// Alert Popup Properties
export interface AlertPopupProps {
  id: string;
  infoText: string;
  isVisible: boolean;
  // Any other props your component needs
}

// Product and Product Variants
export interface ProductVariant {
  size?: number; // Optional for bucket products
  variant?: string; // For products like Geo Textile
  price: number; // Ensure price is always defined and not optional
  variantId: string; // Unique identifier for the variant
}

// Product Interface
export interface Product {
  productKey: string;
  name: string;
  image: string;
  coveragePerLitre?: number;
  variants: ProductVariant[]; // Variants should be an array of ProductVariant, not strings
  infoText?: string;
}

// Bucket Calculations
export interface BucketCount {
  size: number;
  count: number;
  variantId: string;
  variant?: string;
  price: number; // Ensure price is correctly included here
}

export interface BucketCombination {
  buckets: BucketCount[];
  totalVolume: number;
  waste: number; // Removed `totalCost` since we are not calculating costs anymore
}

export interface BucketsNeeded {
  variantId: string;
  quantity: number;
}

export interface BucketDetails {
  variantId: string;
  quantity: number;
  size: number;
}

export interface Bucket {
  size: number; // Required for bucket calculations
  variantId: string;
  price: number; // Make sure this is required
}

// Recommended Variant Interface
export interface RecommendedVariant {
  variant: ProductVariant | null; // The actual variant recommended
  quantity: number; // Quantity needed
}

// Product Calculation Result Interface
export interface ProductCalculationResult {
  bucketsNeeded: BucketCount[]; // Array of calculated buckets needed
  recommendedVariants: RecommendedVariant[]; // Array of recommended variants and their quantities
}

// Calculated Product Interface
export interface CalculatedProduct extends Product {
  bucketsNeeded: BucketCount[];
  recommendedVariants: RecommendedVariant[];
  isSelected: boolean;
  show: boolean;
}

// Products Type Collection
export type Products = Record<string, Product>;

// Selected Product Variant Interface
export interface SelectedProductVariant {
  productKey: string;
  variantId: string;
  quantity: number;
}

// Product Item Props Interface
export interface ProductItemProps {
  product: CalculatedProduct;
  onToggleSelection: (isChecked: boolean) => void;
}

// Product List Props Interface
export interface ProductListProps {
  products: CalculatedProduct[];
  onToggleSelection: (productKey: string, isChecked: boolean) => void;
}

export { CalculatedProduct };
