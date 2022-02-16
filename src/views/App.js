import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import MainTemplate from '../components/Template/Template';

import { Wrapper } from './App.styles';
import { GlobalStyle } from '../assets/styles/GlobalStyle';

import Form from './Form';
import Home from './Home';
import History from './Plots';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import { StyledEngineProvider } from '@mui/material/styles';

import { Provider } from 'react-redux';
import { store } from '../store/store';

const App = () => {

  return (
    <Provider store={store}>
      <Router>
        <ToastContainer />
        <GlobalStyle />
        <MainTemplate>
          <Wrapper>
            <Switch>
              <Route path="/form">
                <Form />
              </Route>
              <Route path="/history">
                <StyledEngineProvider injectFirst>
                  <History />
                </StyledEngineProvider>
              </Route>
              <Route path="/">
                <Home />
              </Route>
            </Switch>
          </Wrapper>
        </MainTemplate>
      </Router>
    </Provider>
  );
}

export default App;
