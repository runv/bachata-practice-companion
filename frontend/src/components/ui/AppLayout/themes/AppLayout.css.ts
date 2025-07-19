import { style } from '@vanilla-extract/css';
import { vars } from '../../../Common/styles/theme.css';

// App outer wrapper (add this to your main entry, e.g. wrap <AppLayout /> in App.tsx)
export const appRoot = style({
  minHeight: '100vh',
  background: '#f7f7fa',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: `clamp(${vars.space.xl}, 6vw, ${vars.space.xl}) 0 0 0`, // More top padding
  boxSizing: 'border-box',
});

// Main grid container
export const container = style({
  width: '100%',
  maxWidth: 'clamp(320px, 90vw, 1200px)',
  marginLeft: 'auto',
  marginRight: 'auto',
  display: 'grid',
  gridTemplateColumns: 'minmax(320px, 1fr) 2fr',
  gridTemplateRows: 'auto 1fr',
  gap: vars.space.xl,
  background: vars.color.background,
  borderRadius: vars.radius.xl,
  boxShadow: vars.shadow.md,
  boxSizing: 'border-box',
  padding: `0 clamp(${vars.space.lg}, 6vw, ${vars.space.xl})`,
  '@media': {
    'screen and (max-width: 1200px)': {
      maxWidth: '100vw',
      gridTemplateColumns: 'minmax(220px, 1fr) 2fr',
      gap: vars.space.lg,
      padding: `0 clamp(${vars.space.md}, 4vw, ${vars.space.lg})`,
    },
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto auto 1fr',
      gap: vars.space.md,
      borderRadius: vars.radius.lg,
      boxShadow: 'none',
      padding: vars.space.sm,
    },
    'screen and (max-width: 600px)': {
      padding: vars.space.xs,
      gap: vars.space.sm,
    },
  },
});

// Header bar
export const headerBar = style({
  gridColumn: '1 / -1',
  position: 'sticky',
  top: 0,
  zIndex: 30,
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  background: vars.color.background, // match container
  borderTopLeftRadius: vars.radius.xl,
  borderTopRightRadius: vars.radius.xl,
  borderBottom: `1px solid ${vars.color.border}`,
  boxShadow: '0 2px 8px rgba(0,0,0,0.04)', // subtle shadow
  padding: `clamp(${vars.space.md}, 4vw, ${vars.space.xl})`,
  minHeight: '2.5rem',
  gap: vars.space.sm,
  margin: 0,
  '@media': {
    'screen and (max-width: 900px)': {
      borderRadius: 0,
      padding: `clamp(${vars.space.sm}, 4vw, ${vars.space.lg})`,
      minHeight: '2rem',
      gap: vars.space.xs,
    },
    'screen and (max-width: 600px)': {
      borderRadius: 0,
      padding: `${vars.space.xs} ${vars.space.xs}`,
      minHeight: '2rem',
      gap: vars.space.xs,
    },
  },
});

// Title
export const title = style({
  fontSize: 'clamp(1.2rem, 5vw, 1.5rem)',
  fontWeight: 700,
  color: vars.color.text,
  margin: 0,
  letterSpacing: '0.01em',
  lineHeight: 1.2,
  flex: 1,
  '@media': {
    'screen and (max-width: 600px)': {
      fontSize: '1.1rem',
    },
  },
});

// Upload button
export const uploadButton = style({
  backgroundColor: vars.color.primary,
  color: vars.color.primaryText,
  border: 'none',
  borderRadius: vars.radius.md,
  cursor: 'pointer',
  fontWeight: 'bold',
  fontSize: vars.font.size.sm,
  boxShadow: vars.shadow.sm,
  padding: `${vars.space.xs} ${vars.space.md}`,
  marginLeft: 0,
  whiteSpace: 'nowrap',
  alignSelf: 'center',
  ':hover': {
    backgroundColor: vars.color.secondary,
  },
});

// Filter button (for mobile)
export const filterButton = style({
  display: 'none',
  '@media': {
    'screen and (max-width: 900px)': {
      backgroundColor: vars.color.primary,
      color: vars.color.primaryText,
      border: 'none',
      borderRadius: vars.radius.md,
      cursor: 'pointer',
      fontWeight: 'bold',
      fontSize: vars.font.size.sm,
      boxShadow: vars.shadow.sm,
      padding: `${vars.space.xs} ${vars.space.md}`,
      marginLeft: 0,
      whiteSpace: 'nowrap',
      alignSelf: 'center',
      display: 'inline-block',
      ':hover': {
        backgroundColor: vars.color.secondary,
      },
    },
  },
});

// Main content grid
export const mainContent = style({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 340px) 1fr',
  gap: vars.space.xl,
  alignItems: 'start',
  '@media': {
    'screen and (max-width: 1100px)': {
      gridTemplateColumns: 'minmax(0, 280px) 1fr',
      gap: vars.space.lg,
    },
    'screen and (max-width: 900px)': {
      gridTemplateColumns: '1fr',
      gap: vars.space.md,
    },
    'screen and (max-width: 600px)': {
      gap: vars.space.sm,
    },
  },
});

// Filters sidebar
export const filtersSidebar = style({
  gridColumn: '1',
  position: 'sticky',
  top: 'calc(3.5rem + 1vw)',
  alignSelf: 'start',
  background: vars.color.background,
  borderRadius: vars.radius.lg,
  boxShadow: vars.shadow.md,
  padding: vars.space.lg,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.space.md,
  border: `1px solid ${vars.color.border}`,
  minWidth: '12rem',
  maxWidth: '18rem',
  zIndex: 20,
  marginBottom: vars.space.xl, // Add gap below filters
  '@media': {
    'screen and (max-width: 900px)': {
      display: 'none', // Hide sidebar on small screens
    },
  },
});

// Thumbnails section
export const thumbnailsSection = style({
  gridColumn: '2',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  gap: vars.space.md,
  width: '100%',
  marginTop: 0,
  '@media': {
    'screen and (max-width: 900px)': {
      gridColumn: '1',
      gridRow: '3',
      width: '100%',
      gap: vars.space.sm,
      marginTop: 0,
    },
    'screen and (max-width: 600px)': {
      gap: vars.space.xs,
      marginTop: 0,
    },
  },
});



// Header actions
export const headerActions = style({
  display: 'flex',
  flexDirection: 'row',
  gap: vars.space.sm,
  alignItems: 'center',
  '@media': {
    'screen and (max-width: 600px)': {
      gap: vars.space.xs,
    },
  },
});

