import { INSTRUCTIONS } from '../constants/constants';

export const INPUT_TOGGLE = 'INPUT_TOGGLE';
export const INPUT_BREATH = 'INPUT_BREATH';
export const INPUT_REST = 'INPUT_REST';
export const INPUT_END = 'INPUT_END';
export const INPUT_STOP = 'INPUT_STOP';

export const inputInitialState = {
  isActive: false,
  currentRound: 0,
  instructions: INSTRUCTIONS.initial,
  countDownTime: 0,
};

export const inputReducer = (state, action) => {
  switch (action.type) {
    case INPUT_TOGGLE:
      return { ...state, isActive: action.isActive };
    case INPUT_BREATH:
      return {
        ...state,
        isActive: false,
        currentRound: action.currentRound,
        instructions: INSTRUCTIONS.breathing,
        countDownTime: action.countDownTime,
      };
    case INPUT_REST:
      return {
        ...state,
        isActive: true,
        instructions: INSTRUCTIONS.rest,
      };
    case INPUT_END:
      return {
        ...state,
        isActive: false,
        instructions: INSTRUCTIONS.end,
        countDownTime: 0,
      };
    case INPUT_STOP:
      return inputInitialState;
    default:
      return state;
  }
};
