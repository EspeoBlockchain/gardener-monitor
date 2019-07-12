import styled, { DefaultTheme, ThemedStyledProps } from 'styled-components';
import { State } from '../ServerStatus';

export type Props = ThemedStyledProps<State, DefaultTheme>;

export const StatusIndicator = styled.p<Props>`
  align-self: center;
  height: 25px;
  width: 25px;
  border-radius: 50%;
  background-color: ${({ status, theme }: Props) => status === 'alive' ? theme.colors.green : theme.colors.red};
  animation: fadein 2s infinite;

  @keyframes fadein {
    0% { opacity: 0; }
    50%   { opacity: 1; }
    100% { opacity: 0; }
  }
`;
