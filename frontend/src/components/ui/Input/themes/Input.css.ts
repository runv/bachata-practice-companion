import { style, styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';

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

export const fileUploadWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  height: vars.formElement.height.md,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radius.md,
  padding: `0 ${vars.space.md}`,
  backgroundColor: vars.color.input,
  cursor: 'pointer',
});

export const fakeButton = style({
  backgroundColor: vars.color.primary,
  color: vars.color.primaryText,
  padding: `0 ${vars.formElement.paddingX.md}`,
  borderRadius: vars.radius.sm,
  height: '2rem',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontWeight: 'bold',
  whiteSpace: 'nowrap',
});

export const fileName = style({
  color: vars.color.text,
  fontSize: vars.font.size.base,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
});

export const hiddenInput = style({
  display: 'none',
});

export const inputSize = styleVariants({
  sm: {
    height: vars.formElement.height.sm,
    padding: `0 ${vars.formElement.paddingX.sm}`
  },
  md: {
    height: vars.formElement.height.md,
    padding: `0 ${vars.formElement.paddingX.md}`
  },
  lg: {
    height: vars.formElement.height.lg,
    padding: `0 ${vars.formElement.paddingX.sm}`
  },
});
