import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    zoomValue: '10',
}

const zoomValueSlice = createSlice({
    name: 'zoomValue',
    initialState: initialState,
    reducers: {
        setZoomValue: (state, action) => {
            state.zoomValue = action.payload
        }
    },
}
);

export const { setZoomValue } = zoomValueSlice.actions;
export default zoomValueSlice.reducer;