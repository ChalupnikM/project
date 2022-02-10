import React from 'react';
import Navigation from '../Organism/Navigation'
import Widget from '../Organism/Widget';
import { Wrapper } from './Template.styles';

const Template = ({ children }) => {
    return (
        <Wrapper>
            <Navigation />
            {children}
            <Widget />
        </Wrapper>
    );
};

export default Template;