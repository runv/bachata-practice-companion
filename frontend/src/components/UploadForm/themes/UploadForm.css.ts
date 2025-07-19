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
  maxHeight: '8rem',
  overflowY: 'auto',
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
});

/*export const tagRow = style({
  display: 'flex',
  gap: '0.5rem',
});

export const tagList = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.5rem',
  marginTop: '1rem',
});
export const tagsWrap = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.space.xs,
  marginTop: vars.space.sm,
});*/

/*export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '1.5rem',
  maxWidth: '600px',
  width: '100%',
  margin: '0 auto',
  padding: '1rem',
});*/
/*export const formWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.lg,
  padding: vars.space.xl,
  backgroundColor: vars.color.background,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.md,
  width: '100%',
  maxWidth: 600,
  margin: '0 auto',
});

export const compressorBlock = style({
  marginTop: vars.space.md,
  padding: vars.space.md,
  border: `1px solid ${vars.color.error}`,
  borderRadius: vars.radius.md,
  backgroundColor: vars.color.errorBackground,
});*/