import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { produce } from 'immer';
import { Product, BucketCount, ProductVariant, ProductCost } from '../types/index';
import { products as initialProducts } from '../utils/products'; // Assuming you have a product list

// Define the StoreState interface with all properties and methods
interface StoreState {
  products: Record<string, Product>;
  setProducts: (products: Record<string, Product>) => void;

  totalArea: number;
  setTotalArea: (area: number) => void;

  productCosts: Record<string, ProductCost>;
  setProductCosts: (productName: string, bucketCost: number, variantCost: number) => void;
  totalCost: number;
  calculateTotalCost: () => void;

  bucketsNeeded: Record<string, BucketCount[]>;
  setBucketsNeeded: (productName: string, buckets: BucketCount[]) => void;

  recommendedVariants: Record<string, { variant: ProductVariant | null; quantity: number }>;
  setRecommendedVariants: (productName: string, variant: { variant: ProductVariant | null; quantity: number }) => void;

  roofType: string;
  setRoofType: (roofType: string) => void;

  selectedProducts: string[];
  setSelectedProducts: (selectedProducts: string[] | ((prevSelected: string[]) => string[])) => void;
  
  setProductSelection: (productName: string, isSelected: boolean) => void; // Added this

  initializeSelectedProducts: () => void;

  popupVisibility: Record<string, boolean>;
  togglePopup: (id: string, isVisible: boolean) => void;

  totalQuantity: number;
  setTotalQuantity: (totalQuantity: number) => void;
  
}

// Correct Zustand store definition
const useStore = create<StoreState>()(
  devtools(
    (set, get) => ({
      /*** Product Data ***/
      products: initialProducts,
      setProducts: (products: Record<string, Product>) =>
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

      selectedProducts: [], // Initialize selectedProducts

      setProductSelection: (productKey: string, isSelected: boolean) =>
      set((state) => {
        const selectedProducts = isSelected
          ? [...state.selectedProducts, productKey]
          : state.selectedProducts.filter((key) => key !== productKey);
        return { selectedProducts };
      }),

      setSelectedProducts: (selectedProducts: string[] | ((prevSelected: string[]) => string[])) =>
        set((state) => {
          const newSelectedProducts =
            typeof selectedProducts === 'function'
              ? selectedProducts(state.selectedProducts)
              : selectedProducts;
          return { selectedProducts: newSelectedProducts };
        }, false, 'setSelectedProducts'),


        initializeSelectedProducts: () => {
          set((state) => {
            const selectedProducts = Object.keys(state.products).filter(
              (productKey) => productKey !== 'etchPrimer' && productKey !== 'sealerPrimer'
            );
        
            // Add sealerPrimer or etchPrimer based on the roof type
            if (state.roofType === 'painted') {
              selectedProducts.push('sealerPrimer');
            } else if (state.roofType === 'raw metal') {
              selectedProducts.push('etchPrimer');
            }
        
            return { selectedProducts };
          }, false, 'initializeSelectedProducts');
        },

      // Set the roof type and adjust selected products
      setRoofType: (newRoofType: string) => {
        set((state) => {
          const updatedSelectedProducts = Object.keys(state.products).filter(
            (productName) => productName !== 'etchPrimer' && productName !== 'sealerPrimer'
          );

          if (newRoofType === 'painted') {
            updatedSelectedProducts.push('sealerPrimer');
          } else if (newRoofType === 'raw metal') {
            updatedSelectedProducts.push('etchPrimer');
          }

          return {
            roofType: newRoofType,
            selectedProducts: updatedSelectedProducts,
          };
        }, false, 'setRoofType');
      },

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
