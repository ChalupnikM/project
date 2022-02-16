import React, { useState } from 'react';

import FormField from '../components/molecules/FormField';
import { Button } from '../components/atoms/Button';
import { ViewFormWrapper } from '../components/molecules/ViewWrapper';
import { toast } from 'react-toastify';

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

        const today = new Date();
        const date = today.getFullYear()+'-'+((today.getMonth()+1) < 10 ? '0'+(today.getMonth()+1) : (today.getMonth()+1)) +'-'+(today.getDate() < 10 ? '0'+today.getDate() : today.getDate())
        const time = (today.getHours() < 10 ? '0'+today.getHours() : today.getHours()) + ":" + (today.getMinutes() < 10 ? '0'+today.getMinutes() : today.getMinutes()) + ":" + (today.getSeconds() < 10 ? '0'+today.getSeconds() : today.getSeconds())
        
        const dateTime = date+' '+time;
        console.log(dateTime);
        if(formValues.city && formValues.street && formValues.number) {
            dispatch(findPlot({ city: formValues.city, street: formValues.street, number: formValues.number, date: dateTime}));
            dispatch(getApi());

        }
        else {
            toast.error("Oops something went wrong! Check the data", {
                position: toast.POSITION.TOP_CENTER
            });
        }
        
 };

    return (
        <ViewFormWrapper as="form" onSubmit={handleSubmitUser}>
            <FormField label="City" id="city" name="city" value={formValues.city} onChange={handleInputChange} />
            <FormField label="Street" id="street" name="street" value={formValues.street} onChange={handleInputChange} />
            <FormField label="House number" type="number" id="number" name="number" value={formValues.number} onChange={handleInputChange} />
            <Button type="submit">Send</Button>
        </ViewFormWrapper>
    )
}

export default Form;