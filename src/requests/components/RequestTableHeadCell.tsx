import styled from 'styled-components';

export const RequestTableHeadCell = styled.th`
    box-sizing: border-box;
    text-align: center;
    padding: ${props => props.theme.appHeader.padding}px;
    width: 16.7%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: none;
    }
`;
