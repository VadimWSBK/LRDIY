import React from 'react';
import styles from './RoofTypeSelect.module.css'; // Import component styles

interface RoofTypeSelectProps {
    roofType: string;
    setRoofType: (newRoofType: string) => void;
}

const RoofTypeSelect: React.FC<RoofTypeSelectProps> = ({ roofType, setRoofType }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setRoofType(event.target.value); // Update the roof type in the parent component
    };

    return (
        <div className={styles.roofTypeSelect}>
            <label htmlFor="roof-type" className={styles.label}>Select Roof Type:</label>
            <select 
                id="roof-type" 
                value={roofType} 
                onChange={handleChange}
                className={styles.selectDropdown}
            >
                <option value="painted">Painted Roof</option>
                <option value="raw metal">Raw Metal Roof</option>
            </select>
        </div>
    );
};

export default RoofTypeSelect;

