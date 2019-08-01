import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderLogoLinkWrapper,
  AppHeaderNews,
  AppHeaderProof,
  AppHeaderRight,
  AppLogo,
  AppWrapper,
} from './components';
import { RequestProps } from './requests/Request';
import { defaultTheme } from './theme/defaultTheme';

import { gardenerWebsiteUrl } from './config';
import CallForm from './customerCalls/CallForm';
import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';


interface State {
  requests: {
    [key: string]: RequestProps,
  };
}

class App extends React.Component {

  state = {
    requests: {} as { [key: string]: RequestProps },
  };

  handleTransactionHashAndUrl = (hash: string, url: string) => {
    const { requests } = this.state;
    const newRequest = {
      hash,
      url
    };
    // @ts-ignore
    this.setState({
      requests: {
        ...requests,
        [newRequest.hash]: newRequest,
      },
    });
  }
  // @ts-ignore
  handleUpdateState = (updatedState) => {
    const { requests } = this.state;
    this.setState({
      requests: {
        ...requests,
        [updatedState.id]: updatedState,
      },
    });
  }

  render() {
    return (
      <ThemeProvider theme={defaultTheme}>
        <AppWrapper>
          <AppHeader>
            <AppHeaderLeft>
              <AppHeaderNews>NEWS</AppHeaderNews>
              <AppHeaderProof>PROOF</AppHeaderProof>
            </AppHeaderLeft>
            <AppHeaderCenter>
              <AppHeaderLogoLinkWrapper href={gardenerWebsiteUrl} target='_blank' rel='noopener noreferrer'>
                <AppLogo src={logo} alt='logo' />
              </AppHeaderLogoLinkWrapper>
              <CallForm handleTransactionHashAndUrl={this.handleTransactionHashAndUrl} />
            </AppHeaderCenter>
            <AppHeaderRight>
              <ServerStatus />
            </AppHeaderRight>
          </AppHeader>
          <RequestList requests={this.state.requests} handleUpdateState={this.handleUpdateState} />
        </AppWrapper>
      </ThemeProvider>
    );
  }

}

export default App;
