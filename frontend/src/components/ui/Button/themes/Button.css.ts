import { styleVariants } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';

export const button = styleVariants({
  primary: {
    backgroundColor: vars.color.primary,
    color: '#fff',
    border: 'none',
    padding: `${vars.space.sm} ${vars.space.md}`,
    borderRadius: vars.radius.md,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  disabled: {
    backgroundColor: vars.color.disabled,
    cursor: 'not-allowed',
    opacity: 0.6,
    pointerEvents: 'none',
  },
  secondary: {
    backgroundColor: vars.color.secondary,
    color: '#fff',
    border: 'none',
    padding: `${vars.space.sm} ${vars.space.md}`,
    borderRadius: vars.radius.md,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: vars.color.primary,
    border: `1px solid ${vars.color.primary}`,
    padding: `${vars.space.sm} ${vars.space.md}`,
    borderRadius: vars.radius.md,
    cursor: 'pointer',
  },
});

export const buttonSize = styleVariants({
  sm: {
    height: vars.formElement.height.sm,
    padding: `0 ${vars.formElement.paddingX.sm}`,
  },
  md: {
    height: vars.formElement.height.md,
    padding: `0 ${vars.formElement.paddingX.md}`,
  },
  lg: {
    height: vars.formElement.height.lg,
    padding: `0 ${vars.formElement.paddingX.lg}`,
  },
});


/*export const button = style({
  border: 'none',
  borderRadius: '8px',
  padding: '0.5rem 1rem',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'background 0.2s',
});

export const disabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
});

export const variants = {
  primary: style({ 
    backgroundColor: '#1976d2', 
    color: 'white' }),
  secondary: style({ 
    backgroundColor: '#eeeeee', 
    color: '#333' }),
  ghost: style({ 
    backgroundColor: 'transparent', 
    border: '1px solid #ccc', 
    color: '#333' 
 })
};*/