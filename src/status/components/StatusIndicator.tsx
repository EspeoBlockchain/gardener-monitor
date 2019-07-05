import styled from 'styled-components';
import { State } from '../ServerStatus';

export const StatusIndicator = styled.p<State>`
  color: ${props => props.status === 'alive' ? 'green' : 'red'}
`;
