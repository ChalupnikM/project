import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const Wrapper = styled.nav`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #ECEFF7;
  justify-content: flex-start;
  padding: 30px 0;
`;

export const Logo = styled.div`
  background-color: #737C8E;
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
  h1 {
    font-size: 15px;
    color: #FFFFFF;
    text-align: right;
    margin-right: 20px;
  }
`;


const activeClassName = 'active-link';

export const StyledLink = styled(NavLink).attrs({ activeClassName })`
  font-weight: bold;
  text-decoration: none;
  color: #737C8E;
  text-align: right;
  margin: 15px 20px 15px auto;
  position: relative;

  &.${activeClassName} {
    &::after {
      opacity:1;
    }
  }

    &::after {
      opacity: 0;
      content: '';
      transition: opacity 0.4s ease-in-out;
      position: absolute;
      width: 19px;
      height: 3px;
      top: 50%;
      transform: translateY(-50%);
      right: -20px;
      background-color: #C0C7D6;
    }
  }
`;