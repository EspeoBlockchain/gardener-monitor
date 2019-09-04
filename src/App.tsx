import React from 'react';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles } from './utils/components';
import Pagination from './AppPagination';
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
import { RequestObject } from './domain/requestObject';
import { defaultTheme } from './theme/defaultTheme';
import { LinkWrapper } from './utils/LinkWrapper';
import Modal from './utils/Modal';

import { gardenerWebsiteUrl } from './config';
import { CallForm } from './customerCalls/CallForm';
import logo from './images/gardener-logo_horizontal.svg';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

interface State {
  requests: {
    [key: string]: RequestObject,
  };
  isModalOpen: boolean;
  modalMessage: JSX.Element | string;
  currentPage: number;
  postsPerPage: number;
  isLoading: boolean;
}

class App extends React.Component<{}, State> {

  state: State = {
    requests: {},
    isModalOpen: false,
    modalMessage: '',
    currentPage: 1,
    postsPerPage: 10,
    isLoading: true,
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
  handleUpdateRequest = (updatedState: RequestObject) => {
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

  handlePaginate = (pageNumber: number) => {
    this.setState({
      currentPage: pageNumber,
    });
    window.scrollTo(0, 0);
  }

  handleChangeLoader = (state: boolean) => {
    this.setState({
      isLoading: state,
    })
  }

  render() {
    const { currentPage, postsPerPage } = this.state;
    const requestsArray = Object.values(this.state.requests).reverse();

    const getIndexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = getIndexOfLastPost - postsPerPage;
    const currentPosts = requestsArray.slice(indexOfFirstPost, getIndexOfLastPost);
    const totalPosts = requestsArray.length;
    return (
      !this.state.isModalOpen ?
        <ThemeProvider theme={defaultTheme}>
          <>
            <GlobalStyles />
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
                  <CallForm
                    paginate={this.handlePaginate}
                    handleModal={this.handleModal}
                    handleTransactionHashAndUrl={this.handleTransactionHashAndUrl}
                  />
                </AppHeaderCenter>
                <AppHeaderRight>
                  <ServerStatus />
                </AppHeaderRight>
              </AppHeader>
              <RequestList
                isLoading={this.state.isLoading}
                paginate={this.handlePaginate}
                requests={this.state.requests}
                requestsArray={currentPosts}
                handleUpdateRequest={this.handleUpdateRequest}
                changeLoader={this.handleChangeLoader}
              />
              <AppFooter>
                {
                  !this.state.isLoading ?
                    <Pagination
                      currentPage={currentPage}
                      postsPerPage={postsPerPage}
                      totalPosts={totalPosts}
                      paginate={this.handlePaginate}
                    />
                    :
                    ''
                }
              </AppFooter>
            </AppWrapper>
          </>
        </ThemeProvider>
        :
        <ThemeProvider theme={defaultTheme}>
          <>
            <GlobalStyles />
            <Modal
              show={this.state.isModalOpen}
              onClose={this.toggleModal}
            >
              {this.state.modalMessage}
            </Modal>
          </>
        </ThemeProvider>
    );
  }

}

export default App;
