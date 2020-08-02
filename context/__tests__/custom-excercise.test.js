import React, { useContext } from 'react';
import { create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import CustomExcerciseContextProvider, {
  CustomExcerciseContext,
} from '../custom-excercise-context';

const MockComponent = () => {
  const context = useContext(CustomExcerciseContext);
  expect(context).toMatchSnapshot();
  return null;
};

describe('custom-excercise-context', () => {
  afterEach(cleanup);

  test('unit test', () => {
    let context = create(
      <CustomExcerciseContextProvider>
        <MockComponent />
      </CustomExcerciseContextProvider>
    );

    expect(context).toMatchSnapshot();
  });
});
