import React, { PureComponent } from 'react'
import { CallFormButton, CallFormInput, CallFormDataList, CallFormWrapper, CallFormOption } from './components';
import web3 from "../utils/createAndUnlockWeb3";
import usingOracleAbi from "../abi/usingOracle.abi";

type State = { query: string };
type InputEvent = React.ChangeEvent<HTMLInputElement>;
type SelectEvent = React.ChangeEvent<HTMLSelectElement>;

export const usingOracleContract = new web3.eth.Contract(
    usingOracleAbi,
    process.env.REACT_APP_USING_ORACLE_ADDRESS
);

export default class CallForm extends PureComponent<State> {
    static defaultProps = { query: '' };
    state: State = {
        query: '',
    }

    handleChange = (event: InputEvent | SelectEvent): void => {
        event.preventDefault();
        this.setState({
            query: event.target.value,
        })
    }

    handleSubmit = () => {
        if (this.state.query === '') {
            alert('put valid url for call')
            return;
        }
        usingOracleContract.methods.request(this.state.query)
            .send();
        this.setState({
            query: '',
        })
    }

    render() {
        return (
            <CallFormWrapper>
                <CallFormInput
                    value={this.state.query}
                    onChange={this.handleChange}
                    list="endpoints"
                ></CallFormInput>
                <CallFormDataList id="endpoints">
                    <CallFormOption
                        value={'json(https://api.coindesk.com/v1/bpi/currentprice.json).bpi.USD.rate_float'}
                    >
                        Bitcoin price in USD
                    </CallFormOption>
                    <CallFormOption
                        value={'json(https://api.exchangeratesapi.io/latest).rates.USD'}
                    >
                        EUR price based on USD
                        </CallFormOption>
                    <CallFormOption
                        value={'json(https://samples.openweathermap.org/data/2.5/weather?id=5128638&appid=b6907d289e10d714a6e88b30761fae22).main.temp'}
                    >
                        Temperature in New York
                    </CallFormOption>
                </CallFormDataList>
                <CallFormButton onClick={this.handleSubmit} >Call</CallFormButton>
            </CallFormWrapper >
        )
    }
}
