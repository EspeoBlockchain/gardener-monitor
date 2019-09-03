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
  margins: {
    default: 0,
  },
  appHeader: {
    desktopHeight: 170,
    mobileHeight: 70,
    smallMobileHeight: 180,
    padding: 10,
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
  heights: {
    desktop: '850px',
  },
  table: {
    padding: {
      desktop: 8,
    },
    headerHeight: 33,
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
