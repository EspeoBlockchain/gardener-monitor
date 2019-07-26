import { keyframes } from 'styled-components';

export const defaultTheme = {
  colors: {
    dark: '#222',
    light: '#fff',
    green: '#080',
    red: '#f00',
    gardenerBackgroundColor: '#13927C',
    lightGrey: '#F1F1F1',
    grey: '#808080',
  },
  appHeader: {
    desktopHeight: '170px',
    mobileHeight: '70px',
    smallMobileHeight: '210px',
    padding: '10px',
  },
  fonts: {
    primary: 'Montserrat',
  },
  fontSizes: {
    small: '8px',
    medium: '12px',
    large: '16px',
  },
  maxWidths: {
    mobile: '768px',
    smallMobile: '415px',
  },
  fadeInfadeOut:
    keyframes`
  {
    0% { opacity: 0; }
    50%   { opacity: 1; }
    100% { opacity: 0; }
  }
`,
};

export type Theme = typeof defaultTheme;
