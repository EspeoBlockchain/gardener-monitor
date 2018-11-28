import React from 'react';
import Request from './Request';
import web3 from '../utils/createAndUnlockWeb3';
import oracleAbi from '../abi/oracle.abi';
import convertUnixToDate from '../utils/convertUnixToDate';


class RequestList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: {},
    };


    const oracleContract = new web3.eth.Contract(
      oracleAbi,
      process.env.REACT_APP_ORACLE_ADDRESS,
    );

    oracleContract.events.allEvents()
      .on('data', (event) => {
        if (['DataRequested', 'DelayedDataRequested'].includes(event.event)) {
          const { requests } = this.state;
          const { id, url, validFrom } = event.returnValues;

          this.setState({
            requests: Object.assign({},
              requests,
              {
                [id]: {
                  id,
                  url,
                  validFrom: validFrom ? convertUnixToDate(validFrom) : new Date(),
                },
              }),
          });
        }

        if (event.event === 'RequestFulfilled') {
          const { requests } = this.state;
          const { id, value, errorCode } = event.returnValues;

          this.setState({
            requests: Object.assign({},
              requests,
              {
                [id]: Object.assign(
                  {},
                  requests[id],
                  {
                    value,
                    errorCode,
                  },
                ),
              }),
          });
        }
      });
  }

  render() {
    const { requests } = this.state;

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
          { Object.entries(requests)
            .map(([, request]) => <Request request={request} />)}
        </tbody>
      </table>
    );
  }
}

export default RequestList;
