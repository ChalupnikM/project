import styled from 'styled-components';
import React from 'react';

const NoteWrapper = styled.div`
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

const Plot = ({ city, street, number, id }) => {

  return (
    <NoteWrapper>
        <p>{city}, {street} {number}</p>
    </NoteWrapper>
  );
};

export default Plot;

