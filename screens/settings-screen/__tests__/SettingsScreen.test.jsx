import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import SettingsScreen, { settingsScreenOptions } from '../SettingsScreen';

jest.useFakeTimers();
// jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('SettingsScreen - unit test', () => {
  let tree;
  const navigation = { setOptions: () => {} };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
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
