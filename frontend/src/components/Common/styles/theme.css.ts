// src/theme.css.ts
import { createGlobalThemeContract, createTheme, createGlobalTheme } from '@vanilla-extract/css';

const kebabCase = (str: string) =>
  str.replace(/(?!^)([A-Z\u00C0-\u00D6])/g, (match) => '-' + match.toLowerCase());

const pathFormatter = (_value: null | string, path: string[]) =>
  `Common-${path.map(kebabCase).join('-')}`;

export const vars = createGlobalThemeContract({
  color: {
    text: null,
    textSecondary: null,
    background: null,
    input: null,
    border: null,
    primary: null,
    primaryText: null,
    secondary: null,
    error: null,
    errorText: null,
    errorBackground: null,
    success: null,
    successBackground: null,
    disabled: null,
    tag: null
  },
  font: {
    size: {
      xs: null,
      sm: null,
      base: null,
      lg: null,
      xl: null
    },
  },
  space: {
    xs: null,
    sm: null,
    md: null,
    lg: null,
    xl: null
  },
  radius: {
    sm: null,
    md: null,
    lg: null,
    xl: null
  },
  shadow: {
    sm: null,
    md: null,
    lg: null
  }
}, pathFormatter);


const themeDefinition = {
  color: {
    text: '#1f1f1f',
    textSecondary: '#6b7280',
    background: '#ffffff',
    input: '#f9fafb',
    border: '#d1d5db',
    primary: '#9333ea',
    primaryText: '#ffffff',
    secondary: '#3949ab',
    error: '#ef4444',
    errorText: '#ffffff',
    errorBackground: '#fee2e2',
    success: '#10b981',
    successBackground: '#ecfdf5',
    disabled: '#bbb',
    tag: '#f5f5f5'
  },
  font: {
    size: {
      xs: '12px',
      sm: '14px',
      base: '16px',
      lg: '18px',
      xl: '20px'
    },
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px'
  },
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px'
  },
  shadow: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 2px 4px rgba(0, 0, 0, 0.1)',
    lg: '0 4px 6px rgba(0, 0, 0, 0.1)'
  }
};

export const themeClass = createTheme(vars, themeDefinition);

// Apply to root globally
createGlobalTheme(':root', vars, themeDefinition);


/*import { createTheme } from '@vanilla-extract/css';

export const [themeClass, vars] = createTheme({
  color: {
    /*light: {
    bg: '#f9f9f9',
    text: '#1a1a1a',
    primary: '#b00020',
    secondary: '#005f73',
    accent: '#ffb703'
  },
  dark: {
    bg: '#121212',
    text: '#f0f0f0',
    primary: '#ff6b6b',
    secondary: '#90e0ef',
    accent: '#ffd166'
  }*/
  /*text: '#000000',
    background: '#f9f9f9',
    foreground: '#333',
    primary: '#007bff',
    secondary: '#6c757d',
    border: '#ddd',
  },
  space: {
    xs: '4px',
    sm: '8px',
    md: '16px',
    lg: '32px',
  },
  fontSize: {
    sm: '0.875rem',
    base: '1rem',
    lg: '1.25rem',
  },
  radius: {
    sm: '4px',
    md: '8px',
  },
});*/
