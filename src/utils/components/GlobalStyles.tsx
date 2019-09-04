import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  body {
    margin: ${props => props.theme.margins.default};
  }
`;
