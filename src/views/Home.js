import React from 'react';
import { ViewWrapper } from '../components/molecules/ViewWrapper';
import './Home.css';

import { useSelector } from 'react-redux';

import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'

const Homepage = () => {
    const { array } = useSelector((state) => state.api);
    const { x } = useSelector(state => state.x);
    const { y } = useSelector(state => state.y);
    const { areaValue }= useSelector(state => state.areaValue);
    const { zoomValue } = useSelector(state => state.zoomValue)
    const purpleOptions = { color: 'purple' };
    
    return (
        <ViewWrapper>
            <p>Find Your Plot Here!</p>
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
                <Polygon pathOptions={purpleOptions} positions={array} />
            </MapContainer>
        </ViewWrapper>

    );

};


export default Homepage;