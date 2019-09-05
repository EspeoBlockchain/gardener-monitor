import React, { PureComponent } from 'react';
import * as web3Contract from 'web3-eth-contract';

import oracleAbi from '../abi/oracle.abi';
import { Labels, RequestObject } from '../domain';
import convertUnixToDate from '../utils/convertUnixToDate';
import web3 from '../utils/createAndUnlockWeb3';
import {
  FetchingDataLoader,
  RequestTable,
  RequestTableBody,
  RequestTableHead,
  RequestTableHeadCell,
  RequestTableHeadRow,
  RequestTableWrapper,
} from './components';
import Request from './Request';

interface Props {
  requests: {
    [key: string]: RequestObject,
  };
  requestsArray: RequestObject[];
  isLoading: boolean;
  handleUpdateRequest: (requestObject: RequestObject) => void;
  paginate: (pageNumber: number) => void;
  changeLoader: (state: boolean) => void;
}

interface State {
  lastBlock: number;
  countOfBlocks: number;
}

class RequestList extends PureComponent<Props, State> {
  public oracleContract: web3Contract.Contract;

  get tableHeaders(): JSX.Element[] {
    return Object.values(Labels).map((label) => (
      <RequestTableHeadCell key={label}>{label}</RequestTableHeadCell>
    ));
  }

  state = {
    lastBlock: 0,
    countOfBlocks: 1000,
  };

  constructor(props: Props) {
    super(props);
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
          const { id, validFrom, url } = event.returnValues;
          const { transactionHash } = event;
          delete Object.assign(requests, { [id]: requests[transactionHash] })[transactionHash];
          const updatedRequest = {
            ...requests[id],
            id,
            url,
            hash: transactionHash,
            validFrom: validFrom ? convertUnixToDate(validFrom) : new Date(),
          };
          this.updateRequest(updatedRequest);
          this.props.changeLoader(false);
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
          this.updateRequest(updatedRequest);
        }
      })
      .on('error', console.error);
  }

  public updateRequest = (updatedState: RequestObject) => {
    this.props.handleUpdateRequest(updatedState);
  }

  public showEvents = (events: web3Contract.EventData[]) => {
    setTimeout(() => {
      events.forEach((event) => {
        if (event.event === 'DataRequested') {
          const { id, validFrom, url } = event.returnValues;
          const { transactionHash } = event;
          const newRequest = {
            id,
            validFrom: validFrom ? convertUnixToDate(validFrom) : new Date(),
            url,
            hash: transactionHash,
            errorCode: null,
            value: '',
            isOdd: false,
            labels: null,
            transactionHash: '',
          };
          this.updateRequest(newRequest);
        }

        if (event.event === 'RequestFulfilled') {
          const { requests } = this.props;
          const { id, errorCode, value } = event.returnValues;
          if (!requests[id]) {
            return;
          }
          const updatedRequest = { ...requests[id], value, errorCode };
          this.updateRequest(updatedRequest);
        }
        this.props.changeLoader(false);
      });
      this.props.changeLoader(false);
    }, 5000);
  }

  public getPastRequests = (numOfBlocks: number) => {
    const eventsCount = this.state.lastBlock - numOfBlocks;
    this.oracleContract.getPastEvents('allEvents',
      {
        fromBlock: eventsCount,
        toBlock: 'latest',
      })
      .then((events: web3Contract.EventData[]) => {
        this.showEvents(events);
      });
  }

  componentDidMount() {
    web3.eth.getBlockNumber()
      .then(data => {
        this.setState({
          lastBlock: data,
        }, () => {
          this.getPastRequests(this.state.countOfBlocks);
          this.props.paginate(1);
        });
      })
      .catch(error => {
        console.error(error);
      });
  }

  render() {
    const { requestsArray } = this.props;
    return (
      (!this.props.isLoading) ?
        <RequestTableWrapper>
          <RequestTable>
            <RequestTableHead>
              <RequestTableHeadRow>
                {this.tableHeaders}
              </RequestTableHeadRow>
            </RequestTableHead>
            <RequestTableBody>
              {Object.values(requestsArray).map((request, index) => (
                <Request labels={this.tableHeaders} isOdd={Boolean(index % 2)} key={index} {...request} />
              ))}
            </RequestTableBody>
          </RequestTable>
        </RequestTableWrapper >
        :
        <RequestTableWrapper>
          <RequestTable>
            <RequestTableHead>
              <RequestTableHeadRow>
                {this.tableHeaders}
              </RequestTableHeadRow>
            </RequestTableHead>
          </RequestTable>
          <FetchingDataLoader>
            {`Fetching data from the last ${this.state.countOfBlocks} blocks...`}
          </FetchingDataLoader>
        </RequestTableWrapper >
    );
  }
}

export default RequestList;
