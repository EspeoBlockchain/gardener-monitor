import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { PureComponent } from 'react';
import { RequestStatus } from '../domain';

import { etherScanUrl } from '../config';
import { Labels } from '../domain/namespace';
import { LinkWrapper } from '../utils/LinkWrapper';
import { Loader, RequestContent, RequestLabel, RequestTableCell, RequestTableRow } from './components';

enum ErrorCodes {
  INVALID_URL = '1000',
  INVALID_CONTENT_TYPE = '1001',
  INVALID_SELECTOR_DATA = '4000',
  NO_MATCHING_ELEMENTS_FOUND = '4004',
  INTERNAL_SERVER_ERROR = '5000',
  OK = '0',
}

class Request extends PureComponent<RequestStatus> {

  codeMapper(code: string): string {
    switch (code) {
      case ErrorCodes.INVALID_URL:
        return 'INVALID_URL';
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
  }

  render() {
    const {
      id, url, validFrom, value, errorCode, isOdd, hash,
    } = this.props;
    return (
      <RequestTableRow isOdd={isOdd}>
        <RequestTableCell>
          <RequestLabel>
            {Labels.id}
          </RequestLabel>
          <RequestContent>
            {id ? id : <Loader>Mining, it can take a while...</Loader>}
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.call}</RequestLabel>
          <RequestContent>
            {/* {url ? url : <Loader>Loading...</Loader>} */}
            {url ? url : <Loader>Mining, it can take a while...</Loader>}
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.valid}</RequestLabel>
          <RequestContent>
            {
              validFrom ?
                validFrom.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit',
                })
                :
                <Loader>Loading...</Loader>
            }
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.value}</RequestLabel>
          <RequestContent>
            {
              errorCode ?
                this.codeMapper(errorCode.toString()) === 'OK' ? value : 'ERROR'
                :
                <Loader>Mining, it can take a while...</Loader>
            }
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.status}</RequestLabel>
          <RequestContent>
            {
              errorCode ?
                this.codeMapper(errorCode.toString())
                :
                <Loader>Mining, it can take a while...</Loader>
            }
          </RequestContent>
        </RequestTableCell>
        <RequestTableCell>
          <RequestLabel>{Labels.value}</RequestLabel>
          <RequestContent>
            {
              hash ?
                <LinkWrapper
                  href={etherScanUrl + hash}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <FontAwesomeIcon
                    icon={faExternalLinkAlt}
                  />
                </LinkWrapper>
                :
                <Loader>Mining, it can take a while...</Loader>
            }
          </RequestContent>
        </RequestTableCell>
      </RequestTableRow>
    );
  }
}

export default Request;
