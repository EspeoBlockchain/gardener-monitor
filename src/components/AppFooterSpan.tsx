import styled from 'styled-components';

export const AppFooterSpan = styled.span`
    cursor: pointer;
    color: black;
    padding: 8px 16px;
    text-decoration: none;
    transition: background-color .3s;
    border: 1px solid #ddd;
        :active {
            background-color: ${props => props.theme.colors.gardenerBackgroundColor};
            color: white;
            border: 1px solid ${props => props.theme.colors.gardenerBackgroundColor};
}
`;
