import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { State } from '../ServerStatus';

export type Props = ThemedStyledProps<State, DefaultTheme>;

export const StatusIndicator = styled.p<Props>`
  color: ${(props: Props) => props.status === 'alive' ? props.theme.colors.green : props.theme.colors.red}
`;
