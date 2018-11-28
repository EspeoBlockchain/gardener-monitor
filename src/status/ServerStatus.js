import React, { Component } from 'react';
import checkServerStatus from '../api/serverApi';

class ServerStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'down',
    };
  }

  async componentDidMount() {
    await this.checkStatus();
    this.interval = setInterval(() => this.checkStatus(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  checkStatus() {
    checkServerStatus()
      .then(() => this.setState({ status: 'alive' }))
      .catch(() => this.setState({ status: 'down' }));
  }

  render() {
    const { status } = this.state;

    return (
      <div>
Server status:
        <p style={{ color: status === 'alive' ? 'green' : 'red' }}>{status}</p>
      </div>
    );
  }
}

export default ServerStatus;
