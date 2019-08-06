import React, { PureComponent } from 'react';
import usingOracleAbi from '../abi/usingOracle.abi';
import { bitcoinPriceUrl, pressure, usdPriceUrl } from '../config';
import { Button } from '../utils/Button';
import web3 from '../utils/createAndUnlockWeb3';
import { CallFormDataList, CallFormInput, CallFormOption, CallFormWrapper } from './components';

interface State {
    query: string;
    networkType: string;
}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

interface Props {
    handleTransactionHashAndUrl: (arg1: string, arg2: string) => void;
    handleModal: (arg1: boolean, arg2: any) => void;
}
export const usingOracleContract = new web3.eth.Contract(
    usingOracleAbi,
    process.env.REACT_APP_USING_ORACLE_ADDRESS,
);

export class CallForm extends PureComponent<Props, State> {
    state: State = {
        query: '',
        networkType: '',
    };
    componentDidMount() {
        web3.eth.net.getNetworkType()
            .then((result: string) => {
                this.setState({
                    ...this.state,
                    networkType: result,
                });
            });
    }
    handleChange = (event: InputEvent | SelectEvent): void => {
        event.preventDefault();
        this.setState({
            query: event.target.value,
        });
    }
    passHashAndUrlToProps = (hash: string, url: string) => {
        this.props.handleTransactionHashAndUrl(hash, url);
    }

    handleSubmit = () => {
        if (typeof usingOracleContract.defaultAccount === 'undefined') {
            const message = (
                <>
                    <h1>Please use MetaMask</h1>
                    <a href='https://metamask.io' target='_blank' rel='noopener noreferrer'>MetaMask</a>
                </>
            );
            this.props.handleModal(true, message);
            return;
        }
        if (this.state.networkType !== process.env.REACT_APP_NETWORK_TYPE) {
            const message = 'Please use Ropsten test network.';
            this.props.handleModal(true, message);
            return;
        }
        if (this.state.query === '') {
            this.props.handleModal(true, 'Please put a valid url.');
            return;
        }

        const { query } = this.state;
        usingOracleContract.methods.request(query)
            .send()
            .once('transactionHash', (hash: string) => {
                this.passHashAndUrlToProps(hash, query);
            })
            .on('error', (error: any) => {
                if (error.toString().includes('User denied transaction signature.')) {
                    this.props.handleModal(true, 'User denied transaction signature.');
                    return;
                }
                if (error.toString().includes('Error: WalletMiddleware - Invalid "from" address.')) {
                    this.props.handleModal(true, 'Error: WalletMiddleware - Invalid "from" address.');
                    return;
                }
                if (error.toString().includes('gas')) {
                    this.props.handleModal(true, 'You are out of gas!');
                    return;
                }
                this.props.handleModal(true, 'Something went wrong, please try again');
                return;
            });
        this.setState({
            query: '',
        });
    }

    render() {
        return (
            <CallFormWrapper>
                <CallFormInput
                    value={this.state.query}
                    onChange={this.handleChange}
                    list='endpoints'
                >
                </CallFormInput>
                <CallFormDataList id='endpoints'>
                    <CallFormOption
                        value={bitcoinPriceUrl}
                    >
                        Bitcoin price in USD
                    </CallFormOption>
                    <CallFormOption
                        value={usdPriceUrl}
                    >
                        EUR price based on USD
                        </CallFormOption>
                    <CallFormOption
                        value={pressure}
                    >
                        Pressure in New York
                    </CallFormOption>
                </CallFormDataList>
                <Button onClick={this.handleSubmit} >Call</Button>
            </CallFormWrapper >
        );
    }
}
