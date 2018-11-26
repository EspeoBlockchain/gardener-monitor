import { Component } from 'react';
import { checkServerStatus } from '../api/serverApi';

class ServerStatus extends Component {
  constructor(props) {
    super(props);

    this.state = {
      status: 'down',
    };
  }

  checkStatus() {
    checkServerStatus()
      .then(() => this.setState({ status: 'alive' }))
      .catch(() => this.setState({ status: 'down' }));
  }

  async componentDidMount() {
    await this.checkStatus();
    this.interval = setInterval(() => this.checkStatus(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    return (
      <div>
Server status:
        <p style={{ color: this.state.status === 'alive' ? 'green' : 'red' }}>{this.state.status}</p>
      </div>
    );
  }
}

export default ServerStatus;
