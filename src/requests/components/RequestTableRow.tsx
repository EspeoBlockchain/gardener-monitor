import styled from 'styled-components';

export const RequestTableRow = styled.tr`
    word-break: break-word;
    background-color: ${(props: { isOdd: boolean }) => props && props.isOdd ? 'white' : '#F1F1F1'};
    
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: block;
        margin: 10px 0 10px 0;
        word-break: none;
    }
`;
