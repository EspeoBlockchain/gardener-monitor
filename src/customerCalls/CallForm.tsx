import React, { PureComponent } from 'react'
import { CallFormButton, CallFormInput, CallFormWrapper } from './components';
import web3 from "../utils/createAndUnlockWeb3";
import usingOracleAbi from "../abi/usingOracle.abi";

type State = { query: string };
type InputEvent = React.ChangeEvent<HTMLInputElement>;

export const usingOracleContract = new web3.eth.Contract(
    usingOracleAbi,
    process.env.REACT_APP_USING_ORACLE_ADDRESS
);

export default class CallForm extends PureComponent<State> {
    static defaultProps = { query: '' };
    state: State = {
        query: '',
    }

    handleChange = (e: InputEvent): void => {
        e.preventDefault();
        this.setState({
            query: e.target.value,
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
                <CallFormInput value={this.state.query} onChange={this.handleChange} >
                </CallFormInput>
                <CallFormButton onClick={this.handleSubmit} >Call</CallFormButton>
            </CallFormWrapper>
        )
    }
}
