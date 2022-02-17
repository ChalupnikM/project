import { v4 as uuid } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';

const initialPltosState = [
    {
        id: '',
        date: '',
        city: '',
        street: '',
        number: '',
    }
];

const plotsSlice = createSlice({
    name: 'plots',
    initialState: initialPltosState,
    reducers: {
        setPlot(state, action) {
            state.push({
                id: uuid(),
                ...action.payload
            })
        },
    }
})
export const { setPlot } = plotsSlice.actions;
export default plotsSlice.reducer;




