import styled from 'styled-components';

export const RequestTableHead = styled.thead`
    position: fixed;
    width: 100%;
    height: ${props => props.theme.table.headerHeight}px;
    top: ${props => props.theme.appHeader.desktopHeight}px;
    left: 0;
    display: inherit;
    background-color: ${props => props.theme.colors.gardenerBackgroundColor};
    box-sizing: border-box;
    color: ${props => props.theme.colors.light};
    border: 1px solid ${props => props.theme.colors.gardenerBackgroundColor};
    font-size: ${props => props.theme.fontSizes.large};
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: none;
        position: static;
        border: none;
        margin-bottom: -10px;
    }
`;
