import React, { PureComponent } from 'react';
import usingOracleAbi from '../abi/usingOracle.abi';
import { bitcoinPriceUrl, pressure, usdPriceUrl } from '../config';
import web3 from '../utils/createAndUnlockWeb3';
import { CallFormButton, CallFormDataList, CallFormInput, CallFormOption, CallFormWrapper } from './components';

interface State {
    query: string;
    networkType: string;
}
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

interface Props {
    handleTransactionHash: (arg: string) => void;
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
    passHashToProps = (hash) => {
        this.props.handleTransactionHash(hash);
    }

    handleSubmit = () => {
        if (this.state.networkType !== process.env.REACT_APP_NETWORK_TYPE) {
            alert('please use Ropsten Test Network');
            return;
        }
        if (this.state.query === '') {
            alert('put valid url for call');
            return;
        }
        if (usingOracleContract.defaultAccount === undefined) {
            alert();
            return;
        }
        try {
            usingOracleContract.methods.request(this.state.query)
                .send()
                // @ts-ignore
                // .on('error', (error: any) => {
                //     console.log('gites', error.message);
                // })
                // @ts-ignore
                .once('transactionHash', (hash) => {
                    // @ts-ignore
                    this.passHashToProps(hash);
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
        console.log(this.state);

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
                <CallFormButton onClick={this.handleSubmit} >Call</CallFormButton>
            </CallFormWrapper >
        );
    }
}
