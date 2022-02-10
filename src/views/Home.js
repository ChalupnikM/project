import React from 'react';
import { ViewWrapper } from '../components/molecules/ViewWrapper';
import './Home.css';
import { MapContainer, TileLayer } from 'react-leaflet'

const Homepage = () => {



    return (
        <ViewWrapper>
            <p>Find Your Plot Here!</p>
            <MapContainer center={[52.2319151981909, 21.0067752980283]} zoom={10} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />    
            </MapContainer>
        </ViewWrapper>

    );

};


export default Homepage;