import styled from 'styled-components';

export const AppHeaderLeft = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    width: 25%;
    height: 100%;
    @media only screen and (max-width: ${props => props.theme.maxWidths.smallMobile}) {
        flex-direction: row;
        height: auto;
        width: 100%;
        justify-content: space-around;
        padding: 10px;
}
`;
