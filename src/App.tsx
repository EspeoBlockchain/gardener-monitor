import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  AppFooter,
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderNews,
  AppHeaderProof,
  AppHeaderRight,
  AppLogo,
  AppWrapper,
} from './components';
import { LinkWrapper } from './utils/LinkWrapper'
import { RequestStatus } from './domain/requestStatus';
import { defaultTheme } from './theme/defaultTheme';
import Modal from './utils/Modal';

import { gardenerWebsiteUrl } from './config';
import { CallForm } from './customerCalls/CallForm';
import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';
import { number } from 'prop-types';

interface State {
  requests: {
    [key: string]: RequestStatus,
  };
  isModalOpen: boolean;
  modalMessage: string;
  totalPages: number[];
  requestsPerPage: number;
  currentPage: number;
}

class App extends React.Component<{}, State> {

  state: State = {
    requests: {},
    isModalOpen: false,
    modalMessage: '',
    totalPages: [],
    requestsPerPage: 10,
    currentPage: 0,
  };

  handleTransactionHashAndUrl = (hash: string, url: string) => {
    let totalPagesCount = [];
    for (let i = 1;
      i <= Math.ceil(Object.keys(this.state.requests).length / this.state.requestsPerPage);
      i++) {
      totalPagesCount.push(i);
    }
    const { requests, totalPages } = this.state;
    const newRequest = {
      hash,
      url,
    };
    this.setState({
      requests: {
        ...requests,
        [newRequest.hash]: { ...requests[newRequest.hash], hash, url },
      },
      totalPages: totalPagesCount,
    });
  }
  handleUpdateState = (updatedState: RequestStatus) => {
    const { requests } = this.state;
    this.setState({
      requests: {
        ...requests,
        [updatedState.id]: updatedState,
      },
    });
  }
  toggleModal = () => {
    this.setState({
      ...this.state,
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleModal = (modalState: boolean, modalMessage: string) => {
    this.setState({
      isModalOpen: modalState,
      modalMessage,
    });
  }

  render() {
    return (
      !this.state.isModalOpen ?
        <ThemeProvider theme={defaultTheme}>
          <AppWrapper>
            <AppHeader>
              <AppHeaderLeft>
                <AppHeaderNews>NEWS</AppHeaderNews>
                <AppHeaderProof>PROOF</AppHeaderProof>
              </AppHeaderLeft>
              <AppHeaderCenter>
                <LinkWrapper href={gardenerWebsiteUrl} target='_blank' rel='noopener noreferrer'>
                  <AppLogo src={logo} alt='logo' />
                </LinkWrapper>
                <CallForm handleModal={this.handleModal} handleTransactionHashAndUrl={this.handleTransactionHashAndUrl} />
              </AppHeaderCenter>
              <AppHeaderRight>
                <ServerStatus />
              </AppHeaderRight>
            </AppHeader>
            <RequestList requests={this.state.requests} handleUpdateState={this.handleUpdateState} />
            <AppFooter>
              <span>&laquo;</span>
              <span>{this.state.totalPages}</span>
              <span>2</span>
              <span>3</span>
              <span>4</span>
            </AppFooter>
          </AppWrapper>
        </ThemeProvider>
        :
        <ThemeProvider theme={defaultTheme}>
          <Modal
            show={this.state.isModalOpen}
            onClose={this.toggleModal}
          >
            {this.state.modalMessage}
          </Modal>
        </ThemeProvider>
    );
  }

}

export default App;
