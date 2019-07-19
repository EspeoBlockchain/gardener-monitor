import React, { PureComponent } from 'react';

import { RequestTableCell, RequestTableRow, RequestLabel, RequestContent, Loader } from './components';
import { utils } from 'ethers';
import { Labels } from './namespace';

export interface RequestProps {
  id: string;
  errorCode?: utils.BigNumber;
  value: string;
  validFrom: Date;
  url: string;
  isOdd: boolean;
  labels: string[];
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
      id, url, validFrom, value, errorCode, isOdd,
    } = this.props;

    return (
      <RequestTableRow isOdd={isOdd}>
        <RequestTableCell>
          <RequestLabel>{Labels.id}</RequestLabel>
          <RequestContent>
            {id}
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.call}</RequestLabel>
          <RequestContent>
            {url}
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.valid}</RequestLabel>
          <RequestContent>
            {
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
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.value}</RequestLabel>
          <RequestContent>
            {
              errorCode ?
                (this.codeMapper(errorCode.toString()) === 'OK' ? value : 'ERROR')
                :
                <Loader>Loading...</Loader>
            }
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.status}</RequestLabel>
          <RequestContent>
            {
              errorCode ? this.codeMapper(errorCode.toString()) : <Loader>Loading...</Loader>
            }
          </RequestContent>
        </RequestTableCell>
      </RequestTableRow>
    );
  }
}

export default Request;
