// index.d.ts

// Zustand Store State Interface
export interface StoreState {
  popupVisibility: Record<string, boolean>;
  togglePopup: (id: string, isVisible: boolean) => void;
  bucketsNeeded: Record<string, BucketDetails>; // Store calculated bucket details for each product
  setBucketsNeeded: (productName: string, bucketDetails: BucketDetails) => void; // Corrected method signature
  // ... other state properties and methods ...
}

// Popup Properties
export interface PopupProps {
  id: string;
  infoText: string;
}

// Alert Popup Properties
export interface AlertPopupProps {
  id: string;
  infoText: string;
  // Any other props your component needs
}

// Product and Product Variants
export interface ProductVariant {
  size?: number; // Optional for bucket products
  variant?: string; // Optional for non-bucket products
  price: number;
  variantId: string;
}

export interface Variant {
  size?: number;  // For most products
  variant?: string; // For Geo Textile and Bonus Product
  price: number;
  variantId: string;
}

export interface Product {
  name: string;
  image: string;
  coveragePerLitre?: number;
  variants: Variant[];
  infoText?: string;
}

export interface ProductCost {
  bucketCost: number;
  variantCost: number;
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
  productName: string;
  variantId: string;
  quantity: number;
}

// Product Item Properties
export interface ProductItemProps {
  product: Product;
}

export {};
