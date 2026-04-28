import React from 'react';
import { useIsMobile, useBreakpoint } from '../../utils/responsiveUtils';

/**
 * Responsive Container
 * Automatically adjusts padding and max-width based on screen size
 */
export function ResponsiveContainer({ children, className = '', maxWidth = 'xl' }) {
  const breakpoint = useBreakpoint();

  const maxWidths = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
  };

  const style = {
    width: '100%',
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingLeft: '1rem',
    paddingRight: '1rem',
    maxWidth: maxWidths[maxWidth] || maxWidths.xl,
  };

  return (
    <div style={style} className={className}>
      {children}
    </div>
  );
}

/**
 * Responsive Grid
 * Automatically adjusts columns based on screen size
 */
export function ResponsiveGrid({ children, cols = { xs: 1, sm: 2, lg: 3, xl: 4 }, gap = '1rem', className = '' }) {
  const breakpoint = useBreakpoint();

  const getColumns = () => {
    if (typeof cols === 'number') return cols;
    return cols[breakpoint] || cols.lg || cols.md || cols.sm || 1;
  };

  const style = {
    display: 'grid',
    gridTemplateColumns: `repeat(${getColumns()}, 1fr)`,
    gap: gap,
  };

  return <div style={style} className={className}>{children}</div>;
}

/**
 * Responsive Flex
 * Automatically switches between column and row based on screen size
 */
export function ResponsiveFlex({
  children,
  direction = 'row',
  mobileDirection = 'column',
  align = 'center',
  justify = 'flex-start',
  gap = '1rem',
  className = ''
}) {
  const isMobile = useIsMobile();

  const style = {
    display: 'flex',
    flexDirection: isMobile ? mobileDirection : direction,
    alignItems: align,
    justifyContent: justify,
    gap: gap,
  };

  return <div style={style} className={className}>{children}</div>;
}

/**
 * Responsive Hide/Show
 * Conditionally renders children based on screen size
 */
export function ResponsiveShow({ children, breakpoint = 'md', above = true }) {
  const currentBreakpoint = useBreakpoint();
  const breakpoints = ['xs', 'sm', 'md', 'lg', 'xl', '2xl'];
  const currentIndex = breakpoints.indexOf(currentBreakpoint);
  const targetIndex = breakpoints.indexOf(breakpoint);

  const shouldShow = above ? currentIndex >= targetIndex : currentIndex < targetIndex;

  return shouldShow ? <>{children}</> : null;
}

/**
 * Responsive Text
 * Automatically adjusts font size based on screen size
 */
export function ResponsiveText({
  children,
  size = 'base',
  weights = { xs: 400, sm: 400, md: 400, lg: 400 },
  className = ''
}) {
  const breakpoint = useBreakpoint();

  const fontSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem',
    '3xl': '1.875rem',
    '4xl': '2.25rem',
    '5xl': '3rem',
  };

  const sizes = {
    xs: { xs: 'xs', sm: 'xs', md: 'sm', lg: 'sm' },
    sm: { xs: 'xs', sm: 'sm', md: 'sm', lg: 'base' },
    base: { xs: 'sm', sm: 'base', md: 'base', lg: 'base' },
    lg: { xs: 'base', sm: 'lg', md: 'lg', lg: 'lg' },
    xl: { xs: 'lg', sm: 'xl', md: 'xl', lg: 'xl' },
    '2xl': { xs: 'xl', sm: '2xl', md: '2xl', lg: '2xl' },
    '3xl': { xs: '2xl', sm: '3xl', md: '3xl', lg: '3xl' },
    '4xl': { xs: '3xl', sm: '4xl', md: '4xl', lg: '4xl' },
    '5xl': { xs: '4xl', sm: '5xl', md: '5xl', lg: '5xl' },
  };

  const currentSize = sizes[size]?.[breakpoint] || size;
  const fontSize = fontSizes[currentSize] || fontSizes.base;
  const fontWeight = typeof weights === 'object' ? (weights[breakpoint] || 400) : weights;

  const style = {
    fontSize,
    fontWeight,
  };

  return <span style={style} className={className}>{children}</span>;
}

/**
 * Responsive Card
 * Automatically adjusts padding and layout based on screen size
 */
