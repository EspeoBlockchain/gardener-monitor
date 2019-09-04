import styled from 'styled-components';
import { Loader } from './Loader';

export const FetchingDataLoader = styled(Loader)`
  margin-top: 30%;
  @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        margin-top: 70%;
    }
`;
