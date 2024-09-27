import { useEffect } from 'react';
import useStore from './useStore'; // Import Zustand store
import { products } from '../utils/products';

const useRoofType = () => {
    const {
        roofType,
        setRoofType,
        selectedProducts,
        setSelectedProducts,
    } = useStore((state) => ({
        roofType: state.roofType,
        setRoofType: state.setRoofType,
        selectedProducts: state.selectedProducts,
        setSelectedProducts: state.setSelectedProducts,
    }));

    // Initialize selected products based on initial roof type
    useEffect(() => {
        const initialSelectedProducts = Object.values(products)
            .map((product) => product.name)
            .filter((name) =>
                roofType === 'painted' ? name !== 'Etch Primer' : name !== 'Sealer / Primer'
            );
        setSelectedProducts(initialSelectedProducts);
    }, [roofType, setSelectedProducts]);

    // Handle roof type change
    const handleRoofTypeChange = (newRoofType: string) => {
        setRoofType(newRoofType);
        if (newRoofType === 'painted') {
            setSelectedProducts((selected: string[]) => {
                return [
                    ...selected.filter((item: string) => item !== 'Etch Primer'),
                    'Sealer / Primer',
                ];
            });
        } else if (newRoofType === 'raw metal') {
            setSelectedProducts((selected: string[]) => {
                return [
                    ...selected.filter((item: string) => item !== 'Sealer / Primer'),
                    'Etch Primer',
                ];
            });
        }
    };

    return { roofType, handleRoofTypeChange, selectedProducts };
};

export default useRoofType;
