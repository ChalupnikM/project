import React from 'react';
import { Logo, StyledLink, Wrapper } from './Navigation.styles';

const Navigation = () => {
    return (
        <Wrapper>
            <Logo>
                <h1>
                    Find
                    <br />
                    Your 
                    <br />
                    Plot
                </h1>
            </Logo>
            <StyledLink exact to="/">Home</StyledLink>
            <StyledLink to="/form">Form</StyledLink>
        </Wrapper>
    );
};

export default Navigation;