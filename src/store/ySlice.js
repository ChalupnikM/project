import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    y: '52.2319151981909',
}

const ySlice = createSlice({
    name: 'y',
    initialState: initialState,
    reducers: {
        setStateY: (state, action) => {
            state.y = action.payload
        }
    },
}
);

export const { setStateY } = ySlice.actions;
export default ySlice.reducer;