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
        if(event.event === 'DataRequested') {
          this.setState({ requests: Object.assign({}, this.state.requests, {[event.returnValues.id]: {id: event.returnValues.id, url: event.returnValues.url}})})
        }

        if(event.event === 'RequestFulfilled') {
          this.setState({ requests: Object.assign({}, this.state.requests, {[event.returnValues.id]: Object.assign({}, this.state.requests[event.returnValues.id], {value: event.returnValues.value})})})
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
          <th>VALUE</th>
        </tr>
        { Object.entries(this.state.requests).map(([, request]) => <Request id={request.id} call={request.url} value={request.value}/>)}
        </tbody>
      </table>
    );
  }
}

export default RequestList;
