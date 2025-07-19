import { style } from '@vanilla-extract/css';
import { vars } from '../../Common/styles/theme.css';

export const tagRow = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
});