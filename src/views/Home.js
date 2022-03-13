import React from 'react';
import { ViewHomeWrapper } from '../components/molecules/ViewWrapper';
import './Plots.css';

import { useSelector } from 'react-redux';

import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'

const Homepage = () => {
    const { array } = useSelector(state => state.api);
    const { x } = useSelector(state => state.x);
    const { y } = useSelector(state => state.y);
    const { areaValue }= useSelector(state => state.areaValue);
    const { zoomValue } = useSelector(state => state.zoomValue)
    const purpleOptions = { color: 'purple' };

    return (
        <ViewHomeWrapper>
            <MapContainer center={[y, x]} zoom={zoomValue} scrollWheelZoom={false} >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {areaValue ?
                <Marker position={[y, x]} >
                    <Popup>
                        Powierzchnia działki wynosi: {areaValue} m2.
                    </Popup>
                </Marker>
                : null}
                {array ?
                <Polygon pathOptions={purpleOptions} positions={array} />
                : null}
            </MapContainer>
        </ViewHomeWrapper>

    );

};


export default Homepage;