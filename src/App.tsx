import React from 'react';
import { ThemeProvider } from 'styled-components';

import { AppHeader, AppLogo, AppTitle, AppWrapper } from './components';
import { defaultTheme } from './theme/defaultTheme';

import logo from './logo.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppWrapper>
      <AppHeader>
        <AppLogo src={logo} alt='logo'/>
        <AppTitle>Oracle Monitor test</AppTitle>
      </AppHeader>
      <ServerStatus/>
      <RequestList/>
    </AppWrapper>
  </ThemeProvider>
);

export default App;
