import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    x: '21.0067752980283',
}

const xSlice = createSlice({
    name: 'x',
    initialState: initialState,
    reducers: {
        setStateX: (state, action) => {
            state.x = action.payload
        }
    },
}
);

export const { setStateX } = xSlice.actions;
export default xSlice.reducer;