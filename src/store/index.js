import { v4 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialPltosState = [
    {
        id: '',
        city: '',
        street: '',
        number: '',
    }
];

const plotsSlice = createSlice({
    name: 'plots',
    initialState: initialPltosState,
    reducers: {
        findPlot(state, action) {
            state.push({
                id: uuid(),
                ...action.payload
            })
        },
    }
})
export const { findPlot } = plotsSlice.actions;
export default plotsSlice.reducer;




