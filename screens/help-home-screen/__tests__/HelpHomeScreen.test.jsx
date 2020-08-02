import React from 'react';
import { act, create } from 'react-test-renderer';
import HelpHomeScreen, { helpHomeScreenOptions } from '../HelpHomeScreen';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('HelpHomeScreen - unit test', () => {
  test('should render', async () => {
    await act(async () => {
      tree = create(<HelpHomeScreen />);
    });

    expect(tree).toMatchSnapshot();
  });

  describe('helpHomeScreenOptions', () => {
    test('options', () => {
      const options = helpHomeScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = helpHomeScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
