// store/useStore.ts
import { create, StateCreator } from 'zustand';
import { devtools } from 'zustand/middleware';
import { products } from '../utils/products'; // Import your product data
import { Products, BucketCount, ProductVariant } from '../types/index'; // Import ProductVariant here

// Define the StoreState interface with all properties and methods
interface StoreState {
    products: Products;
    totalArea: number;
    totalPrice: number;
    discountedPrice: number;
    length: number;
    width: number;
    roofType: string;
    isVisible: boolean;
    isSelected: boolean;
    subtotalCost: Record<string, number>;
    popupVisibility: Record<string, boolean>;
    selectedProducts: string[];
    recommendedVariants: Record<string, { variant: ProductVariant; quantity: number }>; // Use ProductVariant type here
    requiredVolume: Record<string, number>;
    bucketsNeeded: Record<string, BucketCount[]>;
    bucketCost: Record<string, number>;
    variantCost: Record<string, number>;


    setBucketCost: (payload: { productName: string; cost: number }) => void;
    setVariantCost: (payload: { productName: string; cost: number }) => void;
    setSubtotalCost: (payload: { productName: string; cost: number }) => void;
    setSelectedProducts: (selectedProducts: string[] | ((prevSelected: string[]) => string[])) => void;
    setProducts: (products: Products) => void;
    setTotalArea: (area: number) => void;
    setTotalPrice: (price: number) => void;
    setDiscountedPrice: (price: number) => void;
    setLength: (length: number) => void;
    setWidth: (width: number) => void;
    setRoofType: (roofType: string) => void;
    togglePopup: (id: string, isVisible: boolean) => void;
    selectProduct: (productName: string) => void;
    deselectProduct: (productName: string) => void;
    setRecommendedVariant: (payload: { productType: string; variant: ProductVariant; quantity: number }) => void;
    setRequiredVolume: (payload: { productName: string; volume: number }) => void;
    setBucketsNeeded: (payload: { productName: string; buckets: BucketCount[] }) => void;
    toggleProductSelection: (productName: string) => void; // Ensure toggle function is defined
}

// Create the Zustand store using `devtools` middleware
const useStore = create<StoreState>()(
    devtools(
        (set, get) => {
            const initialSelectedProducts = Object.values(products)
                .map((product) => product.name)
                .filter((name) => name !== 'Etch Primer');

            return {
                products, // Use imported products data
                totalArea: 15,
                totalPrice: 0,
                discountedPrice: 0,
                length: 6,
                width: 2.5,
                roofType: 'painted',
                isVisible: false,
                isSelected: false,
                selectedProducts: initialSelectedProducts, // Default selected products
                recommendedVariants: {},
                requiredVolume: {}, // Ensure it's initialized as an empty object
                bucketsNeeded: {},
                subtotalCost: {}, // Initialize as an empty object
                popupVisibility: {},
                bucketCost: {}, // Initialize bucket cost as an empty object
                variantCost: {}, // Initialize variant cost as an empty object

                // Actions for updating the state
                setSubtotalCost: ({ productName, cost }) =>
                    set((state) => ({
                        subtotalCost: {
                            ...state.subtotalCost,
                            [productName]: cost,
                        },
                    })),

                setBucketCost: ({ productName, cost }) =>
                    set((state) => ({
                        bucketCost: {
                            ...state.bucketCost,
                            [productName]: cost,
                        },
                    })),

                setVariantCost: ({ productName, cost }) =>
                    set((state) => ({
                        variantCost: {
                            ...state.variantCost,
                            [productName]: cost,
                        },
                    })),

                setSelectedProducts: (selectedProducts) =>
                    set((state) => ({
                        selectedProducts:
                            typeof selectedProducts === 'function'
                                ? selectedProducts(state.selectedProducts)
                                : selectedProducts,
                    })),

                setProducts: (products) => set({ products }),

                setTotalArea: (area) => set({ totalArea: area }),

                setTotalPrice: (price) => set(() => ({ totalPrice: price })),

                setDiscountedPrice: (price) => set(() => ({ discountedPrice: price })),

                setLength: (length) => set({ length }),

                setWidth: (width) => set({ width }),

                setRoofType: (roofType) =>
                    set((state) => {
                        let updatedSelectedProducts = state.selectedProducts.filter(
                            (product) => product !== 'Sealer / Primer' && product !== 'Etch Primer'
                        );

                        if (roofType === 'painted') {
                            updatedSelectedProducts.push('Sealer / Primer'); // Select Sealer / Primer for painted
                        } else if (roofType === 'raw metal') {
                            updatedSelectedProducts.push('Etch Primer'); // Select Etch Primer for raw metal
                        }

                        return { roofType, selectedProducts: updatedSelectedProducts };
                    }),

                togglePopup: (id, isVisible) =>
                    set((state) => ({
                        popupVisibility: {
                            ...state.popupVisibility,
                            [id]: isVisible,
                        },
                    })),

                selectProduct: (productName) =>
                    set((state) => ({
                        selectedProducts: [...state.selectedProducts, productName],
                    })),

                deselectProduct: (productName) =>
                    set((state) => ({
                        selectedProducts: state.selectedProducts.filter(
                            (name) => name !== productName
                        ),
                    })),

                // Set the recommended variant for a product
                setRecommendedVariant: ({ productType, variant, quantity }) =>
                set((state) => ({
                    recommendedVariants: {
                    ...state.recommendedVariants,
                    [productType]: { variant, quantity },
                    },
                })),

                setRequiredVolume: ({ productName, volume }) =>
                    set((state) => ({
                        requiredVolume: { ...state.requiredVolume, [productName]: volume },
                    })),

                    setBucketsNeeded: ({ productName, buckets }) =>
                    set((state) => ({
                      bucketsNeeded: {
                        ...state.bucketsNeeded,
                        [productName]: buckets, // Assign BucketCount[] to the productName key
                      },
                    })),

                // Zustand store (Example)
                toggleProductSelection: (productName: string) =>
                set((state) => {
                    const isSelected = state.selectedProducts.includes(productName);
                    const updatedProducts = isSelected
                    ? state.selectedProducts.filter((name) => name !== productName) // Remove if already selected
                    : [...state.selectedProducts, productName]; // Add if not selected

                    // Log the updated selected products
                    console.log('Updated Selected Products:', updatedProducts);

                    return {
                    selectedProducts: updatedProducts,
                    };
                }),
            };
        }
    )
);

export default useStore;
