import { createSlice } from '@reduxjs/toolkit';

// Initial state
const initialState = {
    length: 6, // Default length value
};

// Create slice
const lengthSlice = createSlice({
    name: 'length',
    initialState,
    reducers: {
        updateLength: (state, action) => {
            state.length = action.payload;
        },
    },
});

// Export the action creator
export const { updateLength } = lengthSlice.actions;

// Export the reducer to be used in the store
export default lengthSlice.reducer;
