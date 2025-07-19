//import { vars } from '../../Common/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const thumbnailGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', // Fluid columns
  gap: 'clamp(0.75rem, 2vw, 2rem)',
  width: '100%',
  justifyItems: 'center',
  alignItems: 'start',
  padding: '1rem 0',
  '@media': {
    'screen and (max-width: 900px)': {
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: '1rem',
    },
    'screen and (max-width: 600px)': {
      gridTemplateColumns: '1fr',
      gap: '0.5rem',
    },
  },
});

export const thumbnailCard = style({
  background: '#fff',
  borderRadius: '16px',
  padding: 'clamp(0.75rem, 2vw, 1.25rem)',
  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
  textAlign: 'center',
  width: '100%',
  minHeight: 'clamp(120px, 30vw, 180px)',
  maxWidth: 'clamp(140px, 40vw, 200px)',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  wordBreak: 'break-word',
  transition: 'box-shadow 0.2s, transform 0.2s',
  ':hover': {
    boxShadow: '0 4px 24px rgba(0,0,0,0.14)',
    transform: 'translateY(-2px) scale(1.02)',
  },
  '@media': {
    'screen and (max-width: 600px)': {
      padding: '0.5rem',
    },
  },
});

export const thumbnail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem', // Add a small gap between elements
});

export const thumbnailImage = style({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  objectFit: 'cover',
  marginBottom: '0.5rem',
});

export const title = style({
  fontSize: '1rem',
  fontWeight: 600,
  margin: 0, // Remove default margin
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
});

export const categoryLevel = style({
  margin: 0, // Remove default margin
  fontSize: '0.95rem',
  color: '#555',
});