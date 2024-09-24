import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { products } from '../utils/products';

interface ProductVariant {
    size?: number;
    price: number;
    variantId: string;
    variant?: string; // optional for geoTextile
}

interface Product {
    name: string;
    image: string;
    coveragePerLitre?: number; // optional for some products
    variants: ProductVariant[];
    infoText: string;
}

type Products = Record<string, Product>;

interface StoreState {
    products: Products;
    totalArea: number;
    totalPrice: number;
    discountedPrice: number;
    length: number;
    width: number;
    roofType: string;
    isVisible: boolean;
    selectedProducts: string[];
    recommendedVariants: Record<string, any>;
    requiredVolume?: Record<string, number>;
    bucketsNeeded?: Record<string, number>;

    setProducts: (products: Products) => void;
    setTotalArea: (area: number) => void;
    setTotalPrice: (price: number) => void;
    setDiscountedPrice: (price: number) => void;
    setLength: (length: number) => void;
    setWidth: (width: number) => void;
    setRoofType: (roofType: string) => void;
    togglePopup: (isVisible: boolean) => void;
    selectProduct: (productName: string) => void;
    deselectProduct: (productName: string) => void;
    setRecommendedVariant: (payload: { productType: string; variant: any }) => void;
    setRequiredVolume: (payload: { productName: string; volume: number }) => void;
    setBucketsNeeded: (payload: { productName: string; buckets: number }) => void;
}

const useStore = create<StoreState>(
    devtools((set) => ({
        products, // use the imported products directly
        totalArea: 15,
        totalPrice: 0,
        discountedPrice: 0,
        length: 6,
        width: 2.5,
        roofType: 'painted',
        isVisible: false,
        selectedProducts: [],
        recommendedVariants: {},
        requiredVolume: {}, // initialize as an empty object
        bucketsNeeded: {},   // initialize as an empty object

        setProducts: (products) => set({ products }),
        setTotalArea: (area) => set({ totalArea: area }),
        setTotalPrice: (price) => set({ totalPrice: price }),
        setDiscountedPrice: (price) => set({ discountedPrice: price }),
        setLength: (length) => set({ length }),
        setWidth: (width) => set({ width }),
        setRoofType: (roofType) => set({ roofType }),
        togglePopup: (isVisible) => set({ isVisible }),
        selectProduct: (productName) => set((state) => ({
            selectedProducts: [...state.selectedProducts, productName],
        })),
        deselectProduct: (productName) => set((state) => ({
            selectedProducts: state.selectedProducts.filter((name) => name !== productName),
        })),
        setRecommendedVariant: (payload) => set((state) => ({
            recommendedVariants: {
                ...state.recommendedVariants,
                [payload.productType]: payload.variant,
            },
        })),
        setRequiredVolume: ({ productName, volume }) =>
            set((state) => ({
                requiredVolume: { ...state.requiredVolume, [productName]: volume },
            })),
        setBucketsNeeded: ({ productName, buckets }) =>
            set((state) => ({
                bucketsNeeded: { ...state.bucketsNeeded, [productName]: buckets },
            })),
    }))
);

export default useStore;
