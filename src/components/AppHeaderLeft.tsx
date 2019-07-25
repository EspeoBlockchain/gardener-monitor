import styled from 'styled-components';

export const AppHeaderLeft = styled.div`
    display: flex;
    flex-direction: column;
    align-items: space-around;
    width: 30%;
    @media only screen and (max-width: 415px) {
        flex-direction: row;
        width: 100%;
        justify-content: space-around;
        padding: 10px;
}
`;
