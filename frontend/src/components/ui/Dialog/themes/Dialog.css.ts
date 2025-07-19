import { style, keyframes } from '@vanilla-extract/css';

const slideUpMobile = keyframes({
  '0%': { opacity: 0, transform: 'translateY(100%)' },
  '100%': { opacity: 1, transform: 'translateY(0)' },
});

export const overlayStyle = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'flex-end', // align to bottom
  justifyContent: 'center',
  transition: 'background 0.3s',
  '@media': {
    'screen and (max-width: 600px)': {
      background: 'transparent', // no backdrop on mobile
      alignItems: 'flex-end',
      justifyContent: 'center',
    },
  },
});

export const dialogStyle = style({
  background: '#fff',
  borderRadius: '1rem 1rem 0 0',
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
  '@media': {
    'screen and (max-width: 600px)': {
      borderRadius: '1rem 1rem 0 0',
      minWidth: '100vw',
      maxWidth: '100vw',
      width: '100vw',
      height: '60vh',
      maxHeight: '60vh',
      marginBottom: 0,
      marginTop: 'auto',
      padding: 0,
      gap: '0.5rem',
      animation: `${slideUpMobile} 0.4s cubic-bezier(.4,0,.2,1)`, // Only animate on mobile
    },
    'screen and (max-width: 900px)': {
      height: '70vh',
      maxHeight: '70vh',
      top: 'auto',
      bottom: 0,
    },
  },
  
});

export const mobileHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  padding: '0.75rem 1rem 0.5rem 1rem',
  borderBottom: '1px solid #eee',
  background: '#fff',
  fontSize: '1rem',
  fontWeight: 600,
  position: 'relative',
  zIndex: 2,
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: '0.95rem',
      padding: '0.5rem 1rem 0.5rem 1rem'
    },
    'screen and (min-width: 601px)': {
      fontSize: '1.1rem',
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
  '@media': {
    'screen and (max-width: 600px)': {
      display: 'none', // Hide on mobile
    },
  },
});