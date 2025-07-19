import { style } from '@vanilla-extract/css';

export const labelWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.25rem',
  marginBottom: '1rem'
});

export const labelText = style({
  fontWeight: 'bold',
  fontSize: '0.9rem'
});

export const input = style({
  padding: '0.5rem',
  fontSize: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc'
});