import { style, keyframes } from '@vanilla-extract/css';

const scaleInMobile = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.8) border-radius: 50%' },
  '60%': { opacity: 1, transform: 'scale(1.05) border-radius: 1.5rem' },
  '100%': { opacity: 1, transform: 'scale(1) border-radius: 0' },
});

const scaleInDesktop = keyframes({
  '0%': { opacity: 0, transform: 'scale(0.95)' },
  '100%': { opacity: 1, transform: 'scale(1)' },
});

export const overlayStyle = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  transition: 'background 0.3s',
  '@media': {
    'screen and (max-width: 600px)': {
      background: 'transparent',
      alignItems: 'stretch',
      justifyContent: 'stretch',
    },
  },
});

export const dialogStyle = style({
  background: '#fff',
  borderRadius: '1rem',
  boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
  padding: 'clamp(0.5rem, 4vw, 2rem)',
  minWidth: 'clamp(320px, 40vw, 480px)',
  maxWidth: 'clamp(320px, 90vw, 540px)',
  width: '100%',
  maxHeight: 'clamp(60vh, 90vh, 700px)',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  animation: `${scaleInDesktop} 0.3s cubic-bezier(.4,0,.2,1)`,
  '@media': {
    'screen and (max-width: 600px)': {
      borderRadius: 0,
      boxShadow: 'none',
      minWidth: '100vw',
      maxWidth: '100vw',
      width: '100vw',
      height: '100vh',
      maxHeight: '100vh',
      padding: 'clamp(0.5rem, 4vw, 1.5rem)',
      gap: '0.5rem',
      animation: `${scaleInMobile} 0.4s cubic-bezier(.4,0,.2,1)`,
    },
  },
});

export const mobileHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '1rem',
  borderBottom: '1px solid #eee',
  background: '#fff',
  position: 'sticky',
  top: 0,
  zIndex: 2,
  '@media': {
    'screen and (min-width: 601px)': {
      display: 'none',
    },
  },
});

export const closeButton = style({
  background: 'none',
  border: 'none',
  fontSize: '2rem',
  color: '#1976d2',
  cursor: 'pointer',
  padding: '0.5rem',
  marginLeft: '1rem',
});