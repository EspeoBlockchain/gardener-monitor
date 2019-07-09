import React, { PureComponent } from 'react';
import { getServerStatus } from '../api/serverApi';
import { StatusIndicator } from './components/StatusIndicator';
import { StatusIndicatorContainer } from './components/StatusIndicatorContainer';
import { StatusIndicatorTitle } from './components/StatusIndicatorTitle';

export type Status = 'alive' | 'down';

export interface State {
  status: Status
}

class ServerStatus extends PureComponent<{}, State> {
  private interval: number;
  state: State = {
    status: 'down'
  };

  async componentDidMount() {
    await this.checkStatus();
    this.interval = window.setInterval(() => this.checkStatus(), 5000);
  }

  componentWillUnmount() {
    window.clearInterval(this.interval);
  }

  checkStatus() {
    getServerStatus()
      .then(() => this.setState({ status: 'alive' }))
      .catch(() => this.setState({ status: 'down' }));
  }

  render() {
    const { status } = this.state;

    return (
      <StatusIndicatorContainer>
        <StatusIndicatorTitle>Server status:</StatusIndicatorTitle>
        <StatusIndicator {...this.state}></StatusIndicator>
      </StatusIndicatorContainer>
    );
  }
}

export default ServerStatus;
