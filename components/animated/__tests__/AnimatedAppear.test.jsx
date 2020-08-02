import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import AnimatedAppear from '../AnimatedAppear';
import { Text } from 'react-native';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('AnimatedAppear - unit test', () => {
  let component;
  const children = <Text>AnimatedAppear</Text>;

  afterEach(() => {
    cleanup();
  });

  test('should render default', async () => {
    await act(async () => {
      component = create(
        <AnimatedAppear isVisible duration={0}>
          {children}
        </AnimatedAppear>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should return null if isVisible is false', async () => {
    await act(async () => {
      component = create(
        <AnimatedAppear duration={0}>{children}</AnimatedAppear>
      );
    });

    expect(component).toMatchSnapshot();
  });
});
