import styled from 'styled-components';
import { Theme } from '../../theme/defaultTheme';

export const RequestTableRow = styled.tr`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    min-height: 100px;
    word-break: break-word;
    background-color: ${(
    props: { isOdd?: boolean, theme: Theme }) =>
        props && props.isOdd ? props.theme.colors.light : props.theme.colors.lightGrey};
    border-bottom: 1px solid grey;
    @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        display: block;
        margin: 10px 0 10px 0;
        word-break: none;
        border-bottom: 0;
    }
`;
