import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    areaValue: '',
}

const areaValueSlice = createSlice({
    name: 'areaValue',
    initialState: initialState,
    reducers: {
        setAreaValue: (state, action) => {
            state.areaValue = action.payload
        }
    },
}
);

export const { setAreaValue } = areaValueSlice.actions;
export default areaValueSlice.reducer;