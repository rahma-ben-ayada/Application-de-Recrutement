// Professional Modern Theme for SmartRecruit
// Refined color palette with excellent accessibility and contemporary design

export const professionalTheme = {
  // Primary Colors - Professional Navy & Vibrant Blue
  colors: {
    primary: {
      50: '#F0F4FF',
      100: '#E0EAFF',
      200: '#C7D7FE',
      300: '#A4B9FC',
      400: '#8093F8',
      500: '#5B73F7',
      600: '#4B5CF7',
      700: '#4147E5',
      800: '#3B3FD9',
      900: '#3638BB',
    },
    // Secondary - Teal Accent
    secondary: {
      50: '#F0FDFA',
      100: '#CCFBF5',
      200: '#99F6E4',
      300: '#5CEADD',
      400: '#2ADFD4',
      500: '#14D2C4',
      600: '#0DB5A9',
      700: '#0E998F',
    },
    // Neutral - Refined Grays
    neutral: {
      50: '#FAFAFA',
      100: '#F4F4F5',
      200: '#E4E4E7',
      300: '#D4D4D8',
      400: '#A1A1AA',
      500: '#71717A',
      600: '#52525B',
      700: '#3F3F46',
      800: '#27272A',
      900: '#18181B',
      950: '#09090B',
    },
    // Semantic Colors
    success: {
      light: '#D1FAE5',
      DEFAULT: '#10B981',
      dark: '#059669',
    },
    error: {
      light: '#FEE2E2',
      DEFAULT: '#EF4444',
      dark: '#DC2626',
    },
    warning: {
      light: '#FEF3C7',
      DEFAULT: '#F59E0B',
      dark: '#D97706',
    },
    info: {
      light: '#DBEAFE',
      DEFAULT: '#3B82F6',
      dark: '#2563EB',
    },
  },

  // Modern Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    secondary: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
    dark: 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
    subtle: 'linear-gradient(135deg, #F8FAFC 0%, #F1F5F9 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    accent: 'linear-gradient(135deg, #14D2C4 0%, #0DB5A9 100%)',
  },

  // Premium Shadows
  shadows: {
    xs: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    sm: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    glow: '0 0 40px rgba(91, 115, 247, 0.3)',
    glowSm: '0 0 20px rgba(91, 115, 247, 0.2)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
  },

  // Glassmorphism
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.8)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    dark: {
      background: 'rgba(15, 23, 42, 0.8)',
      backdropFilter: 'blur(12px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(8px)',
      border: '1px solid rgba(0, 0, 0, 0.05)',
    },
  },

  // Typography Scale
  fonts: {
    sans: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
    display: "'Plus Jakarta Sans', sans-serif",
    mono: "'JetBrains Mono', monospace",
  },

  // Font Sizes - Modular Scale
  fontSizes: {
    xs: '0.75rem',     // 12px
    sm: '0.875rem',    // 14px
    base: '1rem',      // 16px
    lg: '1.125rem',    // 18px
    xl: '1.25rem',     // 20px
    '2xl': '1.5rem',   // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
    '5xl': '3rem',     // 48px
    '6xl': '3.75rem',  // 60px
  },

  // Border Radius - Modern & Soft
  radius: {
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.375rem',  // 6px
    lg: '0.5rem',    // 8px
    xl: '0.75rem',   // 12px
    '2xl': '1rem',   // 16px
    '3xl': '1.5rem', // 24px
    full: '9999px',
  },

  // Spacing Scale
  spacing: {
    0: '0',
    1: '0.25rem',  // 4px
    2: '0.5rem',   // 8px
    3: '0.75rem',  // 12px
    4: '1rem',     // 16px
    5: '1.25rem',  // 20px
    6: '1.5rem',   // 24px
    8: '2rem',     // 32px
    10: '2.5rem',  // 40px
    12: '3rem',    // 48px
    16: '4rem',    // 64px
    20: '5rem',    // 80px
  },

  // Transitions
  transitions: {
    fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
    default: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: '500ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Z-index scale
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modalBackdrop: 1040,
    modal: 1050,
    popover: 1060,
    tooltip: 1070,
  },
};

