import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import AnimatedUnderline from '../AnimatedUnderline';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('AnimatedUnderline - unit test', () => {
  let component;
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render default', async () => {
    await act(async () => {
      component = create(<AnimatedUnderline duration={0} fadeOut={0} jest />);
    });
    expect(component).toMatchSnapshot();
  });
});
