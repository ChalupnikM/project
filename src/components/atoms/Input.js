import styled from "styled-components";

export const Input = styled.input`
margin: 11px 0;
padding: 7px 8px;
border: 1px solid #ECEFF7;
box-sizing: border-box;
box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.09);
border-radius: 25px;

&:focus {
    outline: none;
    box-shadow: -2px 4px 10px rgba(115, 124, 142, 0.3);
}
`;