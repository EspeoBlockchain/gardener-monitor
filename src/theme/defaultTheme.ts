export const defaultTheme = {
  colors: {
    dark: '#222',
    light: '#fff',
    green: '#080',
    red: '#f00',
  },
  appHeader: {
    desktopHeight: '170px',
    mobileHeight: '70px',
    padding: '10px',
  },
  fontSizes: {
    small: '8px',
    medium: '12px',
    large: '16px',
  }
};

export type Theme = typeof defaultTheme;
