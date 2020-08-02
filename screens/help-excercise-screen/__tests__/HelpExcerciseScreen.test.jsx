import React from 'react';
import { act, create } from 'react-test-renderer';
import HelpExcerciseScreen, {
  helpExcerciseScreenOptions,
} from '../HelpExcerciseScreen';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('HelpExcerciseScreen - unit test', () => {
  test('should render', async () => {
    await act(async () => {
      tree = create(<HelpExcerciseScreen />);
    });

    expect(tree).toMatchSnapshot();
  });

  describe('helpExcerciseScreenOptions', () => {
    test('options', () => {
      const options = helpExcerciseScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = helpExcerciseScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
