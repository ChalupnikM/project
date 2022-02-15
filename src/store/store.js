import { configureStore } from '@reduxjs/toolkit';


import apiReducer from './apiSlice';
import plotsReducer from './index';
import xReducer from './xSlice';
import yReducer from './ySlice';
import areaReducer from './areaValueSlice'
import zoomReducer from './zoomValueSlice'

export const store = configureStore({
    reducer: {
        plots: plotsReducer,
        api: apiReducer,
        x: xReducer,
        y: yReducer,
        areaValue: areaReducer,
        zoomValue: zoomReducer,
    },
});