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
};
// export const COLORS = {
//   PRIMARY: '#07121B',
//   SECONDARY: '#2f9fd0',
//   TERTIARY: '#28D6C0',
//   QUARTERNARY: '#F12B7E',
//   QUINERY: '#990000',
//   TEXT: 'white',
//   BACKGROUND: '#07121B',
//   SECONDARY_TEXT: 'white',
//   BORDER: 'white',
// };

export const COLORS_DARK = {
  PRIMARY: '#07121B',
  SECONDARY: '#28D6C0',
  TERTIARY: '#F12B7E',
  TEXT: '#CCC',
  BACKGROUND: '#07121B',
  SECONDARY_TEXT: '#6e6e6e',
};

export const APP_ID = '@Plumo2:';
export const TOTAL_DIFFICULTY_LEVELS = 5;

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
