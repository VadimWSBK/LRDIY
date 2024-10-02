// hooks/useTotalArea.ts
import useStore from '../store/useStore';

const useTotalArea = () => {
  return useStore((state) => state.length * state.width);
};

export default useTotalArea;
