import styled from 'styled-components';

export const RequestTableBody = styled.tbody`
    width: 100%;
    margin-top: ${props => (props.theme.appHeader.desktopHeight + props.theme.table.headerHeight + props.theme.table.padding.desktop)}px;
    display: flex;
    overflow: auto;
    flex-direction: column;
@media (max-width: ${props => props.theme.maxWidths.mobile}) {
    display: block;
    position: static;
    height: 100%;
    top: auto;
    margin-top: ${props => (props.theme.appHeader.desktopHeight - props.theme.appHeader.padding)}px;
    }
`;
