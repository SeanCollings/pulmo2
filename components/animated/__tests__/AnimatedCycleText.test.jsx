import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import AnimatedCycleText from '../AnimatedCycleText';

jest.useFakeTimers();

describe('AnimatedAppear - unit test', () => {
  let component;
  afterEach(() => {
    cleanup();
  });

  test('should return null if empty text array', async () => {
    await act(async () => {
      component = create(<AnimatedCycleText />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render default with a non-empty text array of length 1', async () => {
    await act(async () => {
      component = create(
        <AnimatedCycleText
          textArray={['AnimatedCycleText']}
          fadeIn={0}
          fadeOut={0}
        />
      );
    });
    expect(component).toMatchSnapshot();
  });

  test('should render with multiple text array values', async () => {
    await act(async () => {
      component = create(
        <AnimatedCycleText
          textArray={['one', 'two', 'three']}
          fadeIn={0}
          fadeOut={0}
        />
      );
    });
    expect(component).toMatchSnapshot();
  });
});
