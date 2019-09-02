import styled from 'styled-components';

export const RequestTableWrapper = styled.div`
    font-family: 'Montserrat', sans-serif;
    overflow: auto;
    width: 100%;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        top: ${props => props.theme.appHeader.desktopHeight}px;
        bottom: 0;
        left: 0;
        overflow: auto;
    };
    @media (max-width: ${props => props.theme.maxWidths.smallMobile}) {
        top: ${props => props.theme.appHeader.smallMobileHeight}px;
    };
`;
