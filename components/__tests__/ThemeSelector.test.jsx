import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ThemeSelector from '../ThemeSelector';
import SettingsContextProvider from '../../context/settings-context';
import { storeAsyncData } from '../../helpers/storage';

jest.mock('../../helpers/storage');

describe('Slides - unit test', () => {
  // Hide console.error that I can't find a reason for yet:
  // Warning: dispatchCommand was called with a ref that isn't a native component.
  // Use React.forwardRef to get access to the underlying native component
  jest.spyOn(console, 'error').mockImplementation(jest.fn());

  let component;

  afterEach(() => {
    cleanup();
  });

  test('should render', async () => {
    await act(async () => {
      component = create(<ThemeSelector />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should enable theme change', async () => {
    storeAsyncData.mockReturnValueOnce(Promise.resolve());

    await act(async () => {
      component = create(
        <SettingsContextProvider>
          <ThemeSelector />
        </SettingsContextProvider>
      );
    });

    const valueChange = component.root.find(
      ({ props }) => props.testID === 'customSwitch_valueChange'
    );

    fireEvent(valueChange, 'onValueChange', true);
    expect(component).toMatchSnapshot();
  });
});
