import React, { useContext } from 'react';
import { create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import SettingsContextProvider, { SettingsContext } from '../settings-context';

jest.mock('../../helpers/storage');

const MockComponent = () => {
  const context = useContext(SettingsContext);
  expect(context).toMatchSnapshot();
  return null;
};

describe('settings-context', () => {
  afterEach(cleanup);

  test('unit test', () => {
    let context = create(
      <SettingsContextProvider>
        <MockComponent />
      </SettingsContextProvider>
    );

    expect(context).toMatchSnapshot();
  });
});
