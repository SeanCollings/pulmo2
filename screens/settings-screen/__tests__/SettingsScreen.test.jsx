import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import VersionCheck from 'react-native-version-check-expo';
import SettingsScreen, { settingsScreenOptions } from '../SettingsScreen';

jest.useFakeTimers();
jest.mock('react-native-version-check-expo', () => ({
  getLatestVersion: jest.fn(),
}));

describe('SettingsScreen - unit test', () => {
  // Hide console.error that I can't find a reason for yet:
  // Warning: dispatchCommand was called with a ref that isn't a native component.
  // Use React.forwardRef to get access to the underlying native component
  jest.spyOn(console, 'error').mockImplementation(jest.fn());

  let tree;
  const navigation = { setOptions: () => {} };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    VersionCheck.getLatestVersion.mockImplementation(() =>
      Promise.resolve('1.0.0')
    );

    await act(async () => {
      tree = create(<SettingsScreen navigation={navigation} />);
    });

    expect(tree).toMatchSnapshot();
  });

  describe('settingsScreenOptions', () => {
    test('options', () => {
      const options = settingsScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = settingsScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
