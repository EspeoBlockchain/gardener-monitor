import styled from 'styled-components';

export const Button = styled.button`
    min-width: 20%;
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
