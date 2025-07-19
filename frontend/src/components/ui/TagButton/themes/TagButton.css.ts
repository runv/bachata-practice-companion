import { style } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';


export const tagButton = style({
  display: 'inline-block',
  backgroundColor: vars.color.primary,
  color: vars.color.primaryText,
  padding: `${vars.space.xs} ${vars.space.md}`,
  borderRadius: '9999px', // pill shape
  fontSize: vars.font.size.sm,
  marginRight: vars.space.sm,
  marginBottom: vars.space.sm,
  border: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  minWidth: '2.5rem',
  transition: 'background 0.2s, color 0.2s',
  selectors: {
    '&:hover': {
      opacity: 0.8,
      color: '#fff',
    },
  },
});

export const selectedTag = style({
  backgroundColor: vars.color.secondary,
  color: 'white',
  borderColor: vars.color.secondary,
});