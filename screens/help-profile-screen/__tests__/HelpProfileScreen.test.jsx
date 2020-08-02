import React from 'react';
import { act, create } from 'react-test-renderer';
import HelpProfileScreen, {
  helpProfileScreenOptions,
} from '../HelpProfileScreen';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('HelpProfileScreen - unit test', () => {
  test('should render', async () => {
    await act(async () => {
      tree = create(<HelpProfileScreen />);
    });

    expect(tree).toMatchSnapshot();
  });

  describe('helpProfileScreenOptions', () => {
    test('options', () => {
      const options = helpProfileScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = helpProfileScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
