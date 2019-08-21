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
  modalMessage: string;
  requestsPerPage: number;
  currentPage: number;
  myArr: any;
}

class App extends React.Component<{}, State> {

  state: State = {
    requests: {},
    isModalOpen: false,
    modalMessage: '',
    requestsPerPage: 10,
    currentPage: 1,
    myArr: [],
  };
  //@ts-ignore
  constructor(props) {
    super(props);
//for pagination!!!


    // const { requests, currentPage, requestsPerPage } = this.state;
    // const requestsLength = Object.keys(requests).length;
    // let pagesCount: number = Math.ceil(requestsLength / requestsPerPage);
    // const indexOfLastPost: number = currentPage * requestsPerPage - 1;
    // const indexOfFirstPost: number = indexOfLastPost - requestsPerPage + 1;
    // //@ts-ignore
    // const arrayOfRequests = Object.entries(requests).map((e) => ({ [e[0]]: e[1] }));

    // const requestsToPage = () => {
    //   let actualPageRequests = [];
    //   for (let index = indexOfFirstPost; index <= indexOfLastPost; index++) {
    //     actualPageRequests.push(arrayOfRequests[index]);
    //   }
    //   return actualPageRequests;

    // }
  }
  componentDidMount() {
    
    this.setState({
      myArr: [],

    })
    //@ts-ignore
    // this.requestsToPage();
  }

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
              <AppFooterSpan>&laquo;</AppFooterSpan>
              <AppFooterSpan>1</AppFooterSpan>
              <AppFooterSpan>2</AppFooterSpan>
              <AppFooterSpan>3</AppFooterSpan>
              <AppFooterSpan>4</AppFooterSpan>
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
