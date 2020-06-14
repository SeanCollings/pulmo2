export const STRENGTH_KEY = 'Strength';
export const ENDURANCE_KEY = 'Endurance';
export const CUSTOM_KEY = 'Custom';

export const DATA = {
  [STRENGTH_KEY]: [
    {
      id: 11,
      title: 'Strength Level I',
      cycles: 10,
      rest: 60,
      rounds: 4,
    },
    {
      id: 12,
      title: 'Strength Level II',
      cycles: 10,
      rest: 60,
      rounds: 5,
    },
    {
      id: 13,
      title: 'Strength Level III',
      cycles: 12,
      rest: 50,
      rounds: 5,
    },
  ],
  [ENDURANCE_KEY]: [
    {
      id: 21,
      title: 'Endurance Level I',
      cycles: 10,
      rest: 30,
      rounds: 4,
    },
    {
      id: 22,
      title: 'Endurance Level II',
      cycles: 12,
      rest: 20,
      rounds: 5,
    },
    {
      id: 23,
      title: 'Endurance Level III',
      cycles: 15,
      rest: 20,
      rounds: 5,
    },
  ],
  [CUSTOM_KEY]: [],
};

export const DEFAULT_EXCERCISE = DATA[STRENGTH_KEY][0];
