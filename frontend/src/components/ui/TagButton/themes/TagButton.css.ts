import { style } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';


export const tagButton = style({
  display: 'inline-block',
  backgroundColor: vars.color.primary,
  color: vars.color.text,
  padding: `4px 8px`,
  borderRadius: vars.radius.sm,
  fontSize: '0.9rem',
  marginRight: vars.space.sm,
  marginBottom: vars.space.sm,
  border: `1px solid ${vars.color.border}`,
  cursor: 'pointer',
  selectors: {
    '&:hover': {
    //  backgroundColor: vars.color.tag,
      opacity: 0.7,
      color: '#fff',
    },
  },
});

/*export const tagButton = style({
  border: '1px solid #ccc',
  borderRadius: '20px',
  padding: '0.25rem 0.75rem',
  fontSize: '0.85rem',
  cursor: 'pointer',
  backgroundColor: '#f5f5f5',
  transition: 'all 0.2s',
});*/

export const selectedTag = style({
  backgroundColor: '#1976d2',
  color: 'white',
  borderColor: '#1976d2',
});