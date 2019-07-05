import React, { PureComponent } from 'react';
import { utils } from 'ethers';

import { RequestTableTr, RequestTableTd } from './components';

export interface RequestProps {
  id: string;
  errorCode?: utils.BigNumber;
  value: string;
  validFrom: Date;
  url: string;
}

class Request extends PureComponent<RequestProps> {

  get requestEntries(): JSX.Element[] {
    const {
      id, url, validFrom, value, errorCode,
    } = this.props;

    return [id, url, validFrom.toString(), value, errorCode ? errorCode.toHexString() : '']
      .map((entry, index) => (<RequestTableTd key={`${entry}${index}`}>{entry}</RequestTableTd>));
  }

  render() {
    return (
      <RequestTableTr>
        {this.requestEntries}
      </RequestTableTr>
    );
  }
}

export default Request;
