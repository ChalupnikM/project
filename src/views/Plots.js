import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { ViewWrapper } from '../components/molecules/ViewWrapper';
import Plot from '../components/molecules/Plot';


const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  h3,
  p {
    margin: 0;
    color: #737C8E;
  }
`;



const Plots = () => {
    //   const dispatch = useDispatch();
    const plots = useSelector(state => state.plots);

    return (
        <ViewWrapper>
            <Wrapper>
                {console.log(plots.length)}
                {plots.length > 1
                ? plots.map(({ city, street, number, id }) => <Plot id={id} key={id} city={city} street={street} number={number} />)    
                : <p>Find your first plot </p>}
            </Wrapper>
        </ViewWrapper>
    );
};

export default Plots;