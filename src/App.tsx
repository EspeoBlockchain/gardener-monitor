import React from 'react';
import styled from 'styled-components'

import logo from './logo.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

const AppContainer = styled.div`
  text-align: center;
`;

const AppHeader = styled.header`
  background-color: #222;
  height: 150px;
  padding: 20px;
  color: white;
`;

const AppTitle = styled.h1`
  font-size: 1.5em;
`;

const AppLogo = styled.img`
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
  @keyframes App-logo-spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

const App = () => (
  <AppContainer>
    <AppHeader>
      <AppLogo src={logo} alt="logo" />
        <AppTitle>Oracle Monitor</AppTitle>
    </AppHeader>

    <ServerStatus />
    <RequestList />
  </AppContainer>
);

export {
  AppContainer,
  AppHeader,
  AppLogo,
  AppTitle
};

export default App;
