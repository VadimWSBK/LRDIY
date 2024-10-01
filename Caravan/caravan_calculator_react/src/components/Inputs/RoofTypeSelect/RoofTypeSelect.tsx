import React from 'react';
import styles from './RoofTypeSelect.module.css'; // Import component styles

interface RoofTypeSelectProps {
    onRoofTypeChange: (newRoofType: string) => void; // Ensure this prop is here
}

const RoofTypeSelect: React.FC<RoofTypeSelectProps> = ({ onRoofTypeChange }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        onRoofTypeChange(event.target.value); // Call the onRoofTypeChange prop
    };

    return (
        <div className={styles.roofTypeSelect}>
            <label htmlFor="roof-type" className={styles.label}>Select Roof Type:</label>
            <select 
                id="roof-type" 
                onChange={handleChange} // Trigger handleChange on change
                className={styles.selectDropdown} 
            >
                <option value="painted">Painted Roof</option>
                <option value="raw metal">Raw Metal Roof</option>
            </select>
        </div>
    );
};

export default RoofTypeSelect;


