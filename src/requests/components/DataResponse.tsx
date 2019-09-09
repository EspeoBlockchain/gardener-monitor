import styled from 'styled-components';

export const DataResponse = styled.p`
  margin-top: 30%;
  @media (max-width: ${props => props.theme.maxWidths.mobile}) {
        margin-top: 70%;
    }
`;
