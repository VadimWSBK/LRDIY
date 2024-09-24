import useStore from '../hooks/useStore';

const WidthInput = () => {
    const { width, setWidth } = useStore();

    const handleWidthChange = (e) => {
        const value = e.target.value;
        if (value === '' || /^\d*\.?\d*$/.test(value)) {
            const parsedValue = value === '' ? '' : parseFloat(value);
            const newWidth = parsedValue > 3 ? 3 : parsedValue;

            // Update width in Zustand store
            setWidth(newWidth);
        }
    };

    return (
        <div className="caravan-input-wrapper">
            <label htmlFor="caravan-width">Enter Width (m):</label>
            <input
                type="number"
                id="caravan-width"
                value={width}
                min="0"
                max="3"
                step="0.1"
                onChange={handleWidthChange}
            />
        </div>
    );
};

export default WidthInput;
