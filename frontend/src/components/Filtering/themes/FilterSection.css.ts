import { style } from '@vanilla-extract/css';
import { vars } from '../../Common/styles/theme.css';

export const filterSection = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
  padding: vars.space.md,
  '@media': {
    'screen and (max-width: 900px)': {
      flexDirection: 'column',
      flexWrap: 'wrap',
      gap: vars.space.md,
    },
  },
});

export const filterGroup = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
  minWidth: '12rem',
  flex: 1,
});
