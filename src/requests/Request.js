import React from 'react';


class Request extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.id}</td>
        <td>{this.props.call}</td>
        <td>{this.props.value}</td>
        <td>{this.props.error}</td>
      </tr>
    );
  }
}

export default Request;
