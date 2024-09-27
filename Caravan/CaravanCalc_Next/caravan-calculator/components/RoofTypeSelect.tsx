import React from 'react';
import useStore from '../hooks/useStore'; // Import Zustand store

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
        <div className="roof-type-select">
            <label htmlFor="roof-type">Select Roof Type:</label>
            <select id="roof-type" value={roofType} onChange={handleChange}>
                <option value="painted">Painted Roof</option>
                <option value="raw metal">Raw Metal Roof</option>
            </select>
        </div>
    );
};

export default RoofTypeSelect;
