import { style } from '@vanilla-extract/css';

export const barWrapper = style({
  backgroundColor: '#eee',
  borderRadius: '6px',
  overflow: 'hidden',
  height: '1rem',
  margin: '1rem 0',
});

export const progressFill = style({
  backgroundColor: '#1976d2',
  height: '100%',
  transition: 'width 0.3s ease',
});