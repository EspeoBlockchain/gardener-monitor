import React from 'react';
import logo from './logo.svg';
import './App.css';
import RequestList from './requests/RequestList';
import ServerStatus from './status/ServerStatus';

const App = () => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Oracle Monitor</h1>
    </header>

    <ServerStatus />
    <RequestList />
  </div>
);

export default App;
