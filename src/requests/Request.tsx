import React, { PureComponent } from 'react';

import { RequestTableCell, RequestTableRow, Loader } from './components';
import { BigNumber } from 'ethers/utils';
import { utils } from 'ethers';

import { log } from 'util';

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

  // "INVALID_URL"] = 1000] = "INVALID_URL";
  //   ErrorCode[ErrorCode["INVALID_CONTENT_TYPE"] = 1001] = "INVALID_CONTENT_TYPE";
  //   ErrorCode[ErrorCode["INVALID_SELECTOR_DATA"] = 4000] = "INVALID_SELECTOR_DATA";
  //   ErrorCode[ErrorCode["NO_MATCHING_ELEMENTS_FOUND"] = 4004] = "NO_MATCHING_ELEMENTS_FOUND";
  //   ErrorCode[ErrorCode["INTERNAL_SERVER_ERROR"] = 5000] = "INTERNAL_SERVER_ERROR";
  codeMapper(code: string): string {
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
        <RequestTableCell align='center'>{value ? value : <Loader>Loading...</Loader>}</RequestTableCell>
        <RequestTableCell align='center'>{errorCode ? errorCode.toHexString() : <Loader>Loading...</Loader>}</RequestTableCell>
      </RequestTableRow>
    );
  }
}

export default Request;