export function ResponsiveCard({
  children,
  padding = 'medium',
  hover = false,
  className = ''
}) {
  const breakpoint = useBreakpoint();

  const paddings = {
    small: { xs: '0.75rem', sm: '1rem', md: '1rem', lg: '1rem' },
    medium: { xs: '1rem', sm: '1.25rem', md: '1.5rem', lg: '1.5rem' },
    large: { xs: '1.25rem', sm: '1.5rem', md: '2rem', lg: '2rem' },
  };

  const currentPadding = paddings[padding]?.[breakpoint] || paddings.medium.lg;

  const style = {
    background: '#FFFFFF',
    borderRadius: '0.75rem',
    padding: currentPadding,
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
    transition: hover ? 'all 0.2s ease' : 'none',
    cursor: hover ? 'pointer' : 'default',
  };

  return (
    <div
      style={style}
      className={className}
      onMouseEnter={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(-2px)';
      } : undefined}
      onMouseLeave={hover ? (e) => {
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
        e.currentTarget.style.transform = 'translateY(0)';
      } : undefined}
    >
      {children}
    </div>
  );
}

/**
 * Responsive Button
 * Automatically adjusts size based on screen size
 */
export function ResponsiveButton({
  children,
  size = 'medium',
  variant = 'primary',
  fullWidthMobile = true,
  onClick,
  className = ''
}) {
  const isMobile = useIsMobile();

  const sizes = {
    small: { padding: '0.5rem 1rem', fontSize: '0.875rem' },
    medium: { padding: '0.75rem 1.5rem', fontSize: '1rem' },
    large: { padding: '1rem 2rem', fontSize: '1.125rem' },
  };

  const variants = {
    primary: {
      background: 'linear-gradient(135deg, #5B73F7 0%, #7C3AED 100%)',
      color: '#FFFFFF',
    },
    secondary: {
      background: '#F3F4F6',
      color: '#1F2937',
    },
    outline: {
      background: 'transparent',
      color: '#5B73F7',
      border: '2px solid #5B73F7',
    },
  };

  const currentSize = sizes[size];
  const currentVariant = variants[variant];

  const style = {
    ...currentSize,
    ...currentVariant,
    border: variant === 'outline' ? '2px solid #5B73F7' : 'none',
    borderRadius: '0.5rem',
    fontWeight: 600,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    width: isMobile && fullWidthMobile ? '100%' : 'auto',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };

  return (
    <button
      style={style}
      onClick={onClick}
      className={className}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      {children}
    </button>
  );
}

/**
 * Responsive Spacer
 * Adds vertical space that adjusts based on screen size
 */
export function ResponsiveSpacer({ size = 'medium' }) {
  const breakpoint = useBreakpoint();

  const spaces = {
    small: { xs: '0.5rem', sm: '0.75rem', md: '1rem', lg: '1rem' },
    medium: { xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2rem' },
    large: { xs: '2rem', sm: '3rem', md: '4rem', lg: '4rem' },
  };

  const currentSpace = spaces[size]?.[breakpoint] || spaces.medium.lg;

  return <div style={{ height: currentSpace }} />;
}

/**
 * Responsive Section
 * Wrapper for page sections with appropriate padding
 */
export function ResponsiveSection({
  children,
  padding = 'medium',
  background = '#FFFFFF',
  className = ''
}) {
  const breakpoint = useBreakpoint();

  const paddings = {
    small: { xs: '1rem', sm: '1.5rem', md: '2rem', lg: '2rem' },
    medium: { xs: '2rem', sm: '3rem', md: '4rem', lg: '5rem' },
    large: { xs: '3rem', sm: '4rem', md: '6rem', lg: '8rem' },
  };

  const currentPadding = paddings[padding]?.[breakpoint] || paddings.medium.lg;

  const style = {
    padding: currentPadding,
    background,
  };

  return <section style={style} className={className}>{children}</section>;
}

/**
 * Responsive Modal
 * Modal that adjusts size based on screen size
 */
export function ResponsiveModal({
  children,
  isOpen,
  onClose,
  size = 'medium',
  className = ''
}) {
  const breakpoint = useBreakpoint();

  const sizes = {
    small: { maxWidth: '400px' },
    medium: { maxWidth: '500px' },
    large: { maxWidth: '700px' },
    fullscreen: { maxWidth: '100%' },
  };

  const currentSize = sizes[breakpoint === 'xs' ? 'fullscreen' : size];

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem',
        zIndex: 2000,
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#FFFFFF',
          borderRadius: '1rem',
          maxWidth: currentSize.maxWidth,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto',
          padding: breakpoint === 'xs' ? '1rem' : '1.5rem',
        }}
        onClick={(e) => e.stopPropagation()}
        className={className}
      >
        {children}
      </div>
    </div>
  );
}
