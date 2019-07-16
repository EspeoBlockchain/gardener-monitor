import styled from 'styled-components';

export const RequestTableCell = styled.td`
    box-sizing: border-box;
    text-align: center;
    padding: 8px;
    width: 20%;
    word-wrap: break-word;
    font-size: ${props => props.theme.fontSizes.medium};
`;
