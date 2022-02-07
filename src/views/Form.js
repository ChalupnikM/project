import React, { useState } from 'react';
import FormField from '../components/molecules/FormField';
import { Button } from '../components/atoms/Button';
import { ViewWrapper } from '../components/molecules/ViewWrapper';
import { MapContainer, TileLayer, Polygon, Marker, Popup } from 'react-leaflet'
import { parseFromWK } from 'wkt-parser-helper';
import { toast } from 'react-toastify';
import * as geolib from 'geolib';

const initialFormState = {
    city: '',
    street: '',
    number: '',
};

const Form = () => {

    const [myData, setMyData] = useState(0);
    const [map, setMap] = useState(null);
    const [position, setPosition] = useState([52.2319151981909, 21.0067752980283]);
    const [popupValue, setPopupValue] = useState('');

    const purpleOptions = { color: 'purple' };

    const [formValues, setFormValues] = useState(initialFormState);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitUser = (e) => {
        e.preventDefault();
        // setFormValues(initialFormState);

        const url =
            `https://services.gugik.gov.pl/uug/?request=GetAddress&exact_number=1&accuracy=0.6&address=${formValues.city}%2C%20${formValues.street}%20${formValues.number}&srid=4326&fbclid=IwAR1LM91E1cD2vOyskbguZ3CUgVzsgMlNrIQI5HCJGePtgITH7jxFkGU3rMw`;

        (async () => {
            try {
                const data = await (await fetch(url)).json();
                const x = data.results[1].x;
                const y = data.results[1].y;
                setPosition([y, x])

                map.flyTo([data.results[1].y, data.results[1].x], 18);

                const url2 = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${x},${y},4326&result=geom_wkt&srid=4326`;
                const data2 = await (await fetch(url2)).text();
                console.log(data2);

                toast.info("Loading...", {
                    position: toast.POSITION.TOP_CENTER
                });

                const geojson = parseFromWK(data2);
                const geojson2 = parseFromWK(data2);

                for (let i = 0; i < geojson.coordinates[0].length; i++) {

                    geojson.coordinates[0][i].reverse();

                }

                setMyData(geojson.coordinates[0]);

                setPopupValue((geolib.getAreaOfPolygon(geojson2.coordinates[0])).toFixed(2));
                // setPopupValue(((geolib.getAreaOfPolygon(geojson.coordinates[0])) * 0.7).toFixed(0));


            } catch (error) {
                toast.error("Oops something went wrong! Check the data", {
                    position: toast.POSITION.TOP_CENTER
                });
            }
        })();
    };

    return (
        <ViewWrapper as="form" onSubmit={handleSubmitUser}>
            <FormField label="City" id="city" name="city" value={formValues.city} onChange={handleInputChange} />
            <FormField label="Street" id="street" name="street" value={formValues.street} onChange={handleInputChange} />
            <FormField label="House number" type="number" id="number" name="number" value={formValues.number} onChange={handleInputChange} />
            <Button type="submit">Send</Button>
            <MapContainer center={[52.2319151981909, 21.0067752980283]} zoom={10} scrollWheelZoom={false} whenCreated={setMap}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker position={position} >
                    <Popup>
                        Powierzchnia działki wynosi: {popupValue} m2.
                    </Popup>
                </Marker>
                <Polygon pathOptions={purpleOptions} positions={myData} />
            </MapContainer>
        </ViewWrapper>
    )
}

export default Form;