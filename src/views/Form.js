import React, { useState } from 'react';
import FormField from '../components/molecules/FormField';
import { Button } from '../components/atoms/Button';
import { ViewWrapper } from '../components/molecules/ViewWrapper';
import { MapContainer, TileLayer, Polygon } from 'react-leaflet'
import { parseFromWK } from 'wkt-parser-helper';

const initialFormState = {
    city: '',
    street: '',
    number: '',
};

const Form = () => {

    const [myData, setMyData] = useState(0);
    const [map, setMap] = useState(null);

    const purpleOptions = { color: 'purple' }

    const [formValues, setFormValues] = useState(initialFormState);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    }

    const handleSubmitUser = (e) => {
        e.preventDefault();
        setFormValues(initialFormState);

        const url =
            `https://services.gugik.gov.pl/uug/?request=GetAddress&exact_number=1&accuracy=0.6&address=${formValues.city}%2C%20${formValues.street}%20${formValues.number}&srid=4326&fbclid=IwAR1LM91E1cD2vOyskbguZ3CUgVzsgMlNrIQI5HCJGePtgITH7jxFkGU3rMw`;

        (async () => {
            try {
                const data = await (await fetch(url)).json();
                const x = data.results[1].x;
                const y = data.results[1].y;
                
                map.flyTo([data.results[1].y, data.results[1].x], 18);

                const url2 = `https://uldk.gugik.gov.pl/?request=GetParcelByXY&xy=${x},${y},4326&result=geom_wkt&srid=4326`;

                const data2 = await (await fetch(url2)).text();
                
                const geojson = parseFromWK(data2)
                console.log(geojson.coordinates[0])
                for(let i = 0; i < geojson.coordinates[0].length; i++) {

                    geojson.coordinates[0][i].reverse();

                }
                
                setMyData(geojson.coordinates[0]);
                

                
            } catch (error) {
                console.log(error);
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
                <Polygon pathOptions={purpleOptions} positions={myData} />
            </MapContainer>
        </ViewWrapper>
    )
}

export default Form;