import styled from 'styled-components';

export const CallFormWrapper = styled.div`
    font-family: ${props => props.theme.fonts.primary};
    box-sizing: border-box;
    max-height: 80px;
    width: 40%;
    display: flex;
    flex-direction: column;
    align-items: center;

    @media only screen and (max-width: 415px) {
        flex-direction: row;
        width: 100%;
    }
`;