// CSS Keyframes for smooth animations
export const professionalKeyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fadeInDown {
    from {
      opacity: 0;
      transform: translateY(-20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }

  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }

  @keyframes float {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-10px);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes shimmer {
    0% {
      background-position: -1000px 0;
    }
    100% {
      background-position: 1000px 0;
    }
  }

  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }

  @keyframes borderBeam {
    0% {
      border-color: transparent;
    }
    50% {
      border-color: #5B73F7;
    }
    100% {
      border-color: transparent;
    }
  }

  @keyframes glow {
    from {
      box-shadow: 0 0 20px rgba(91, 115, 247, 0.2);
    }
    to {
      box-shadow: 0 0 30px rgba(91, 115, 247, 0.4);
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  @keyframes bounce {
    0%, 100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-25%);
    }
  }

  @keyframes ripple {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;

// Utility functions for common styles
export const createButtonStyle = (variant = 'primary', size = 'md') => {
  const variants = {
    primary: {
      background: professionalTheme.gradients.primary,
      color: '#FFFFFF',
      border: 'none',
    },
    secondary: {
      background: professionalTheme.colors.neutral[100],
      color: professionalTheme.colors.neutral[900],
      border: `1px solid ${professionalTheme.colors.neutral[200]}`,
    },
    outline: {
      background: 'transparent',
      color: professionalTheme.colors.primary[600],
      border: `1px solid ${professionalTheme.colors.primary[300]}`,
    },
    ghost: {
      background: 'transparent',
      color: professionalTheme.colors.neutral[700],
      border: 'none',
    },
  };

  const sizes = {
    sm: {
      padding: '0.5rem 1rem',
      fontSize: professionalTheme.fontSizes.sm,
      borderRadius: professionalTheme.radius.md,
    },
    md: {
      padding: '0.625rem 1.25rem',
      fontSize: professionalTheme.fontSizes.sm,
      borderRadius: professionalTheme.radius.lg,
    },
    lg: {
      padding: '0.75rem 1.5rem',
      fontSize: professionalTheme.fontSizes.base,
      borderRadius: professionalTheme.radius.xl,
    },
  };

  return {
    ...variants[variant],
    ...sizes[size],
    cursor: 'pointer',
    fontWeight: 500,
    transition: professionalTheme.transitions.default,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  };
};

export const createInputStyle = (state = 'default') => {
  const states = {
    default: {
      border: `1px solid ${professionalTheme.colors.neutral[300]}`,
      background: '#FFFFFF',
    },
    focus: {
      border: `2px solid ${professionalTheme.colors.primary[500]}`,
      background: '#FFFFFF',
      boxShadow: '0 0 0 3px rgba(91, 115, 247, 0.1)',
    },
    error: {
      border: `2px solid ${professionalTheme.colors.error.DEFAULT}`,
      background: '#FEF2F2',
    },
  };

  return {
    ...states[state],
    borderRadius: professionalTheme.radius.lg,
    padding: '0.625rem 0.875rem',
    fontSize: professionalTheme.fontSizes.sm,
    color: professionalTheme.colors.neutral[900],
    outline: 'none',
    transition: professionalTheme.transitions.fast,
    width: '100%',
  };
};

export const createCardStyle = (elevated = false) => ({
  background: professionalTheme.glass.card.background,
  backdropFilter: professionalTheme.glass.card.backdropFilter,
  border: professionalTheme.glass.card.border,
  borderRadius: professionalTheme.radius['2xl'],
  padding: professionalTheme.spacing[6],
  boxShadow: elevated ? professionalTheme.shadows.xl : professionalTheme.shadows.md,
  transition: professionalTheme.transitions.default,
});

export default professionalTheme;
