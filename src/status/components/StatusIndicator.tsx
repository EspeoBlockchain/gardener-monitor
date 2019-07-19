import styled, { DefaultTheme, ThemedStyledProps, keyframes } from 'styled-components';
import { State } from '../ServerStatus';

export type Props = ThemedStyledProps<State, DefaultTheme>;

export const StatusIndicator = styled.p<Props>`
  align-self: center;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ status, theme }: Props) => status === 'alive' ? theme.colors.green : theme.colors.red};
  animation: ${props => props.theme.fadeInfadeOut} 2s infinite;
`;
