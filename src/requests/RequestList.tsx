import React, { PureComponent } from "react";
import * as web3Contract from 'web3-eth-contract';

import { RequestTableWrapper, RequestTable, RequestTableBody, RequestTableHead, RequestTableHeadRow, RequestTableHeadCell } from './components';
import Request, { RequestProps } from "./Request";
import web3 from "../utils/createAndUnlockWeb3";
import oracleAbi from "../abi/oracle.abi";
import convertUnixToDate from "../utils/convertUnixToDate";
import { Labels } from "./namespace";

interface State {
  requests: { [key: string]: RequestProps };
}

class RequestList extends PureComponent<{}, State> {
  state = {
    requests: {} as { [key: string]: RequestProps },
  };

  get tableHeaders(): JSX.Element[] {
    return Object.values(Labels).map((label) => (
      <RequestTableHeadCell key={label}>{label}</RequestTableHeadCell>
    ))
  }

  constructor(props: {}) {
    super(props);

    const oracleContract = new web3.eth.Contract(
      oracleAbi,
      process.env.REACT_APP_ORACLE_ADDRESS
    );

    oracleContract.events.allEvents().on("data", (event: web3Contract.EventData) => {
      if (["DataRequested", "DelayedDataRequested"].includes(event.event)) {
        const { requests } = this.state;
        const { id, url, validFrom } = event.returnValues;
        console.log('here');
        console.log(event);
        console.log('here');
        const newRequest = {
          id,
          url,
          validFrom: validFrom ? convertUnixToDate(validFrom) : new Date()
        };

        this.setState({
          requests: {
            ...requests,
            [newRequest.id]: newRequest
          }
        });
      }

      if (event.event === "RequestFulfilled") {
        const { requests } = this.state;
        const { id, value, errorCode } = event.returnValues;

        const updatedRequest = { ...requests[id], value, errorCode };

        this.setState({
          requests: {
            ...requests,
            [updatedRequest.id]: updatedRequest
          }
        });
      }
    });
  }

  render() {
    const { requests } = this.state;
    
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
              Object.values(requests).map((request, index) => (
                <Request labels={this.tableHeaders} isOdd={index % 2} key={request.id} {...request} />
              ))
            }
          </RequestTableBody>
        </RequestTable>
      </RequestTableWrapper>
    );
  }
}

export default RequestList;
