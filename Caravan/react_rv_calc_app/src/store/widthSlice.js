import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    width: 2.5, // Default width value
};

// Create slice
const widthSlice = createSlice({
    name: 'width',
    initialState,
    reducers: {
        updateWidth: (state, action) => {
            state.width = action.payload;
        },
    },
});

// Export the action creator
export const { updateWidth } = widthSlice.actions;

// Export the reducer to be used in the store
export default widthSlice.reducer;
