/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

type Props = Partial<{
  id: string;
  errorCode: string;
  value: string;
  validFrom: string;
  url: string;
}>;

class Request extends PureComponent<Props> {

  static propTypes = {
    id: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    validFrom: PropTypes.instanceOf(Date).isRequired,
    value: PropTypes.string,
    errorCode: PropTypes.string,
  };

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
