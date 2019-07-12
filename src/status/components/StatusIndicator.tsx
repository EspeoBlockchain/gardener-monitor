import styled, { DefaultTheme, ThemedStyledProps, keyframes } from 'styled-components';
import { State } from '../ServerStatus';

export type Props = ThemedStyledProps<State, DefaultTheme>;

const fadeInfadeOut =
  keyframes`
  {
    0% { opacity: 0; }
    50%   { opacity: 1; }
    100% { opacity: 0; }
  }
`;

export const StatusIndicator = styled.p<Props>`
  align-self: center;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ status, theme }: Props) => status === 'alive' ? theme.colors.green : theme.colors.red};
  animation: ${fadeInfadeOut} 2s infinite;
`;
