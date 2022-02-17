import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { parseFromWK } from 'wkt-parser-helper';
import * as geolib from 'geolib';
import axios from 'axios';
import { toast } from 'react-toastify';

import { setPlot } from './plotsSlice';
import { setStateX } from './xSlice';
import { setStateY } from './ySlice';
import { setAreaValue } from './areaValueSlice';
import { setZoomValue } from './zoomValueSlice';

export const getApi = createAsyncThunk(
    'api/getApi',
    async (propsValue, thunkAPI) => {
        try {

        const city = propsValue.city;
        const street = propsValue.street;
        const number = propsValue.number

        const url = `https://services.gugik.gov.pl/uug/?request=GetAddress&exact_number=1&accuracy=0.6&address=${city}%2C%20${street}%20${number}&srid=4326&fbclid=IwAR1LM91E1cD2vOyskbguZ3CUgVzsgMlNrIQI5HCJGePtgITH7jxFkGU3rMw`


        const response = await axios.get(url)

        const x = response.data.results[1].x;
        const y = response.data.results[1].y;

        thunkAPI.dispatch(setStateX(x));
        thunkAPI.dispatch(setStateY(y));

        const url2 = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${x},${y},4326&result=geom_wkt&srid=4326`;

        const response2 = await axios.get(url2)
        const geojson = parseFromWK(response2.data);
        const geojson2 = parseFromWK(response2.data);
        for (let i = 0; i < geojson.coordinates[0].length; i++) {
            geojson.coordinates[0][i].reverse();
        }

        const today = new Date();
        const date = today.getFullYear()+'-'+((today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1)) +'-'+(today.getDate() < 10 ? '0'+today.getDate() : today.getDate())
        const time = (today.getHours() < 10 ? '0'+today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds())
        const dateTime = date+' '+time;

        thunkAPI.dispatch(setZoomValue(17));
        thunkAPI.dispatch(setAreaValue(((geolib.getAreaOfPolygon(geojson2.coordinates[0])).toFixed(2))));
        thunkAPI.dispatch(setPlot({ city: propsValue.city, street: propsValue.street, number: propsValue.number, date: dateTime}));
        return geojson.coordinates[0];

    } catch (error) {
        console.log(error);
        toast.error("Oops something went wrong! Check the data", {
            position: toast.POSITION.TOP_CENTER
        });
    }

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