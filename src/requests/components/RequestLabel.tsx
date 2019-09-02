import styled from 'styled-components';

export const RequestLabel = styled.div`
    display: none;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 30%;
        background-color: ${props => props.theme.colors.gardenerBackgroundColor};
        box-sizing: border-box;
        color: ${props => props.theme.colors.light};
        padding: ${props => props.theme.appHeader.padding}px;
    }
`;
