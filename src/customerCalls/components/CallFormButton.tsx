import styled from 'styled-components';

export const CallFormButton = styled.button`
    width: 30%;
    height: 25px;
    border-radius: 5px;
    outline: none;
    margin: 10px;
    font-size: ${props => props.theme.fontSizes.medium};
    &:hover {
        background-color: ${props => props.theme.colors.gardenerBackgroundColor};
        color: ${props => props.theme.colors.light};
    }
`;
