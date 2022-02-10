import { createStore } from 'redux';
import { v4 as uuid } from 'uuid';

export const findPlot = (payload) => {
    return {
        type: 'plots/find',
        payload: {
            id: uuid(),
            ...payload,
        }
    }
};

const initialState = {
    plots: [
        {
            id: '',
            city: '',
            street: '',
            number: ''
        }
    ],
}

const plotsReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'plots/find':
            return {
                ...state,
                plots: [...state.plots, action.payload]
            };
        default:
            return state;
    }
}

export const store = createStore(plotsReducer);