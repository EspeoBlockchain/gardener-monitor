import React, { PureComponent } from 'react';
import * as web3Contract from 'web3-eth-contract';

import oracleAbi from '../abi/oracle.abi';
import { Labels, RequestStatus } from '../domain';
import convertUnixToDate from '../utils/convertUnixToDate';
import web3 from '../utils/createAndUnlockWeb3';
import {
  RequestTable,
  RequestTableBody,
  RequestTableHead,
  RequestTableHeadCell,
  RequestTableHeadRow,
  RequestTableWrapper,
  FetchingDataLoader,
} from './components';
import Request from './Request';

interface Props {
  requests: {
    [key: string]: RequestStatus,
  };
  handleUpdateState: (requestStatus: RequestStatus) => void;
}

interface State {
  lastBlock: number;
  isLoading: boolean;
}

class RequestList extends PureComponent<Props, State> {
  public oracleContract: any;
  public handleUpdateState: any;

  get tableHeaders(): JSX.Element[] {
    return Object.values(Labels).map((label) => (
      <RequestTableHeadCell key={label}>{label}</RequestTableHeadCell>
    ));
  }

  state = {
    lastBlock: 0,
    isLoading: true,
  }

  constructor(props: Props) {
    super(props);

    this.handleUpdateState = (updatedState: RequestStatus) => {
      this.props.handleUpdateState(updatedState);
    };

    this.oracleContract = new web3.eth.Contract(
      oracleAbi,
      process.env.REACT_APP_ORACLE_ADDRESS,
    );

    this.oracleContract.events.allEvents()
      .on('data', (event: web3Contract.EventData) => {
        if (['DataRequested', 'DelayedDataRequested'].includes(event.event)) {
          const { requests } = this.props;
          if (Object.entries(requests).length === 0 && requests.constructor === Object) {
            return;
          }
          const { id, validFrom } = event.returnValues;
          const { transactionHash } = event;
          delete Object.assign(requests, { [id]: requests[transactionHash] })[transactionHash];
          const updatedRequest = {
            ...requests[id],
            id,
            validFrom: validFrom ? convertUnixToDate(validFrom) : new Date(),
          };
          this.handleUpdateState(updatedRequest);
        }

        if (event.event === 'RequestFulfilled') {
          const { requests } = this.props;
          if (Object.entries(requests).length === 0 && requests.constructor === Object) {
            return;
          }
          const { id, value, errorCode } = event.returnValues;

          if (!requests[id]) {
            return;
          }
          const updatedRequest = { ...requests[id], value, errorCode };
          this.handleUpdateState(updatedRequest);
        }
      })
      .on('error', console.error);
  }

  public getLastRequests = (numOfBlocks: number) => {
    const eventsCount = this.state.lastBlock - numOfBlocks;
    console.log('eC', this.state.lastBlock, eventsCount);

    this.oracleContract.getPastEvents("allEvents",
      {
        fromBlock: eventsCount,
        toBlock: 'latest',
      })
      .then((events: any) => {
        const { requests } = this.props;
        events.forEach((event: any) => {
          const { transactionHash } = event;
          const { errorCode, id, value, validFrom, url } = event.returnValues;
          const updatedRequest = {
            ...requests[id],
            id,
            hash: transactionHash,
            validFrom: validFrom ? convertUnixToDate(validFrom) : new Date(),
            value,
            errorCode,
            url,
          };
          this.handleUpdateState(updatedRequest);
          this.setState({
            isLoading: false,
          })
        })
      })

  }

  componentDidMount() {
    web3.eth.getBlockNumber()
      .then(data => {
        this.setState({
          lastBlock: data,
        }, () => {
          this.getLastRequests(50000);
        })
      });
  }

  render() {
    const { requests } = this.props;
    // const arr = Object.assign([], requests);
    // arr.reverse();
    console.log('jol', this.state, requests);

    return (
      <RequestTableWrapper>
        <RequestTable>
          <RequestTableHead>
            <RequestTableHeadRow>
              {this.tableHeaders}
            </RequestTableHeadRow>
          </RequestTableHead>
          <RequestTableBody>
            {
              (!this.state.isLoading) ?
                Object.values(requests).map((request, index) => (
                  <Request labels={this.tableHeaders} isOdd={Boolean(index % 2)} key={index} {...request} />
                ))
                :
                <FetchingDataLoader>
                  Fetching data from the last 50 000 blocks...
              </FetchingDataLoader>
            }
          </RequestTableBody>
        </RequestTable>
      </RequestTableWrapper>
    );
  }
}

export default RequestList;
