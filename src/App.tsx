import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppHeader, AppLogo, AppWrapper } from './components';
import { defaultTheme } from './theme/defaultTheme';

import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppWrapper>
      <AppHeader>
        <AppLogo src={logo} alt='logo' />
        <ServerStatus />
      </AppHeader>
      <RequestList />
    </AppWrapper>
  </ThemeProvider>
);

export default App;
