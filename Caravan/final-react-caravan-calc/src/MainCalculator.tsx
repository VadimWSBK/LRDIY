import React, { useState, useEffect, useMemo } from 'react';
import LengthInput from './components/Inputs/LenghtInput/LengthInput';
import WidthInput from './components/Inputs/WidthInput/WidthInput';
import RoofTypeSelect from './components/Inputs/RoofTypeSelect/RoofTypeSelect';
import styles from './MainCalculator.module.css'; // Updated import for CSS modules
import useStore from './store/useStore'; // Zustand store access
import ProductList from './components/Product_List/ProductList/ProductList';

const MainCalculator: React.FC = () => {
  const [length, setLength] = useState<number>(6);
  const [width, setWidth] = useState<number>(2.5);
  const [roofType, setRoofType] = useState<string>('painted'); // Local roofType state

  const MemoizedProductList = React.memo(ProductList);


  // Access setTotalArea from Zustand store
  const setTotalArea = useStore((state) => state.setTotalArea);
  const setStoreRoofType = useStore((state) => state.setRoofType); // Zustand store updater

  // Memoize length * width calculation to avoid re-rendering unnecessarily
  const calculatedArea = useMemo(() => length * width, [length, width]);

  // Recalculate totalArea whenever length or width changes
  useEffect(() => {
    setTotalArea(calculatedArea);
  }, [calculatedArea, setTotalArea]);

  useEffect(() => {
    setStoreRoofType(roofType); // Update the roofType in Zustand store
  }, [roofType, setStoreRoofType]);

  return (
    <div className={styles.calculatorContainer}>
      <div className={styles.caravanCalculatorContainer}>
        <div className={styles.headingContainer}>
          <h1>How Big Is Your Caravan?</h1>
        </div>

        <div className={styles.inputRow}>
          <div className={styles.inputContainer}>
            <LengthInput length={length} setLength={setLength} />
          </div>
          <div className={styles.inputContainer}>
            <WidthInput width={width} setWidth={setWidth} />
          </div>
        </div>

        <div className={styles.totalAreaAndSelect}>
            <div className={styles.selectContainer}>
            <RoofTypeSelect roofType={roofType} setRoofType={setRoofType} /> {/* Pass state */}
            </div>

            <div className={styles.totalArea}>
              <h4 className={styles.totalAreaHeading}>Total Area:</h4>
              <div className={styles.totalAreaValue}>
                {calculatedArea.toFixed(2)} m<sup>2</sup>
              </div>
            </div>
          </div>
          <div className={styles.productList}>
          </div>
          <ProductList />

          <div className={styles.totalAreaAndSelect}>
            <div className={styles.selectContainer}></div>
            <div className={styles.totalArea}>
            </div>
          </div>

    
      </div>
    </div>
  );
};

export default MainCalculator;


