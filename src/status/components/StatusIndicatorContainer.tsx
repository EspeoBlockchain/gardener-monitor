import styled from 'styled-components';

export const StatusIndicatorContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 20%;

  @media only screen and (max-width: ${props => props.theme.maxWidths.smallMobile}) {
  width: 100%;
  flex-direction: row;
}
`;
