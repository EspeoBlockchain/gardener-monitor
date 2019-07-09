import React, { PureComponent } from 'react';
import { utils } from 'ethers';

import { RequestTableRow, RequestTableCell, RequestGrid } from './components';

export interface RequestProps {
  id: string;
  errorCode?: utils.BigNumber;
  value: string;
  validFrom: Date;
  url: string;
}

class Request extends PureComponent<RequestProps> {

  // get requestEntries(): JSX.Element[] {
  //   const {
  //     id, url, validFrom, value, errorCode,
  //   } = this.props;

  //   return [id, url, validFrom ? validFrom.toString() : '', value, errorCode ? errorCode.toHexString() : '']
  //     .map((entry, index) => (
  //       <RequestTableCell key={`${entry}${index}`}>{entry}</RequestTableCell>
  //     ));
  // }

  render() {
    const {
      id, url, validFrom, value, errorCode
    } = this.props;

    return (
      <RequestTableRow>
        <RequestTableCell align="center">{id}</RequestTableCell>
        <RequestTableCell align="center">{url}</RequestTableCell>
        <RequestTableCell align="center">{
          validFrom ? validFrom.toLocaleDateString("en-US", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit"
          }) : ''
        }
        </RequestTableCell>
        <RequestTableCell align="center">{value}</RequestTableCell>
        <RequestTableCell align="center">{errorCode ? errorCode.toHexString() : ''}</RequestTableCell>
      </RequestTableRow>
    );
  }
}

export default Request;
