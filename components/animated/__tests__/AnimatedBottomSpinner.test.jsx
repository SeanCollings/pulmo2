import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import AnimatedBottomSpinner from '../AnimatedBottomSpinner';

jest.useFakeTimers();

describe('AnimatedAppear - unit test', () => {
  let component;
  afterEach(() => {
    cleanup();
  });

  test('should render default', async () => {
    await act(async () => {
      component = create(<AnimatedBottomSpinner duration={0} />);
    });

    expect(component).toMatchSnapshot();
  });

  test('should render with animateIn', async () => {
    await act(async () => {
      component = create(<AnimatedBottomSpinner animateIn duration={0} />);
    });

    expect(component).toMatchSnapshot();
  });

  test('should render with animateOut', async () => {
    await act(async () => {
      component = create(<AnimatedBottomSpinner animateOut duration={0} />);
    });

    expect(component).toMatchSnapshot();
  });
});
