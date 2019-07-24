import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AppHeader, AppHeaderLeft, AppHeaderCenter, AppHeaderRight, AppLogo, AppHeaderNews, AppHeaderProof, AppWrapper } from './components';
import { defaultTheme } from './theme/defaultTheme';

import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';
import CallForm from './customerCalls/CallForm';

const App = () => (
  <ThemeProvider theme={defaultTheme}>
    <AppWrapper>
      <AppHeader>
        <AppHeaderLeft>
          <AppHeaderNews>NEWS</AppHeaderNews>
          <AppHeaderProof>PROOF</AppHeaderProof>
        </AppHeaderLeft>
        <AppHeaderCenter>
          <AppLogo src={logo} alt='logo' />
          <CallForm />
        </AppHeaderCenter>
        <AppHeaderRight>
          <ServerStatus />
        </AppHeaderRight>
      </AppHeader>
      <RequestList />
    </AppWrapper>
  </ThemeProvider>
);

export default App;
