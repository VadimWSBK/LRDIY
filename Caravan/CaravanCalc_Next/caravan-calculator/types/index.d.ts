// types/index.d.ts

// Interface for a single product variant, which may or may not have a size.
export interface ProductVariant {
    size?: number; // Optional for bucket products
    variant?: string; // Optional for non-bucket products
    price: number;
    variantId: string; // Variant ID must be available for the permalink
  }
  
  // Define a Bucket interface for products that have a defined size (used in bucket calculations).
  export interface Bucket {
    size: number; // Required for bucket calculations
    price: number;
    variantId: string;
  }
  
  // Interface for a product, which may include an array of variants and additional properties.
  export interface Product {
    name: string;
    image: string;
    infoText?: string;
    coveragePerLitre?: number;
    variants: ProductVariant[]; // List of product variants available
    bucketsNeeded?: BucketCount[]; // Optional bucket counts for product
    recommendedVariant?: ProductVariant | null; // Optional recommended variant details
  }
  
  // Interface for BucketCount with variantId and count
  export interface BucketCount {
    size: number; // Size of the bucket
    count: number; // Quantity of this bucket type
    price: number; // Price per bucket
    variantId: string; // Variant ID to map the product in Shopify
    variant?: string;// Variant name
  }
  
  // Type for a collection of products, with keys being product identifiers and values being Product objects.
  export type Products = Record<string, Product>;
  
  // Interface for selected product variant details, used in cart permalink generation.
  interface SelectedProductVariant {
    productName: string;
    variantId: string;
    quantity: number;
  }
  // types/index.d.ts
export interface ProductVariant {
    size?: number; // Optional for bucket products
    variant?: string; // Optional for non-bucket products
    price: number;
    variantId: string; // Variant ID must be available for the permalink
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
    quantity: number;  // Number of buckets
    size: number;      // Size of each bucket in litres
  }
  
  // Zustand store structure
  interface StoreState {
    // Other state properties
    bucketsNeeded: Record<string, BucketDetails>; // Store calculated bucket details for each product
    setBucketsNeeded: (payload: { productName: string; bucketDetails: BucketDetails }) => void; // Method to update bucket details
    // Other state methods...
  }