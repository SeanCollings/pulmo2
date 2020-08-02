import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import Tabs from '../Tabs';

describe('Tabs - unit test', () => {
  let component;
  const options = ['one', 'two'];
  const onPress = jest.fn();
  const selectedTab = 'one';

  afterEach(() => {
    cleanup();
  });

  test('should render', async () => {
    await act(async () => {
      component = create(
        <Tabs options={options} onPress={onPress} selectedTab={selectedTab} />
      );
    });
    expect(component).toMatchSnapshot();
  });

  test('should handle option press', async () => {
    await act(async () => {
      component = create(
        <Tabs options={options} onPress={onPress} selectedTab={selectedTab} />
      );
    });

    const tabButton = component.root.find(
      ({ props }) => props.testID === `tab_${options[0]}`
    );

    fireEvent.press(tabButton);
    expect(onPress).toHaveBeenCalled();
  });
});
