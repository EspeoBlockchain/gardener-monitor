import React, { PureComponent } from "react";
import * as web3Contract from 'web3-eth-contract';

import { RequestPaper, RequestTable, RequestTableBody, RequestTableCell, RequestTableHead, RequestTableRow } from './components';
import Request, { RequestProps } from "./Request";
import web3 from "../utils/createAndUnlockWeb3";
import oracleAbi from "../abi/oracle.abi";
import convertUnixToDate from "../utils/convertUnixToDate";

interface State {
  requests: { [key: string]: RequestProps };
}

class RequestList extends PureComponent<{}, State> {
  state = {
    requests: {} as { [key: string]: RequestProps },
  };

  get tableHeaders(): JSX.Element[] {
    return ["ID", "CALL", "VALID FROM", "VALUE", "STATUS"].map((entry) => (
      <RequestTableCell align="center" key={entry}>{entry}</RequestTableCell>
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
      <RequestPaper>
        <RequestTable>
          <RequestTableHead>
            <RequestTableRow>
              {this.tableHeaders}
            </RequestTableRow>
          </RequestTableHead>
          <RequestTableBody>
            {
              Object.values(requests).map((request: RequestProps) => (
                <Request key={request.id} {...request} />
              ))
            }
          </RequestTableBody>
        </RequestTable>
      </RequestPaper>
    );
  }
}

export default RequestList;
