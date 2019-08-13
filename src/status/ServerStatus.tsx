import React, { PureComponent } from 'react';
import { getServerStatus } from '../api/serverApi';
import { StatusIndicator } from './components/StatusIndicator';
import { StatusIndicatorContainer } from './components/StatusIndicatorContainer';
import { StatusIndicatorTitle } from './components/StatusIndicatorTitle';

export type Status = 'alive' | 'down';

export interface State {
  status: Status;
}

class ServerStatus extends PureComponent<{}, State> {
  state: State = {
    status: 'down',
  };
  private interval: number;

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
    return (
      <StatusIndicatorContainer>
        <StatusIndicatorTitle>Server status:</StatusIndicatorTitle>
        <StatusIndicator {...this.state}></StatusIndicator>
      </StatusIndicatorContainer>
    );
  }
}

export default ServerStatus;
