import React from 'react';
import { AppWrapper, AppHeader, AppTitle, AppLogo } from './components';

import logo from './logo.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

const App = () => (
  <AppWrapper>
    <AppHeader>
      <AppLogo src={logo} alt="logo" />
        <AppTitle>Oracle Monitor</AppTitle>
    </AppHeader>

    <ServerStatus />
    <RequestList />
  </AppWrapper>
);

export default App;
