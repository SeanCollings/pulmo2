import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import Scroller from '../Scroller';
import { Text } from 'react-native';

describe('Scroller - unit test', () => {
  let component;

  const children = [
    <Text key={0}>one</Text>,
    <Text key={1}>two</Text>,
    <Text key={2}>three</Text>,
  ];

  afterEach(() => {
    cleanup();
  });

  test('should render', async () => {
    const onScroll = jest.fn();

    await act(async () => {
      component = create(
        <Scroller
          children={children}
          totalChildren={children.length}
          onScroll={onScroll}
          initialIndex={0}
        />
      );
    });
    expect(component).toMatchSnapshot();
  });

  test('should handle left press if index greater than 0', async () => {
    const onScroll = jest.fn();

    await act(async () => {
      component = create(
        <Scroller
          children={children}
          totalChildren={children.length}
          onScroll={onScroll}
          initialIndex={1}
        />
      );
    });

    const leftButton = component.root.find(
      ({ props }) => props.testID === 'left'
    );

    fireEvent.press(leftButton);
    expect(onScroll).toHaveBeenCalled();
  });

  test('should not call onScroll on left press if index equal to 0', async () => {
    const onScroll = jest.fn();

    await act(async () => {
      component = create(
        <Scroller
          children={children}
          totalChildren={children.length}
          onScroll={onScroll}
          initialIndex={0}
        />
      );
    });

    const leftButton = component.root.find(
      ({ props }) => props.testID === 'left'
    );

    fireEvent.press(leftButton);
    expect(onScroll).toHaveBeenCalledTimes(0);
  });

  test('should handle right press', async () => {
    const onScroll = jest.fn();

    await act(async () => {
      component = create(
        <Scroller
          children={children}
          totalChildren={children.length}
          onScroll={onScroll}
          initialIndex={1}
        />
      );
    });

    const rightButton = component.root.find(
      ({ props }) => props.testID === 'right'
    );

    fireEvent.press(rightButton);
    expect(onScroll).toHaveBeenCalled();
  });

  test('should not call onScroll on right press if index equal to children length', async () => {
    const onScroll = jest.fn();

    await act(async () => {
      component = create(
        <Scroller
          children={children}
          totalChildren={children.length}
          onScroll={onScroll}
          initialIndex={children.length - 1}
        />
      );
    });

    const rightButton = component.root.find(
      ({ props }) => props.testID === 'right'
    );

    fireEvent.press(rightButton);
    expect(onScroll).toHaveBeenCalledTimes(0);
  });
});
