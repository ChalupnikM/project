import React, { useState } from 'react';

import FormField from '../components/molecules/FormField';
import { Button } from '../components/atoms/Button';
import { ViewFormWrapper } from '../components/molecules/ViewWrapper';
import { toast } from 'react-toastify';

import { getApi } from '../store/apiSlice';
import { useDispatch } from 'react-redux';


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
        if(formValues.city && formValues.street && formValues.number) {
            dispatch(getApi(formValues));
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