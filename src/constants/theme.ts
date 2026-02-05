// Theme constants - centralized colors, fonts, and animation timing

export const colors = {
  // Primary JWST-inspired palette
  berylliumGold: '#c9a227',
  berylliumGoldHex: 0xc9a227,
  berylliumGoldRgb: '201, 162, 39',
  goldLight: '#d4af37',

  // Backgrounds
  black: '#0a0a0a',
  richBlack: '#001011',

  // Text
  white: '#f5f5f5',

  // Derived colors (for hover states, etc.)
  get berylliumGoldFill() {
    return `rgba(${this.berylliumGoldRgb}, 0.15)`;
  },
  get berylliumGoldFillHover() {
    return `rgba(${this.berylliumGoldRgb}, 0.3)`;
  },
  get berylliumGoldGlow() {
    return `rgba(${this.berylliumGoldRgb}, 0.6)`;
  },
} as const;

export const fonts = {
  heading: "'Squada One', sans-serif",
  body: "'Overpass', sans-serif",
} as const;

export const animation = {
  // Durations (in ms)
  duration: {
    fast: 200,
    normal: 400,
    slow: 800,
    entrance: 400, // Per-hexagon animation duration
  },

  // Delays (in ms)
  delay: {
    stagger: 120, // Delay between each sequential hexagon
    scrollTrigger: 150,
  },

  // Scale values
  scale: {
    initial: 0.01,
    final: 1,
  },

  // Intersection observer thresholds
  threshold: {
    enter: 0.5,
    leave: 0.1,
  },
} as const;

export const layout = {
  hexMap: {
    defaultWidth: 800,
    defaultHeight: 700,
    radiusDivisor: 5, // hexRadius = min(width, height) / radiusDivisor
  },
  welcome: {
    cameraZ: 600,
    hexRadius: 280,
    hexHeight: 60,
  },
} as const;
