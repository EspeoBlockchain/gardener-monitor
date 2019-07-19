import React, { PureComponent } from 'react'
import { CallFormButton, CallFormInput, CallFormWrapper  } from './components';

export default class CallForm extends PureComponent {
    render() {
        return (
            <CallFormWrapper>
                <CallFormInput></CallFormInput>
                <CallFormButton>Call</CallFormButton>
            </CallFormWrapper>
        )
    }
}
