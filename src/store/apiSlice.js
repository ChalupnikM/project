import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

//import axios from 'axios';
import { parseFromWK } from 'wkt-parser-helper';
import * as geolib from 'geolib';

import { setStateX } from './xSlice';
import { setStateY } from './ySlice';
import { setAreaValue } from './areaValueSlice';
import { setZoomValue } from './zoomValueSlice';

export const getApi = createAsyncThunk(
    'api/getApi',
    async (_, thunkAPI) => {
        const { plots } = thunkAPI.getState();
        const city = plots[plots.length - 1].city
        const street = plots[plots.length - 1].street;
        const number = plots[plots.length - 1].number;

        const url = `https://services.gugik.gov.pl/uug/?request=GetAddress&exact_number=1&accuracy=0.6&address=${city}%2C%20${street}%20${number}&srid=4326&fbclid=IwAR1LM91E1cD2vOyskbguZ3CUgVzsgMlNrIQI5HCJGePtgITH7jxFkGU3rMw`

        const data = await (await fetch(url)).json();
        const x = data.results[1].x;
        const y = data.results[1].y;

        thunkAPI.dispatch(setStateX(x));
        thunkAPI.dispatch(setStateY(y));

        const url2 = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${x},${y},4326&result=geom_wkt&srid=4326`;
        const data2 = await (await fetch(url2)).text();

        const geojson = parseFromWK(data2);
        const geojson2 = parseFromWK(data2);
        for (let i = 0; i < geojson.coordinates[0].length; i++) {
            geojson.coordinates[0][i].reverse();
        }

        thunkAPI.dispatch(setZoomValue(17));
        thunkAPI.dispatch(setAreaValue(((geolib.getAreaOfPolygon(geojson2.coordinates[0])).toFixed(2))));

        return geojson.coordinates[0];

    }
)

const initialState = {
    array: [],
    status: '',
}

const apiSlice = createSlice({
    name: 'api',
    initialState,
    extraReducers: {
        [getApi.pending]: (state) => {
            state.status = 'loading'
        },
        [getApi.fulfilled]: (state, { payload }) => {
            state.status = 'succes'
            state.array = payload
        },
        [getApi.pending]: (state, action) => {
            state.status = 'failed'
        },
    },
});

export default apiSlice.reducer;