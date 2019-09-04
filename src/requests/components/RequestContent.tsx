import styled from 'styled-components';

export const RequestContent = styled.div`
    box-sizing: border-box;
    display: block;
    padding: ${props => props.theme.appHeader.padding}px;
    height: 100%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        width: 70%;
    }
`;
