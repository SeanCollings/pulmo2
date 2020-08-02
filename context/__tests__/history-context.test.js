import React, { useContext } from 'react';
import { create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import HistoryContextProvider, { HistoryContext } from '../history-context';

const MockComponent = () => {
  const context = useContext(HistoryContext);
  expect(context).toMatchSnapshot();
  return null;
};

describe('history-context', () => {
  afterEach(cleanup);

  test('unit test', () => {
    let context = create(
      <HistoryContextProvider>
        <MockComponent />
      </HistoryContextProvider>
    );

    expect(context).toMatchSnapshot();
  });
});
