import styled from 'styled-components';

export const AppHeaderLeft = styled.div`
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: space-around;
    width: 25%;
    @media only screen and (max-width: 415px) {
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        padding: 10px;
}
`;
