import React from 'react';
import PropTypes from 'prop-types';


const Request = ({ request }) => {
  const {
    id, url, validFrom, value, errorCode,
  } = request;

  return (
    <tr>
      <td>{id}</td>
      <td>{url}</td>
      <td>{validFrom.toString()}</td>
      <td>{value}</td>
      <td>{errorCode}</td>
    </tr>
  );
};

Request.propTypes = {
  request: PropTypes.shape({
    id: PropTypes.string,
    url: PropTypes.string,
    validFrom: PropTypes.number,
    value: PropTypes.string,
    errorCode: PropTypes.number,
  }).isRequired,
};

export default Request;
