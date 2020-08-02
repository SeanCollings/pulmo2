import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import Counter from '../Counter';

describe('Counter - unit test', () => {
  let component;

  afterEach(() => {
    cleanup();
  });

  test('should render in disabled state', async () => {
    await act(async () => {
      component = create(<Counter disabled jest duration={0} />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render in active state', async () => {
    await act(async () => {
      component = create(<Counter jest duration={0} />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should increase counter', async () => {
    await act(async () => {
      component = create(<Counter jest duration={0} />);
    });

    const counterButton = component.root.find(
      ({ props }) => props.testID === 'counterButton'
    );

    fireEvent.press(counterButton);
    expect(component).toMatchSnapshot();
  });

  test('should increase counter', async () => {
    await act(async () => {
      component = create(<Counter jest duration={0} />);
    });

    const counterButton = component.root.find(
      ({ props }) => props.testID === 'counterButton'
    );

    fireEvent.press(counterButton);
    expect(component).toMatchSnapshot();
  });

  test('should decrease counter on longPress', async () => {
    await act(async () => {
      component = create(<Counter jest countStart={10} duration={0} />);
    });

    const counterButton = component.root.find(
      ({ props }) => props.testID === 'counterButton'
    );

    fireEvent(counterButton, 'onLongPress');
    expect(component).toMatchSnapshot();
  });
});
