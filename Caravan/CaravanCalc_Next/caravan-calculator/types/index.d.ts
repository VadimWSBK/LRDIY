// types/index.d.ts

export interface Bucket {
    size: number;
    price: number;
    variantId: string;
  }
  
  export interface BucketCount {
    size: number;
    count: number;
    price: number;
    variantId: string;
  }
  
  export interface Product {
    name: string;
    coveragePerLitre?: number;
    variants?: Bucket[];
  }
  
  export interface BucketCombination {
    buckets: BucketCount[];
    totalVolume: number;
    totalCost: number;
    waste: number;
  }
  

  export interface Product {
    name: string;
    image: string; // Add this line
    infoText?: string; // Optional
    variants?: any[]; // Adjust based on your actual structure
    coveragePerLitre?: number; // Adjust based on your actual structure
  }


  export type ProductVariant = {
    size?: number;
    price: number;
    variantId: string;
    variant?: string; // optional for geoTextile
  };
  
  export type Product = {
    name: string;
    image: string;
    coveragePerLitre?: number; // optional for some products
    variants: ProductVariant[];
    infoText: string;
  };
  
  export type Products = {
    [key: string]: Product;
  };