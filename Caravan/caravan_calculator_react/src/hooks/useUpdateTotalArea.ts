// hooks/useUpdateTotalArea.ts
import { useEffect } from 'react';
import useStore from '../store/useStore';
import { calculateArea } from '../utils/TotalAreaCalculation';

const useUpdateTotalArea = () => {
    const { length, width, setTotalArea } = useStore((state) => ({
        length: state.length,
        width: state.width,
        setTotalArea: state.setTotalArea,
    }));

    useEffect(() => {
        const area = calculateArea(length, width);
        setTotalArea(area);
    }, [length, width, setTotalArea]);
};

export default useUpdateTotalArea;
