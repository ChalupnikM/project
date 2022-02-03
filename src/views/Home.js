import React, { useState } from 'react';
import { ViewWrapper } from '../components/molecules/ViewWrapper';
import './Home.css';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { Button } from '../components/atoms/Button';


const Homepage = () => {
    const [myX, setMyX] = useState(0);
    const [myY, setMyY] = useState(0);

    const handleButton = () => {
        fetch('https://services.gugik.gov.pl/uug/?request=GetAddress&exact_number=1&accuracy=0.6&address=%C5%BBywiec%2C%20Komorowskich%2069&srid=4326&fbclid=IwAR1LM91E1cD2vOyskbguZ3CUgVzsgMlNrIQI5HCJGePtgITH7jxFkGU3rMw')
            .then(response => response.json())
            .then(data => {
                setMyX(data.results[1].x);
                setMyY(data.results[1].y);
            })
            .then()
            .catch(error => error)

        console.log(myX);
        console.log(myY);

        fetch(`https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${myX},${myY},4326&result=geom_wkt&srid=4326`)
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => error)
    }


    const multiPolygon = [
        [49.6778699269309, 19.2466514373186],
        [49.6772061137777, 19.2470795480861],
        [49.6772171123301, 19.2471103145301],
        [49.6772632822118, 19.2472400874082],
        [49.6772662696435, 19.2472382238604],
        [49.6774320431511, 19.2471249574328],
        [49.6774808729228, 19.2472665773552],
        [49.6774888056735, 19.2472897828315],
        [49.677617909064, 19.247199966414],
        [49.6777833382454, 19.2470936187765],
        [49.6778639943283, 19.2470103222093],
        [49.6778840860205, 19.2469482021014],
        [49.6778969540215, 19.246905574258],
        [49.6778927395672, 19.2468126240837],
        [49.6778790117519, 19.2467012779116],
        [49.6778699269309, 19.2466514373186]
    ];

    const purpleOptions = { color: 'purple' }

    return (
        <ViewWrapper>
            <p>Find Your Plot Here!</p>
            <MapContainer center={[49.6778699269309, 19.2466514373186]} zoom={60} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polygon pathOptions={purpleOptions} positions={multiPolygon} />
            </MapContainer>
            <Button onClick={handleButton}>Przycisk</Button>
        </ViewWrapper>

    );

};


export default Homepage;