import styled from 'styled-components';

export const StatusIndicatorContainer = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30%;
  max-width: 100%;

  @media only screen and (max-width: 415px) {
  width: 100%;
}
`;
