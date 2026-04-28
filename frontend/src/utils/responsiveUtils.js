/**
 * Responsive Utilities for SmartRecruit
 * Provides hooks and utilities for responsive design
 */

import { useState, useEffect } from 'react';

// Breakpoints (matching the CSS system)
export const breakpoints = {
  xs: 375,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

/**
 * Hook to detect if screen is mobile
 */
export function useIsMobile(breakpoint = breakpoints.lg) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < breakpoint);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, [breakpoint]);

  return isMobile;
}

/**
 * Hook to detect if screen is tablet
 */
export function useIsTablet() {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const checkTablet = () => {
      const width = window.innerWidth;
      setIsTablet(width >= breakpoints.md && width < breakpoints.lg);
    };
    checkTablet();
    window.addEventListener('resize', checkTablet);
    return () => window.removeEventListener('resize', checkTablet);
  }, []);

  return isTablet;
}

/**
 * Hook to get current breakpoint
 */
export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState('lg');

  useEffect(() => {
    const getBreakpoint = () => {
      const width = window.innerWidth;
      if (width < breakpoints.xs) return 'xs';
      if (width < breakpoints.sm) return 'sm';
      if (width < breakpoints.md) return 'md';
      if (width < breakpoints.lg) return 'lg';
      if (width < breakpoints.xl) return 'xl';
      return '2xl';
    };
    getBreakpoint();
    window.addEventListener('resize', getBreakpoint);
    return () => window.removeEventListener('resize', getBreakpoint);
  }, []);

  return breakpoint;
}

/**
 * Hook to get window size
 */
export function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}

/**
 * Responsive style generator
 */
export function responsiveStyle(baseStyle, responsiveStyles = {}) {
  return {
    ...baseStyle,
    // Note: Media queries in inline styles don't work
    // Use CSS classes or styled-components instead
    // This is for documentation purposes
  };
}

/**
 * Grid columns based on screen size
 */
export function getGridColumns(breakpoint) {
  const gridColumns = {
    xs: 1,
    sm: 2,
    md: 2,
    lg: 3,
    xl: 4,
    '2xl': 4,
  };
  return gridColumns[breakpoint] || 3;
}

/**
 * Padding based on screen size
 */
export function getPadding(breakpoint) {
  const padding = {
    xs: '1rem',
    sm: '1.5rem',
    md: '2rem',
    lg: '2rem',
    xl: '2rem',
    '2xl': '2rem',
  };
  return padding[breakpoint] || '2rem';
}

/**
 * Font size based on screen size
 */
export function getFontSize(breakpoint) {
  const fontSize = {
    xs: '0.875rem',
    sm: '1rem',
    md: '1rem',
    lg: '1rem',
    xl: '1rem',
    '2xl': '1rem',
  };
  return fontSize[breakpoint] || '1rem';
}

/**
 * Spacing scale
 */
export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
  '2xl': '3rem',
  '3xl': '4rem',
};

/**
 * Container max widths
 */
export const containerWidths = {
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
};

/**
 * Responsive value getter
 */
export function getResponsiveValue(breakpoint, values) {
  if (typeof values === 'string' || typeof values === 'number') {
    return values;
  }
  return values[breakpoint] || values.lg || values.md || values.sm;
}

/**
 * Class name generator for responsive utilities
 */
export function responsiveClassName(baseClass, breakpoint, modifier) {
  if (!modifier) return baseClass;
  return `${baseClass}-${breakpoint}-${modifier}`;
}
