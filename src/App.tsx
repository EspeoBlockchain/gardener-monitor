import React from 'react';
import { ThemeProvider } from 'styled-components';

import { defaultTheme } from './theme/defaultTheme';
import { AppWrapper, AppHeader, AppTitle, AppLogo } from './components';

import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';
import logo from './logo.svg';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppWrapper>
      <AppHeader>
        <AppLogo src={logo} alt="logo"/>
        <AppTitle>Oracle Monitor</AppTitle>
      </AppHeader>
      <ServerStatus/>
      <RequestList/>
    </AppWrapper>
  </ThemeProvider>
);

export default App;
