import React from 'react';
import ReactDOM from 'react-dom';

import Web3 from 'web3';
import { CustomProvider } from 'web3-providers';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

declare interface MetamaskWeb3 extends CustomProvider {
    enable: () => Promise<string[]>;
}

declare global {
    interface Window {
        ethereum: MetamaskWeb3;
        web3: Web3;
    }
}
