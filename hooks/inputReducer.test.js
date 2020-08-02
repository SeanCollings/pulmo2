import {
  inputReducer,
  INPUT_TOGGLE,
  INPUT_BREATH,
  INPUT_REST,
  INPUT_END,
  INPUT_STOP,
} from './inputReducer';
import { INSTRUCTIONS } from '../constants/constants';

describe('inputReducer - unit tests', () => {
  const state = {
    isActive: false,
    currentRound: 0,
    instructions: INSTRUCTIONS.initial,
    countDownTime: 0,
  };

  test('case INPUT_TOGGLE:', () => {
    const action = { type: INPUT_TOGGLE, isActive: true };
    const result = inputReducer(state, action);
    expect(result).toMatchSnapshot();
  });

  test('case INPUT_BREATH:', () => {
    const action = { type: INPUT_BREATH, currentRound: 2, countDownTime: 10 };
    const result = inputReducer(state, action);
    expect(result).toMatchSnapshot();
  });

  test('case INPUT_REST:', () => {
    const action = { type: INPUT_REST };
    const result = inputReducer(state, action);
    expect(result).toMatchSnapshot();
  });

  test('case INPUT_END:', () => {
    const action = { type: INPUT_END };
    const result = inputReducer(state, action);
    expect(result).toMatchSnapshot();
  });

  test('case INPUT_STOP:', () => {
    const action = { type: INPUT_STOP };
    const result = inputReducer(state, action);
    expect(result).toMatchSnapshot();
  });

  test('default:', () => {
    const action = { type: 'other' };
    const result = inputReducer(state, action);
    expect(result).toMatchSnapshot();
  });
});
