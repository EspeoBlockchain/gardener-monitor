import React, { Component } from "react";

import Request from "./Request";
import web3 from "../utils/createAndUnlockWeb3";
import oracleAbi from "../abi/oracle.abi";
import convertUnixToDate from "../utils/convertUnixToDate";

interface State {
  requests: { [key: string]: any };
}

class RequestList extends Component<{}, State> {
  state = {
    requests: {} as { [key: string]: any },
  };
  constructor(props: any) {
    super(props);

    const oracleContract = new web3.eth.Contract(
      oracleAbi as any,
      process.env.REACT_APP_ORACLE_ADDRESS
    );

    oracleContract.events.allEvents().on("data", (event: any) => {
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
      // @ts-ignore
      <table border="1" align="center">
        <tbody>
          <tr>
            <th>ID</th>
            <th>CALL</th>
            <th>VALID FROM</th>
            <th>VALUE</th>
            <th>ERROR</th>
          </tr>
          {Object.values(requests).map((request: any) => (
            <Request key={request.id} {...request} />
          ))}
        </tbody>
      </table>
    );
  }
}

export default RequestList;
