import React from 'react';
import { Button } from '../utils/Button';
import { ModalContent, ModalFooter, ModalWindow, ModalWrapper } from './components';

interface Props {
    show: boolean;
    onClose: any;
}

class Modal extends React.Component<Props> {
    render() {
        if (!this.props.show) {
            return null;
        }

        return (
            <ModalWrapper>
                <ModalWindow>
                    <ModalContent>
                        {this.props.children}
                    </ModalContent>
                    <ModalFooter>
                        <Button onClick={this.props.onClose}>Close</Button>
                    </ModalFooter>
                </ModalWindow>
            </ModalWrapper>
        );
    }
}

export default Modal;
