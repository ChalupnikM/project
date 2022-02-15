import React, { useState } from 'react';
import FormField from '../components/molecules/FormField';
import { Button } from '../components/atoms/Button';
import { ViewWrapper } from '../components/molecules/ViewWrapper';

import { getApi } from '../store/apiSlice';
import { useDispatch } from 'react-redux';
import { findPlot } from '../store';


const initialFormState = {
    city: '',
    street: '',
    number: '',
};

const Form = () => {
    const dispatch = useDispatch()
    const [formValues, setFormValues] = useState(initialFormState);

    const handleInputChange = (e) => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmitUser = (e) => {
        e.preventDefault();
        dispatch(findPlot({ city: formValues.city, street: formValues.street, number: formValues.number }));
        dispatch(getApi());
        
 };

    return (
        <ViewWrapper as="form" onSubmit={handleSubmitUser}>
            <FormField label="City" id="city" name="city" value={formValues.city} onChange={handleInputChange} />
            <FormField label="Street" id="street" name="street" value={formValues.street} onChange={handleInputChange} />
            <FormField label="House number" type="number" id="number" name="number" value={formValues.number} onChange={handleInputChange} />
            <Button type="submit">Send</Button>
        </ViewWrapper>
    )
}

export default Form;