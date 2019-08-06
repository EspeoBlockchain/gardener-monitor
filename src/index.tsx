import React from 'react';
import ReactDOM from 'react-dom';

import Web3 from 'web3';
import { CustomProvider } from 'web3-providers';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

declare interface MetamaskWeb3 extends CustomProvider {
    enable: () => Promise<string[]>;
}

declare global {
    interface Window {
        ethereum: MetamaskWeb3;
        web3: Web3;
    }
}
