import React, { useContext } from 'react';
import { create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import ExcerciseContextProvider, {
  ExcerciseContext,
} from '../excercise-context';
import { getAsyncData } from '../../helpers/storage';
import { STRENGTH_KEY } from '../../data';

jest.mock('../../helpers/storage');

const MockComponent = () => {
  const context = useContext(ExcerciseContext);
  expect(context).toMatchSnapshot();
  return null;
};

describe('excercise-context', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('unit test', () => {
    getAsyncData.mockReturnValueOnce();

    let context = create(
      <ExcerciseContextProvider>
        <MockComponent />
      </ExcerciseContextProvider>
    );

    expect(context).toMatchSnapshot();
  });
});
