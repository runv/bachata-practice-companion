import { style } from '@vanilla-extract/css';

export const overlayStyle = style({
  position: 'fixed',
  inset: 0,
  background: 'rgba(0,0,0,0.5)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const dialogStyle = style({
  background: '#fff',
  borderRadius: '1rem',
  boxShadow: '0 4px 32px rgba(0,0,0,0.18)',
  padding: 'clamp(1rem, 4vw, 2rem)',
  minWidth: 'clamp(320px, 60vw, 480px)',
  maxWidth: '90vw',
  maxHeight: '90vh',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
});