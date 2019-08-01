import React, { PureComponent } from 'react';
import usingOracleAbi from '../abi/usingOracle.abi';
import { bitcoinPriceUrl, pressure, usdPriceUrl } from '../config';
import web3 from '../utils/createAndUnlockWeb3';
import { CallFormDataList, CallFormInput, CallFormOption, CallFormWrapper } from './components';
import { Button } from '../utils/Button';

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

export default class CallForm extends PureComponent<Props, State> {
    static defaultProps = { query: '' };
    state: State = {
        query: '',
        networkType: '',
    };
    componentDidMount() {
        web3.eth.net.getNetworkType()
            .then((result: any) => {
                this.setState({
                    networkType: result
                })
            });
    }
    handleChange = (event: InputEvent | SelectEvent): void => {
        event.preventDefault();
        this.setState({
            query: event.target.value,
        });
    }
    // @ts-ignore
    passHashAndUrlToProps = (hash, url) => {
        this.props.handleTransactionHashAndUrl(hash, url);
    }

    handleSubmit = () => {
        if (this.state.networkType !== process.env.REACT_APP_NETWORK_TYPE) {
            const message = 'Please use Ropsten test network.';
            this.props.handleModal(true, message);
            return;
        }
        if (this.state.query === '') {
            const message = 'Please put a valid url.';
            this.props.handleModal(true, message);
            return;
        }
        if (usingOracleContract.defaultAccount === undefined) {
            const message = (
                <>
                    <h1>Please use MetaMask</h1>
                    <a href='https://metamask.io' target='_blank'>MetaMask</a>
                </>
            )
            this.props.handleModal(true, message);
            return;
        }
        try {
            const { query } = this.state;
            usingOracleContract.methods.request(query)
                .send()
                // @ts-ignore
                .once('transactionHash', (hash) => {
                    // @ts-ignore
                    this.passHashAndUrlToProps(hash, query);
                })
                .on('error', (x: any) => {
                    console.log(x.message)
                });
            this.setState({
                query: '',
            });
        }
        catch (error) { console.log('error', error) }
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
