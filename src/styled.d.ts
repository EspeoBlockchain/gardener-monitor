import 'styled-components';
import { Theme } from './theme/defaultTheme';

declare module 'styled-components' {
  // tslint:disable-next-line:no-empty-interface
  export interface DefaultTheme extends Theme {}
}
