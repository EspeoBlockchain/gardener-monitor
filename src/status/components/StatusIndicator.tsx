import styled from 'styled-components';
import { State } from '../ServerStatus';

export const StatusIndicator = styled.p<State>`
  color: ${props => props.status === 'alive' ? props.theme.colors.green : props.theme.colors.red}
`;
