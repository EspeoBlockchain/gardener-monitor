import * as Web3 from 'web3';

let web3: any;
// @ts-ignore
if (typeof window.ethereum !== 'undefined' || (typeof window.web3 !== 'undefined')) {
    try {
        // @ts-ignore
        const provider = window.ethereum || window.web3.currentProvider;
        // @ts-ignore
        web3 = new Web3(provider);
        // @ts-ignore
        window.ethereum.enable().then((account: any) => {
            const defaultAccount = account[0];
            web3.eth.defaultAccount = defaultAccount;
        });
    } catch (error) {
        console.error(error);
    }
} else {
    try {
        // @ts-ignore
        const localProvider = new Web3.providers.WebsocketProvider(process.env.REACT_APP_NODE_URL);
        // @ts-ignore
        web3 = new Web3(localProvider);
    } catch (error) {
        console.error(error);
    }
}

export default web3;
