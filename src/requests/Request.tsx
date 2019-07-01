import React, { PureComponent } from 'react';

interface Props {
  id: string;
  errorCode: string;
  value: string;
  validFrom: Date;
  url: string;
};

class Request extends PureComponent<Props> {

  render() {
    const {
      id, url, validFrom, value, errorCode,
    } = this.props;

    return (
      <tr>
        <td>{id}</td>
        <td>{url}</td>
        <td>{validFrom.toString()}</td>
        <td>{value}</td>
        <td>{errorCode}</td>
      </tr>
    );
  }
}

export default Request;
