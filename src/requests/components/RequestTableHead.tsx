import styled from 'styled-components';

export const RequestTableHead = styled.thead`
    position: absolute;
    width: 100%;
    display: inherit;
    background-color: ${props => props.theme.colors.gardenerBackgroundColor};
    box-sizing: border-box;
    color: ${props => props.theme.colors.light};
    border: 1px solid ${props => props.theme.colors.gardenerBackgroundColor};
    font-size: ${props => props.theme.fontSizes.large};
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: block;
        position: static;
        border: none;
        margin-bottom: -10px;
    }
`;
