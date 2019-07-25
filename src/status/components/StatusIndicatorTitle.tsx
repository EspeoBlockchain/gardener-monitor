import styled from 'styled-components';

export const StatusIndicatorTitle = styled.div`
    align-self: center;
    font-family: ${props => props.theme.fonts.primary}, sans-serif;
    @media only screen and (max-width: 415px) {
        margin-right: 10px;
}
`;
