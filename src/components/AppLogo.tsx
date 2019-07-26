import styled from 'styled-components';

export const AppLogo = styled.img`
  box-sizing: border-box;
  max-height: 80px;
  width: 100%;
  max-width: 100%;
  @media only screen and (max-width: ${props => props.theme.maxWidths.smallMobile}) {
    max-height: 40px;
}
`;
