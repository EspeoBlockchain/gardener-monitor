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

enum ErrorCodes {
  INVALID_CONTENT_TYPE = '1001',
  INVALID_SELECTOR_DATA = '4000',
  NO_MATCHING_ELEMENTS_FOUND = '4004',
  INTERNAL_SERVER_ERROR = '5000',
  OK = '0',
}

class Request extends PureComponent<RequestProps> {

  codeMapper(code: string): string {
    switch (code) {
      case ErrorCodes.INVALID_CONTENT_TYPE:
        return 'INVALID_CONTENT_TYPE';
      case ErrorCodes.INVALID_SELECTOR_DATA:
        return 'INVALID_SELECTOR_DATA';
      case ErrorCodes.NO_MATCHING_ELEMENTS_FOUND:
        return 'NO_MATCHING_ELEMENTS_FOUND';
      case ErrorCodes.INTERNAL_SERVER_ERROR:
        return 'INTERNAL_SERVER_ERROR';
      case ErrorCodes.OK:
        return 'OK';
      default:
        return `HTTP ERROR ${code}`;
    }
  };

  render() {
    const {
      id, url, validFrom, value, errorCode,
    } = this.props;

    return (
      <RequestTableRow>
        <RequestTableCell>{id}</RequestTableCell>
        <RequestTableCell>{url}</RequestTableCell>
        <RequestTableCell>{
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
        <RequestTableCell>
          {
            errorCode ?
              (this.codeMapper(errorCode.toString()) === 'OK' ? value : 'ERROR')
              :
              <Loader>Loading...</Loader>
          }
        </RequestTableCell>
        <RequestTableCell>{errorCode ? this.codeMapper(errorCode.toString()) : <Loader>Loading...</Loader>}</RequestTableCell>
      </RequestTableRow>
    );
  }
}

export default Request;
