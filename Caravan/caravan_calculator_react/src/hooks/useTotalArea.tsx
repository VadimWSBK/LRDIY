// hooks/useTotalArea.ts
import { useEffect, useMemo } from 'react';
import useStore from '../store/useStore';
import { calculateArea } from '../utils/TotalAreaCalculation';

const useTotalArea = () => {
    const { length, width, setTotalArea } = useStore((state) => ({
        length: state.length,
        width: state.width,
        setTotalArea: state.setTotalArea,
    }));

    // Calculate total area
    const totalArea = useMemo(() => {
        return calculateArea(length, width);
    }, [length, width]);

    // Update totalArea in the Zustand store
    useEffect(() => {
        setTotalArea(totalArea);
    }, [totalArea, setTotalArea]);

    // Return the totalArea so it can be used directly in components
    return totalArea;
};

export default useTotalArea;
