import React from 'react';
import { ThemeProvider } from 'styled-components';
import {
  AppFooter,
  AppFooterSpan,
  AppHeader,
  AppHeaderCenter,
  AppHeaderLeft,
  AppHeaderNews,
  AppHeaderProof,
  AppHeaderRight,
  AppLogo,
  AppWrapper,
} from './components';
import Pagination from './AppPagination';
import { LinkWrapper } from './utils/LinkWrapper'
import { RequestStatus } from './domain/requestStatus';
import { defaultTheme } from './theme/defaultTheme';
import Modal from './utils/Modal';

import { gardenerWebsiteUrl } from './config';
import { CallForm } from './customerCalls/CallForm';
import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

interface State {
  requests: {
    [key: string]: RequestStatus,
  };
  isModalOpen: boolean;
  modalMessage: JSX.Element | string;
  currentPage: number;
  postsPerPage: number;
}

class App extends React.Component<{}, State> {

  state: State = {
    requests: {},
    isModalOpen: false,
    modalMessage: '',
    currentPage: 1,
    postsPerPage: 10,
  };


  handleTransactionHashAndUrl = (hash: string, url: string) => {
    const { requests } = this.state;
    const newRequest = {
      hash,
      url,
    };
    this.setState({
      requests: {
        ...requests,
        [newRequest.hash]: { ...requests[newRequest.hash], hash, url },
      },
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

  handleModal = (modalState: boolean, modalMessage: JSX.Element | string) => {
    this.setState({
      isModalOpen: modalState,
      modalMessage,
    });
  }

  handlePaginate = (number: any) => {
    this.setState({
      currentPage: number,
    });
  }

  render() {
    const { currentPage, postsPerPage } = this.state;
    const requestsArray = Object.entries(this.state.requests).reverse().map(element => {
      return element[1];
    });

    const getIndexOfLastPost = currentPage + postsPerPage;
    const indexOfFirstPost = getIndexOfLastPost - postsPerPage;
    const currentPosts = requestsArray.slice(indexOfFirstPost, getIndexOfLastPost);
    const totalPosts = requestsArray.length;
    console.log('====================================');
    console.log('currentPosts', currentPosts);
    console.log('====================================');

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
            <RequestList requests={this.state.requests} requestsArray={currentPosts} handleUpdateState={this.handleUpdateState} />
            <AppFooter>
              <Pagination postsPerPage={postsPerPage} totalPosts={totalPosts} paginate={this.handlePaginate} />
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
