import React from 'react';
import Request from './Request';
import web3 from '../utils/createAndUnlockWeb3';
import config from '../config';


class RequestList extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      requests: {}
    }


    const oracleContract = new web3.eth.Contract(
      config.contracts.oracle.abi,
      config.contracts.oracle.address,
    );

    oracleContract.events.allEvents()
      .on('data', (event) => {
        if(['DataRequested', 'DelayedDataRequested'].includes(event.event)) {
          this.setState({
            requests: Object.assign({},
              this.state.requests,
              {
                [event.returnValues.id]: {
                    id: event.returnValues.id,
                    url: event.returnValues.url,
                    validFrom: event.returnValues.validFrom ? new Date(event.returnValues.validFrom * 1000) : new Date()
                }
              }
            )
          })
        }

        if(event.event === 'RequestFulfilled') {
          this.setState({
            requests: Object.assign({},
              this.state.requests,
              {
                [event.returnValues.id]: Object.assign(
                  {},
                  this.state.requests[event.returnValues.id],
                  {
                    value: event.returnValues.value,
                    errorCode: event.returnValues.errorCode
                  }
                )
              }
            )
          })
        }
      })
  }


  render() {
    return (
      <table border="1" align="center">
        <tbody>
        <tr>
          <th>ID</th>
          <th>CALL</th>
          <th>VALID FROM</th>
          <th>VALUE</th>
          <th>ERROR</th>
        </tr>
        { Object.entries(this.state.requests).map(([, request]) => <Request request={request} />) }
        </tbody>
      </table>
    );
  }
}

export default RequestList;
