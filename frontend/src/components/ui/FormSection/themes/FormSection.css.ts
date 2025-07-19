import { style } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';

export const formSection = style({
  border: '1px solid #ddd',
  borderRadius: '8px',
  padding: '1rem',
  marginBottom: '2rem'
});

export const rowLayout = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.md,
});
