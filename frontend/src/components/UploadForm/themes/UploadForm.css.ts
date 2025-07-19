import { style } from '@vanilla-extract/css';
import { vars } from '../../Common/styles/theme.css';


export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
  padding: '0',
  backgroundColor: 'transparent',
  borderRadius: 0,
  boxShadow: 'none',
  width: '100%',
  maxWidth: '100%',
  margin: 0,
  '@media': {
    'screen and (max-width: 600px)': {
      gap: vars.space.md,
      padding: '0',
      borderRadius: 0,
      boxShadow: 'none',
      width: '100vw',
      maxWidth: '100vw',
      margin: 0,
    },
  },
});

export const fileInfo = style({
  fontSize: vars.font.size.sm,
  color: vars.color.textSecondary,
  marginTop: vars.space.sm,
});

export const stackedSelectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const addCategoryRow = style({
  display: 'flex',
  gap: vars.space.sm,
  alignItems: 'last baseline',
});

export const tagWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.sm,
});

export const tagChipArea = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.sm,
  maxWidth: '100%',
  maxHeight: '10rem',
  overflowY: 'auto',
  '@media': {
    'screen and (max-width: 900px)': {
      maxHeight: '6rem',
      gap: vars.space.xs,
    },
    'screen and (max-width: 600px)': {
      maxHeight: '4rem',
      gap: vars.space.xs,
    },
  },
});

export const tagsInputRow = style({
  display: 'flex',
  alignItems: 'last baseline',
  gap: vars.space.sm,
});

export const compressorBlock = style({
  marginTop: vars.space.md,
  padding: vars.space.md,
  border: `1px solid ${vars.color.error}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.errorBackground,
  maxWidth: 'clamp(220px, 80vw, 480px)', 
  width: '100%',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.space.md,
  '@media': {
    'screen and (max-width: 600px)': {
      maxWidth: '90vw',
      padding: vars.space.sm,
      gap: vars.space.sm,
    },
  },
});