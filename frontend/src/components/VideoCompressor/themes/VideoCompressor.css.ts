import { style } from '@vanilla-extract/css';
import { vars } from '../../Common/styles/theme.css';

export const videoPlaceholder = style({
  width: '70%',
  maxWidth: 'clamp(320px, 80vw, 600px)',
 // aspectRatio: '9/16',
  background: 'linear-gradient(180deg, #222 80%, #444 100%)',
  borderRadius: vars.radius.lg,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  overflow: 'hidden',
  position: 'relative',
  margin: '0 auto',
});

export const videoTag = style({
  width: '50%',
  height: '50%',
  objectFit: 'cover',
  filter: 'brightness(0.5)',
  pointerEvents: 'none',
});

export const videoReady = style({
  width: '50%',
  height: '50%',  
  filter: 'none',
  pointerEvents: 'auto',
});

export const progressInfo = style({
  textAlign: 'center',
  color: vars.color.textSecondary,
  fontSize: vars.font.size.base,
  marginTop: vars.space.md,
});

export const successMessage = style({
  color: vars.color.success,
  fontWeight: 'bold',
  textAlign: 'center',
  marginTop: vars.space.md,
});