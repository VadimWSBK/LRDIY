// index.d.ts

// Zustand Store State Interface
export interface StoreState {
  popupVisibility: Record<string, boolean>;
  togglePopup: (id: string, isVisible: boolean) => void;
  bucketsNeeded: Record<string, BucketDetails>; // Store calculated bucket details for each product
  setBucketsNeeded: (payload: { productName: string; bucketDetails: BucketDetails }) => void; // Method to update bucket details
}

// Popup Properties
export interface PopupProps {
  id: string; // Ensure this is defined correctly
  infoText: string;
}

// Alert Popup Properties
export interface AlertPopupProps {
  id: string; // Ensure id is defined here
  infoText: string; // Ensure infoText is defined here
  // Any other props your component needs
}

// Product and Product Variants
export interface ProductVariant {
  size?: number; // Optional for bucket products
  variant?: string; // Optional for non-bucket products
  price: number;
  variantId: string; // Variant ID must be available for the permalink
}

export interface Bucket {
  size: number; // Required for bucket calculations
  price: number;
  variantId: string;
}

export interface Product {
  name: string;
  image: string;
  coveragePerLitre?: number; // Optional, not all products have this
  variants: ProductVariant[];
  infoText: string;
}

// Bucket Calculations
export interface BucketCount {
  size: number; // Size of the bucket
  count: number; // Quantity of this bucket type
  price: number; // Price per bucket
  variantId: string; // Variant ID to map the product in Shopify
  variant?: string; // Variant name
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
  variantId: string; // Variant ID for the bucket
  quantity: number; // Number of buckets
  size: number; // Size of each bucket in litres
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
  totalArea: number;
}
