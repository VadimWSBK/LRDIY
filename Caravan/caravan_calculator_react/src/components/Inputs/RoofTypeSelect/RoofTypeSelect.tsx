import React from 'react';
import useStore from '../../../store/useStore'; // Zustand store
import styles from './RoofTypeSelect'; // Import component styles

interface RoofTypeSelectProps {
    onRoofTypeChange: (newRoofType: string) => void;
}

const RoofTypeSelect: React.FC<RoofTypeSelectProps> = ({ onRoofTypeChange }) => {
    const { roofType } = useStore((state) => ({
        roofType: state.roofType,
    }));

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onRoofTypeChange(event.target.value);
    };

    return (
        <div className={styles.roofTypeSelect}>
            <label htmlFor="roof-type" className={styles.label}>Select Roof Type:</label>
            <select 
                id="roof-type" 
                value={roofType} 
                onChange={handleChange}
                className={styles.selectDropdown} // Apply the selectDropdown class
            >
                <option value="painted">Painted Roof</option>
                <option value="raw metal">Raw Metal Roof</option>
            </select>
        </div>
    );
};

export default RoofTypeSelect;
