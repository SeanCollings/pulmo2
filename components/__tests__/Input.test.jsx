import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import Input from '../Input';

describe('Input - unit test', () => {
  let component;
  const value = 'Input';

  afterEach(() => {
    cleanup();
  });

  test('should render', async () => {
    const onChangeText = () => {};

    await act(async () => {
      component = create(<Input value={value} onChangeText={onChangeText} />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should handle text input', async () => {
    const onChangeText = jest.fn();

    await act(async () => {
      component = create(<Input value={value} onChangeText={onChangeText} />);
    });

    const textInputHandler = component.root.find(
      ({ props }) => props.testID === 'textInput'
    );

    fireEvent(textInputHandler, 'onChangeText', 'N');
    expect(onChangeText).toHaveBeenCalled();
  });

  test('should not allow text input of length greater than the maximum', async () => {
    const onChangeText = jest.fn();

    await act(async () => {
      component = create(
        <Input value={value} onChangeText={onChangeText} maxLength={2} />
      );
    });

    const textInputHandler = component.root.find(
      ({ props }) => props.testID === 'textInput'
    );

    fireEvent(textInputHandler, 'onChangeText', 'New Text');
    expect(onChangeText).toHaveBeenCalledWith('Ne');
  });
});
