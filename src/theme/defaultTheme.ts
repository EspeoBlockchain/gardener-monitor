export const defaultTheme = {
  colors: {
    dark: '#222',
    light: '#fff',
    green: '#080',
    red: '#f00',
  },
  appHeader: {
    height: '150px',
    padding: '10px',
  },
  fontSizes: {
    small: '8px',
    medium: '12px',
    large: '16px',
  }
};

export type Theme = typeof defaultTheme;
