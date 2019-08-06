import React from 'react';
import ReactDOM from 'react-dom';

import Web3 from 'web3';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

declare global {
    interface Window {
        ethereum: any;
        web3: Web3;
    }
}
