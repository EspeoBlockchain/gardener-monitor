import Web3 from 'web3';

const localProvider = new Web3.providers.WebsocketProvider(process.env.REACT_APP_NODE_URL);
const web3 = new Web3(localProvider);

export default web3;
