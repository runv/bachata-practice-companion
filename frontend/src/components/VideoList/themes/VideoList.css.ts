//import { vars } from '../../Common/styles/theme.css';
import { style } from '@vanilla-extract/css';

export const thumbnailGrid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', // Fluid columns
  gap: 'clamp(0.75rem, 2vw, 2rem)',
  width: '100%',
  justifyItems: 'center',
  alignItems: 'start',
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
  //width: '100%',
  minHeight: '10vw',
  //minHeight: 'clamp(80px, 30vw, 120px)',
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
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '100%',
      width: '90%',
      gap: '0.75rem'
    },
  },
});

export const thumbnail = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '0.25rem', // Add a small gap between elements
  '@media': {
    'screen and (max-width: 600px)': {
      padding: '0.5rem',
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: '100%',
      width: '100%',
      gap: '0.75rem'
    },
  },
});

export const thumbnailImage = style({
  width: '100%',
  height: 'auto',
  borderRadius: '8px',
  objectFit: 'cover',
  marginBottom: '0.5rem',
  '@media': {
    'screen and (max-width: 600px)': {
      width: '100px',
      height: 'auto',
      marginBottom: 0,
    },
  },
  
});

export const thumbnailText = style({
'@media': {
    'screen and (max-width: 600px)': {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      flex: 1,
    },
  },

})

export const title = style({
  fontSize: '1rem',
  fontWeight: 600,
  margin: 0, // Remove default margin
  whiteSpace: 'wrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  '@media': {
    'screen and (max-width: 600px)': {
       whiteSpace: 'normal',
       textOverflow: 'unset',
       overflow: 'unset'
    },
  }
});

export const categoryLevel = style({
  margin: 0, // Remove default margin
  fontSize: '0.95rem',
  color: '#555',
});

export const emptyState = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '40vh',
  width: '100%',
  color: '#6b7280',
  fontSize: 'clamp(1rem, 2vw, 1.25rem)',
  gap: '1.5rem',
  background: 'transparent',
  '@media': {
    'screen and (max-width: 600px)': {
      minHeight: '30vh',
      fontSize: '1rem',
      gap: '1rem',
    },
  },
});

export const emptyIcon = style({
  fontSize: '3rem',
  marginBottom: '0.5rem',
  opacity: 0.7,
});