import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      light: string,
      dark: string,
      green: string,
      red: string,
    };
  }
}
