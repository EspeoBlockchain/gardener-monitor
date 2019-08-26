import styled from 'styled-components';


export const AppFooterSpan = styled.span<{ active: boolean }>`
        cursor: pointer;
        color: ${props => props.active ? props.theme.colors.light : props.theme.colors.dark};
        padding: 8px 16px;
        text-decoration: none;
        transition: background-color .3s;
        border: 1px solid #ddd;
        background-color: ${(props) => (props.active ? props.theme.colors.gardenerBackgroundColor : props.theme.colors.light)};
`;
