export const COLORS = {
  PRIMARY: '#005bbb',
  SECONDARY: '#002f56',
  TERTIARY: '#00b8bb',
  QUARTERNARY: '#5bacf3',
  QUINERY: '#990000',
  TEXT: '#3e4b57',
  BACKGROUND: 'white',
  SECONDARY_TEXT: 'white',
  BORDER: '#CCC',
  ERROR: '#ff1507',
};
export const COLORS_DARK = {
  DARK: true,
  PRIMARY: '#222222',
  SECONDARY: '#2f9fd0',
  TERTIARY: '#28D6C0',
  QUARTERNARY: '#ff895e',
  QUINERY: '#990000',
  TEXT: '#ededed',
  BACKGROUND: '#121212',
  SECONDARY_TEXT: '#ededed',
  BORDER: '#afafaf',
  ERROR: '#fb3c36',
  DARK_GRAY: '#707070',
  DARKER_GRAY: '#2d2d2d',
};
// export const COLORS_DARK = {
//   PRIMARY: '#222222',
//   SECONDARY: '#2f9fd0',
//   TERTIARY: '#28D6C0',
//   QUARTERNARY: '#F12B7E',
//   QUINERY: '#990000',
//   TEXT: 'white',
//   BACKGROUND: '#121212',
//   SECONDARY_TEXT: 'white',
//   BORDER: 'white',
// };

// export const COLORS_DARK = {
//   PRIMARY: '#07121B',
//   SECONDARY: '#28D6C0',
//   TERTIARY: '#F12B7E',
//   TEXT: '#CCC',
//   BACKGROUND: '#07121B',
//   SECONDARY_TEXT: '#6e6e6e',
// };

export const APP_ID = '@Plumo2:';
export const TOTAL_DIFFICULTY_LEVELS = 5;
export const LIGHT_MODE = 'light_mode';
export const DARK_MODE = 'dark_mode';

export const INTIAL_STATE = 'initial';
export const BREATHING_STATE = 'breathing';
export const REST_STATE = 'rest';
export const END_STATE = 'end';

export const ROUND_STATES = [
  INTIAL_STATE,
  BREATHING_STATE,
  REST_STATE,
  END_STATE,
];

export const INSTRUCTIONS = {
  [INTIAL_STATE]: {
    state: INTIAL_STATE,
    main: '',
    sub: `rounds total`,
    prompt: 'tap to begin',
  },
  [BREATHING_STATE]: {
    state: BREATHING_STATE,
    main: '',
    sub: '',
    prompt: ' Inhale & Exhale',
  },
  [REST_STATE]: {
    state: REST_STATE,
    main: 'Rest period',
    sub: '',
    prompt: '',
  },
  [END_STATE]: {
    state: END_STATE,
    main: 'Your training is complete',
    sub: '',
    prompt: 'Complete',
  },
};
