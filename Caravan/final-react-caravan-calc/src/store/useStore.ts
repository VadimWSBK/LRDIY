// store/useStore.ts

import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { Product, BucketCount, ProductVariant, ProductCost } from '../types/index';

// Define the StoreState interface with all properties and methods
interface StoreState {
  // Product Data
  products: Product[];
  setProducts: (products: Product[]) => void;

  // Area Calculations
  totalArea: number;
  setTotalArea: (area: number) => void;

  // Price Calculations
  productCosts: Record<string, ProductCost>;
  setProductCosts: (productName: string, bucketCost: number, variantCost: number) => void;
  totalCost: number;
  calculateTotalCost: () => void;

  // Buckets and Variants Calculations
  bucketsNeeded: Record<string, BucketCount[]>;
  setBucketsNeeded: (productName: string, buckets: BucketCount[]) => void;

  recommendedVariants: Record<string, { variant: ProductVariant | null; quantity: number }>;
  setRecommendedVariants: (
    productName: string,
    variant: { variant: ProductVariant | null; quantity: number }
  ) => void;

  // Input and Product Selection
  roofType: string;
  setRoofType: (roofType: string) => void;

  selectedProducts: string[];
  setSelectedProducts: (
    selectedProducts: string[] | ((prevSelected: string[]) => string[])
  ) => void;
  toggleProductSelection: (productName: string) => void;

  // Popup Visibility
  popupVisibility: Record<string, boolean>;
  togglePopup: (id: string, isVisible: boolean) => void;

  // Total Quantity
  totalQuantity: number;
  setTotalQuantity: (totalQuantity: number) => void;
}

// Create the Zustand store using `devtools` middleware and `produce` from Immer
const useStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      /*** Product Data ***/
      products: [],
      setProducts: (products: Product[]) =>
        set({ products }, false, 'setProducts'),

      /*** Area Calculations ***/
      totalArea: 0,
      setTotalArea: (area: number) =>
        set({ totalArea: area }, false, 'setTotalArea'),

      /*** Price Calculations ***/
      productCosts: {},
      setProductCosts: (productName, bucketCost, variantCost) => {
        set((state) => {
          const updatedProductCosts = {
            ...state.productCosts,
            [productName]: { bucketCost, variantCost },
          };

          // Update totalCost whenever productCosts change
          const totalCost = Object.values(updatedProductCosts).reduce(
            (total, costs) => total + costs.bucketCost + costs.variantCost,
            0
          );

          return {
            productCosts: updatedProductCosts,
            totalCost,
          };
        }, false, 'setProductCosts');
      },
      totalCost: 0,
      calculateTotalCost: () => {
        const totalCost = Object.values(get().productCosts).reduce(
          (total, costs) => total + costs.bucketCost + costs.variantCost,
          0
        );
        set({ totalCost }, false, 'calculateTotalCost');
      },

      /*** Buckets and Variants Calculations ***/
      bucketsNeeded: {},
      setBucketsNeeded: (productName: string, buckets: BucketCount[]) =>
        set(
          produce((state: StoreState) => {
            state.bucketsNeeded[productName] = buckets;
          }),
          false,
          'setBucketsNeeded'
        ),

      recommendedVariants: {},
      setRecommendedVariants: (
        productName: string,
        variant: { variant: ProductVariant | null; quantity: number }
      ) =>
        set(
          produce((state: StoreState) => {
            state.recommendedVariants[productName] = variant;
          }),
          false,
          'setRecommendedVariants'
        ),

      /*** Input and Product Selection ***/
      roofType: 'painted',
      setRoofType: (roofType: string) =>
        set({ roofType }, false, 'setRoofType'),

      selectedProducts: [],
      setSelectedProducts: (
        selectedProducts: string[] | ((prevSelected: string[]) => string[])
      ) =>
        set((state) => {
          const newSelectedProducts =
            typeof selectedProducts === 'function'
              ? selectedProducts(state.selectedProducts)
              : selectedProducts;
          return { selectedProducts: newSelectedProducts };
        }, false, 'setSelectedProducts'),

      toggleProductSelection: (productName: string) =>
        set((state) => {
          const isSelected = state.selectedProducts.includes(productName);
          const newSelectedProducts = isSelected
            ? state.selectedProducts.filter((name) => name !== productName)
            : [...state.selectedProducts, productName];
          return { selectedProducts: newSelectedProducts };
        }, false, 'toggleProductSelection'),

      /*** Popup Visibility ***/
      popupVisibility: {},
      togglePopup: (id: string, isVisible: boolean) =>
        set(
          produce((state: StoreState) => {
            state.popupVisibility[id] = isVisible;
          }),
          false,
          'togglePopup'
        ),

      /*** Total Quantity ***/
      totalQuantity: 0,
      setTotalQuantity: (totalQuantity: number) =>
        set({ totalQuantity }, false, 'setTotalQuantity'),
    }),
    { name: 'MyStore' }
  )
);

export default useStore;
export type { StoreState };

