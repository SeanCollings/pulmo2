import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import Checkbox from '../Checkbox';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('Checkbox - unit test', () => {
  let component;
  const label = 'Checkbox';

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render in unchecked state', async () => {
    await act(async () => {
      component = create(<Checkbox state={false} label={label} />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render in checked state', async () => {
    await act(async () => {
      component = create(<Checkbox state label={label} />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should handle checkbox toggle', async () => {
    await act(async () => {
      component = create(<Checkbox state label={label} />);
    });

    const checkboxButton = component.root.find(
      ({ props }) => props.testID === 'checkboxButton'
    );

    fireEvent.press(checkboxButton);
  });
});
