import Web3 from 'web3';

let web3: Web3;

if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    try {
        const provider = window.ethereum || window.web3.currentProvider;
        web3 = new Web3(provider);
        window.ethereum.enable().then(([defaultAccount]: string[]) => {
            web3.eth.defaultAccount = defaultAccount;
        });
    } catch (error) {
        console.error(error);
    }
} else {
    try {
        const localProvider = new Web3.providers.WebsocketProvider(process.env.REACT_APP_NODE_URL);
        web3 = new Web3(localProvider);
    } catch (error) {
        console.error(error);
    }
}

export default web3;
