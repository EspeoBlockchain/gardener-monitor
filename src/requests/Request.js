/* eslint-disable react/require-default-props */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';


class Request extends PureComponent {
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

Request.propTypes = {
  id: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  validFrom: PropTypes.instanceOf(Date).isRequired,
  value: PropTypes.string,
  errorCode: PropTypes.number,
};

export default Request;
