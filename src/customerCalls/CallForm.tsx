import React, { PureComponent } from 'react'
import { CallFormButton, CallFormInput, CallFormWrapper } from './components';

type State = { query: string };
type InputEvent = React.ChangeEvent<HTMLInputElement>;

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
