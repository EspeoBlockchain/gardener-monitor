import styled from 'styled-components';

export const RequestTableHeadCell = styled.th`
    box-sizing: border-box;
    text-align: center;
    padding: 10px;
    width: 16.7%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: none;
    }
`;
