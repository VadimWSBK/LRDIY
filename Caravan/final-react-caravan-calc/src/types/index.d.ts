
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
  price: number;    // Ensure price is a number, not a string
  variantId: string; // Unique identifier for the variant
}


export interface Variant {
  size?: number;  // For most products
  variant?: string; // For Geo Textile and Bonus Product
  price: number;
  variantId: string;
}

export interface Product {
  productKey: string;
  name: string;
  image: string;
  coveragePerLitre?: number;
  variants: ProductVariant[]; // Variants should be an array of ProductVariant, not strings
  infoText?: string;
}

export interface ProductCost {
  bucketCost: number; // Calculated cost of the buckets for the product
  variantCost: number; // Calculated cost of the variant for the product
}


// Bucket Calculations
export interface BucketCount {
  size: number;
  count: number;
  price: number;
  variantId: string;
  variant?: string;
}

export interface BucketCombination {
  buckets: BucketCount[];
  totalVolume: number;
  totalCost: number;
  waste: number;
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
  price: number;
  variantId: string;
}

// Add the missing RecommendedVariant interface
export interface RecommendedVariant {
  variant: ProductVariant | null;
  quantity: number;
}

// Products Type Collection
export type Products = Record<string, Product>;

// Selected Product Variant Interface
export interface SelectedProductVariant {
  productKey: string;
  variantId: string;
  quantity: number;
}

export interface ProductItemProps {
  product: CalculatedProduct;
  onToggleSelection: (isChecked: boolean) => void;
}

// Corrected ProductListProps interface
export interface ProductListProps {
  products: CalculatedProduct[];
  onToggleSelection: (productKey: string, isChecked: boolean) => void;
}


export interface ProductCalculationResult {
  bucketsNeeded: BucketCount[]; // Array of calculated buckets needed
  recommendedVariant: RecommendedVariant | null; // Recommended variant and quantity
  bucketCost: number; // Total cost of the buckets
  variantCost: number; // Total cost of the recommended variant
}

export interface RecommendedVariant {
  variant: ProductVariant | null; // The actual variant recommended
  quantity: number; // Quantity needed
}
interface CalculatedProduct {
  productKey: string;
  name: string;
  image: string;
  // ... other product properties
  bucketsNeeded: BucketCount[];
  recommendedVariant: {
    variant: ProductVariant | null;
    quantity: number;
  };
  bucketCost: number;
  variantCost: number;
  isSelected: boolean;
  show: boolean;
  infoText?: string;
}

export {CalculatedProduct};
