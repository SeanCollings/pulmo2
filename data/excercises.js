import { DATA, STRENGTH_KEY, ENDURANCE_KEY, CUSTOM_KEY } from '.';

const STRENGTH = {
  id: STRENGTH_KEY,
  title: STRENGTH_KEY,
  icon: 'dumbbell',
  contents: DATA[STRENGTH_KEY],
};
const ENDURANCE = {
  id: ENDURANCE_KEY,
  title: ENDURANCE_KEY,
  icon: 'clock',
  contents: DATA[ENDURANCE_KEY],
};
const CUSTOM = {
  id: CUSTOM_KEY,
  title: CUSTOM_KEY,
  icon: 'wrench',
  contents: DATA[CUSTOM_KEY],
};

export const EXCERCISE_DATA = [STRENGTH, ENDURANCE, CUSTOM];
