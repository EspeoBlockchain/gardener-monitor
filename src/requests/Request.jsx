import React from 'react';


const Request = (props) => {
  return (
    <tr>
      <td>{props.request.id}</td>
      <td>{props.request.url}</td>
      <td>{props.request.validFrom.toString()}</td>
      <td>{props.request.value}</td>
      <td>{props.request.errorCode}</td>
    </tr>
  );
}

export default Request;
