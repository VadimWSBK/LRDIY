import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { Product, BucketCount, ProductVariant } from '../types/index';

// Define the StoreState interface with all properties and methods
interface StoreState {
  // Product Data
  products: Product[];
  setProducts: (products: Product[]) => void;

  // Area Calculations
  totalArea: number;
  setTotalArea: (area: number) => void;

  // Price Calculations
  subtotalCost: Record<string, number>;
  setSubtotalCost: (productName: string, cost: number) => void;

  totalPrice: number;
  setTotalPrice: (price: number) => void;

  totalSavings: number;
  setTotalSavings: (savings: number) => void;

  discountedPrice: number;
  setDiscountedPrice: (price: number) => void;

  // Buckets and Variants Calculations
  bucketsNeeded: Record<string, BucketCount[]>;
  setBucketsNeeded: (productName: string, buckets: BucketCount[]) => void;

  recommendedVariants: Record<
    string,
    { variant: ProductVariant | null; quantity: number }
  >;
  setRecommendedVariants: (
    productName: string,
    variant: { variant: ProductVariant | null; quantity: number }
  ) => void;

  // Product Calculations (grouped by product)
  productCalculations: Record<
    string,
    {
      requiredVolume: number;
      bucketCost: number;
      variantCost: number;
      recommendedVariant: {
        variant: ProductVariant | null;
        quantity: number;
      };
      totalQuantity: number; // Add this line

    }
  >;
  setProductCalculations: (
    productName: string,
    calculations: Partial<StoreState['productCalculations'][string]>
  ) => void;
  

  // Input and Product Selection
  length: number;
  setLength: (length: number) => void;

  width: number;
  setWidth: (width: number) => void;

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
      // Product Data
      products: [],
      setProducts: (products: Product[]) =>
        set({ products }, false, 'setProducts'),

      // Area Calculations
      totalArea: 15,
      setTotalArea: (area: number) =>
        set({ totalArea: area }, false, 'setTotalArea'),

      // Price Calculations
      subtotalCost: {},
      setSubtotalCost: (productName: string, cost: number) =>
        set(
          produce((state: StoreState) => {
            state.subtotalCost[productName] = cost;
          }),
          false,
          'setSubtotalCost'
        ),

      totalPrice: 0,
      setTotalPrice: (price: number) =>
        set({ totalPrice: price }, false, 'setTotalPrice'),

      totalSavings: 0,
      setTotalSavings: (savings: number) =>
        set({ totalSavings: savings }, false, 'setTotalSavings'),

      discountedPrice: 0,
      setDiscountedPrice: (price: number) =>
        set({ discountedPrice: price }, false, 'setDiscountedPrice'),

      // Buckets and Variants Calculations
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

      // Product Calculations
      productCalculations: {},
      setProductCalculations: (
        productName: string,
        calculations: Partial<StoreState['productCalculations'][string]>
      ) =>
      set(
        produce((state: StoreState) => {
          if (!state.productCalculations[productName]) {
            state.productCalculations[productName] = {
              requiredVolume: 0,
              bucketCost: 0,
              variantCost: 0,
              recommendedVariant: { variant: null, quantity: 0 },
              totalQuantity: 0, // Add this line to include totalQuantity
            };
          }
      
          // Proceed with updating the state
          Object.assign(state.productCalculations[productName], calculations);
        }),
        false,
        'setProductCalculations'
      ),

      // Input and Product Selection
      length: 6,
      setLength: (length: number) => set({ length }, false, 'setLength'),

      width: 2.5,
      setWidth: (width: number) => set({ width }, false, 'setWidth'),

      roofType: 'painted',
      setRoofType: (roofType: string) =>
        set({ roofType }, false, 'setRoofType'),

      selectedProducts: [],
      setSelectedProducts: (
        selectedProducts:
          | string[]
          | ((prevSelected: string[]) => string[])
      ) => {
        if (typeof selectedProducts === 'function') {
          set(
            (state) => ({
              selectedProducts: selectedProducts(state.selectedProducts),
            }),
            false,
            'setSelectedProducts'
          );
        } else {
          set({ selectedProducts }, false, 'setSelectedProducts');
        }
      },
      toggleProductSelection: (productName: string) =>
        set(
          produce((state: StoreState) => {
            const isSelected = state.selectedProducts.includes(productName);
            if (isSelected) {
              state.selectedProducts = state.selectedProducts.filter(
                (name) => name !== productName
              );
            } else {
              state.selectedProducts.push(productName);
            }
          }),
          false,
          'toggleProductSelection'
        ),

      // Popup Visibility
      popupVisibility: {},
      togglePopup: (id: string, isVisible: boolean) =>
        set(
          produce((state: StoreState) => {
            state.popupVisibility[id] = isVisible;
          }),
          false,
          'togglePopup'
        ),

      // Total Quantity
      totalQuantity: 0,
      setTotalQuantity: (totalQuantity: number) =>
        set({ totalQuantity }, false, 'setTotalQuantity'),
    }),
    { name: 'MyStore' }
  )
);

export default useStore;
export type { StoreState };


