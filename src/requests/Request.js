import React from 'react';


class Request extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.request.id}</td>
        <td>{this.props.request.url}</td>
        <td>{this.props.request.validFrom.toString()}</td>
        <td>{this.props.request.value}</td>
        <td>{this.props.request.errorCode}</td>
      </tr>
    );
  }
}

export default Request;
