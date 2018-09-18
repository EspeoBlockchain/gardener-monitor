import Web3 from 'web3';
import config from '../config';

const localProvider = new Web3.providers.WebsocketProvider(config.provider.url);
const web3 = new Web3(localProvider);

export default web3;
