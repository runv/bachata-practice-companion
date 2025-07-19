// src/components/ui/select.css.ts
import { style } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';

export const selectWrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.xs,
});

export const label = style({
  fontSize: vars.font.size.sm,
  color: vars.color.text,
});

export const select = style({
  padding: vars.space.sm,
  fontSize: vars.font.size.base,
  borderRadius: vars.radius.md,
  border: `1px solid ${vars.color.border}`,
  backgroundColor: vars.color.input,
  color: vars.color.text,
  transition: 'border 0.2s ease',
  ':focus': {
    outline: 'none',
    borderColor: vars.color.primary,
  },
});


/*export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
  marginBottom: '1rem',
});

export const label = style({
  fontWeight: 'bold',
  color: vars.color.text,
  fontSize: '0.9rem'
});*/

/*export const select = style({
  appearance: 'none',
  fontSize: '1rem',
  padding: '0.5rem',
  border: `1px solid ${vars.color.border}`,
  borderRadius: '4px',
  width: '100%',
  backgroundColor: vars.color.inputBackground,
  color: vars.color.text,
});*/


/*export const select = style({
  appearance: 'none',  
  padding: '0.5rem',
  fontSize: '1rem',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.sm,
  backgroundColor: vars.color.background,
  color: '#222',//vars.color.text,
  outline: 'none',
  selectors: {
    '&:focus': {
      borderColor: vars.color.primary,
    },
  },
});*/
