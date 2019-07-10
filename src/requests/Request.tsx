import React, { PureComponent } from 'react';

import { RequestTableCell, RequestTableRow, Loader } from './components';
import { utils } from 'ethers';


export interface RequestProps {
  id: string;
  errorCode?: utils.BigNumber;
  value: string;
  validFrom: Date;
  url: string;
}

class Request extends PureComponent<RequestProps> {

  codeMapper(code: string): string {
    if (code.length === 4) {
      switch (code) {
        case '1001':
          return 'INVALID_CONTENT_TYPE';
        case '4000':
          return 'INVALID_SELECTOR_DATA';
        case '4004':
          return 'NO_MATCHING_ELEMENTS_FOUND';
        case '5000':
          return 'INTERNAL_SERVER_ERROR';
        default:
          return 'OK';
      }
    } else if (code.length === 3) {
      return `HTTP ERROR ${code}`;
    }
    return 'OK';
  };

  render() {
    const {
      id, url, validFrom, value, errorCode,
    } = this.props;
    console.log('====================================');
    console.log(errorCode ? errorCode.toHexString() : 'waiting');
    console.log('====================================');

    return (
      <RequestTableRow>
        <RequestTableCell align='center'>{id}</RequestTableCell>
        <RequestTableCell align='center'>{url}</RequestTableCell>
        <RequestTableCell align='center'>{
          validFrom ? validFrom.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
          }) : ''
        }
        </RequestTableCell>
        <RequestTableCell align='center'>{errorCode ? (this.codeMapper(errorCode.toString()) === 'OK' ? value : 'ERROR') : <Loader>Loading...</Loader>}</RequestTableCell>
        <RequestTableCell align='center'>{errorCode ? this.codeMapper(errorCode.toString()) : <Loader>Loading...</Loader>}</RequestTableCell>
      </RequestTableRow>
    );
  }
}

export default Request;
