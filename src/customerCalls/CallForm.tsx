import React, { PureComponent } from 'react'
import { CallFormButton, CallFormInput } from './components';

export default class CallForm extends PureComponent {
    render() {
        return (
            <div>
                <CallFormInput></CallFormInput>
                <CallFormButton></CallFormButton>
            </div>
        )
    }
}
