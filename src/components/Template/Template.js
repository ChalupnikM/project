import React from 'react';
import Navigation from '../Organism/Navigation'
import { Wrapper } from './Template.styles';

const Template = ({ children }) => {
    return (
        <Wrapper>
            <Navigation />
            {children}
        </Wrapper>
    );
};

export default Template;