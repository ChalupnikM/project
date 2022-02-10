import React from 'react';
import styled from 'styled-components';
import Plot from '../molecules/Plot';
import { useSelector } from 'react-redux';

const Wrapper = styled.div`
    width: 400px;
    height: auto;
    transform: ${({ isOpen }) => (isOpen ? 'translateX(0)' : 'translateX(400px)')};
    transition: transform 0.6s ease-in-out;
    max-height: 700px;
    position: absolute;
    right: 0;
    top: 40px;
    background: white;
    border: 2px solid #737C8E;
`;

const WidgetHandler = styled.button`
    width: 80px;
    height: 30px;
    background-color: #737C8E;
    transform: rotate(-90deg);
    position: absolute;
    left: -55px;
    border-radius: 8px 8px 0 0;
    top: 40px;
    color: white;
    border: none;
    cursor: pointer;

`;

const WidgetWrapper = styled.div`
  max-height: 700px;
  min-height: 93px;
  overflow-y: scroll;
  padding: 20px 60px;
  display: flex;
  flex-direction: column;
`;

const Widget = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const plots = useSelector(state => state.plots);

    const handleToggleWidget = () => setIsOpen((prevState) => !prevState);
    return (
        <Wrapper isOpen={isOpen}>
            <WidgetHandler onClick={handleToggleWidget}>history</WidgetHandler>
            <WidgetWrapper>
            {plots.length > 1
                ? plots.map(({ city, street, number, id }) => <Plot id={id} key={id} city={city} street={street} number={number} />)    
                : <p>Find your first plot </p> }
            </WidgetWrapper>
        </Wrapper>
    )

}

export default Widget;