import styled from 'styled-components';

export const ModalWrapper = styled.div`
    font-family: 'Montserrat', sans-serif;
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: ${props => props.theme.colors.gardenerBackgroundColor};
    opacity: 50%;
    padding: 50px;
`;
