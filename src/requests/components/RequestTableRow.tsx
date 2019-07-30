import styled from 'styled-components';
import { Theme } from '../../theme/defaultTheme';

export const RequestTableRow = styled.tr`
    word-break: break-word;
    background-color: ${(
    props: { isOdd: boolean, theme: Theme }) =>
        props && props.isOdd ? props.theme.colors.light : props.theme.colors.lightGrey};
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: block;
        margin: 10px 0 10px 0;
        word-break: none;
    }
`;
