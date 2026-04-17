// Luxury Theme for SmartRecruit - Premium International Design
export const luxuryTheme = {
  // Primary Colors - Sophisticated Navy & Gold
  colors: {
    // Deep Navy Palette
    navy: {
      50: '#F0F4F8',
      100: '#D9E2EC',
      200: '#BCCCDC',
      300: '#9FB3C8',
      400: '#829AB1',
      500: '#627D98',
      600: '#486581',
      700: '#334E68',
      800: '#243B53',
      900: '#102A43',
      950: '#0A1628',
    },
    // Gold Palette
    gold: {
      50: '#FFF9E6',
      100: '#FFF0C2',
      200: '#FFE699',
      300: '#FFDD70',
      400: '#FFD43D',
      500: '#D4AF37', // Classic Gold
      600: '#B8941F',
      700: '#9A7914',
      800: '#7C600F',
      900: '#5E480A',
    },
    // Royal Blue Accent
    royal: {
      50: '#E6F0FF',
      100: '#B3D9FF',
      200: '#80C2FF',
      300: '#4DABFF',
      400: '#1A94FF',
      500: '#0066FF',
      600: '#0052CC',
      700: '#003E99',
      800: '#002A66',
      900: '#001533',
    },
    // Emerald Success
    emerald: {
      50: '#E6FFF0',
      100: '#B3FFDB',
      200: '#80FFC6',
      300: '#4DFFB1',
      400: '#1AFF9C',
      500: '#00CC7A',
      600: '#00995C',
      700: '#00663D',
    },
    // Amethyst Accent
    amethyst: {
      50: '#F5F0FF',
      100: '#EBD9FF',
      200: '#E0C2FF',
      300: '#D6ABFF',
      400: '#CC94FF',
      500: '#C27DFF',
      600: '#994DFF',
      700: '#701DFF',
    },
    // Rose Error
    rose: {
      50: '#FFF0F3',
      100: '#FFD6DF',
      200: '#FFBCCB',
      300: '#FFA2B7',
      400: '#FF88A3',
      500: '#FF6E8F',
      600: '#E54B78',
      700: '#C93461',
    },
  },

  // Gradients
  gradients: {
    primary: 'linear-gradient(135deg, #0A1628 0%, #1E3A5F 50%, #2E5082 100%)',
    gold: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #B8941F 100%)',
    royal: 'linear-gradient(135deg, #0066FF 0%, #0099FF 100%)',
    emerald: 'linear-gradient(135deg, #00CC7A 0%, #00FF99 100%)',
    amethyst: 'linear-gradient(135deg, #C27DFF 0%, #994DFF 100%)',
    glass: 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
    card: 'linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)',
    dark: 'linear-gradient(135deg, #0A1628 0%, #1a2744 100%)',
  },

  // Shadows - Premium layered shadows
  shadows: {
    sm: '0 1px 2px 0 rgba(10, 22, 40, 0.05)',
    md: '0 4px 6px -1px rgba(10, 22, 40, 0.1), 0 2px 4px -1px rgba(10, 22, 40, 0.06)',
    lg: '0 10px 15px -3px rgba(10, 22, 40, 0.1), 0 4px 6px -2px rgba(10, 22, 40, 0.05)',
    xl: '0 20px 25px -5px rgba(10, 22, 40, 0.1), 0 10px 10px -5px rgba(10, 22, 40, 0.04)',
    '2xl': '0 25px 50px -12px rgba(10, 22, 40, 0.25)',
    glow: '0 0 40px rgba(212, 175, 55, 0.3)',
    'glow-sm': '0 0 20px rgba(212, 175, 55, 0.2)',
    gold: '0 8px 32px rgba(212, 175, 55, 0.25)',
    royal: '0 8px 32px rgba(0, 102, 255, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(10, 22, 40, 0.06)',
  },

  // Glassmorphism
  glass: {
    light: {
      background: 'rgba(255, 255, 255, 0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
    },
    dark: {
      background: 'rgba(10, 22, 40, 0.8)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.1)',
    },
    card: {
      background: 'rgba(255, 255, 255, 0.9)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
    },
  },

  // Typography
  fonts: {
    heading: '"Playfair Display", "Syne", serif',
    body: '"Inter", "DM Sans", -apple-system, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", monospace',
  },

  // Font Sizes
  fontSizes: {
    xs: '0.75rem',      // 12px
    sm: '0.875rem',     // 14px
    base: '1rem',       // 16px
    lg: '1.125rem',     // 18px
    xl: '1.25rem',      // 20px
    '2xl': '1.5rem',    // 24px
    '3xl': '1.875rem',  // 30px
    '4xl': '2.25rem',   // 36px
    '5xl': '3rem',      // 48px
    '6xl': '3.75rem',   // 60px
    '7xl': '4.5rem',    // 72px
  },

  // Border Radius
  radius: {
    sm: '0.375rem',   // 6px
    md: '0.5rem',     // 8px
    lg: '0.75rem',    // 12px
    xl: '1rem',       // 16px
    '2xl': '1.5rem',  // 24px
    '3xl': '2rem',    // 32px
    full: '9999px',
  },

  // Spacing
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
    '4xl': '6rem',   // 96px
  },

  // Animations
  animations: {
    fadeIn: 'fadeIn 0.6s ease-out',
    slideUp: 'slideUp 0.6s ease-out',
    slideDown: 'slideDown 0.6s ease-out',
    slideLeft: 'slideLeft 0.6s ease-out',
    slideRight: 'slideRight 0.6s ease-out',
    scaleIn: 'scaleIn 0.4s ease-out',
    float: 'float 6s ease-in-out infinite',
    pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
    shimmer: 'shimmer 2s linear infinite',
    glow: 'glow 2s ease-in-out infinite alternate',
  },

  // Transitions
  transitions: {
    default: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 0.15s cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'all 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  },

  // Z-index layers
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

// CSS Keyframes for animations
export const keyframes = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @keyframes slideUp {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @keyframes slideLeft {
    from { opacity: 0; transform: translateX(20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes slideRight {
    from { opacity: 0; transform: translateX(-20px); }
    to { opacity: 1; transform: translateX(0); }
  }

  @keyframes scaleIn {
    from { opacity: 0; transform: scale(0.9); }
    to { opacity: 1; transform: scale(1); }
  }

  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(2deg); }
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  @keyframes shimmer {
    0% { background-position: -1000px 0; }
    100% { background-position: 1000px 0; }
  }

  @keyframes glow {
    from { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3); }
    to { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6); }
  }

  @keyframes gradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  @keyframes spin {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
  }
`;

// Export style utilities
export const createGlassStyle = (variant = 'light') => ({
  background: luxuryTheme.glass[variant].background,
  backdropFilter: luxuryTheme.glass[variant].backdropFilter,
  border: luxuryTheme.glass[variant].border,
  borderRadius: luxuryTheme.radius.xl,
});

export const createGradientStyle = (gradient = 'primary') => ({
  background: luxuryTheme.gradients[gradient],
  backgroundSize: '200% 200%',
  animation: 'gradient 3s ease infinite',
});

export const createShadowStyle = (shadow = 'lg') => ({
  boxShadow: luxuryTheme.shadows[shadow],
});

export default luxuryTheme;
