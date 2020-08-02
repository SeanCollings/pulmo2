import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ModalBegin from '../ModalBegin';
import ProfileContextProvider from '../../../context/profile-context';

jest.useFakeTimers();

describe('ModalBegin - unit test', () => {
  let component;

  afterEach(cleanup);

  test('should render default', async () => {
    const cancelModal = () => {};
    const confirmModal = () => {};
    const navigation = () => {};

    await act(async () => {
      component = create(
        <ProfileContextProvider>
          <ModalBegin
            cancelModal={cancelModal}
            confirmModal={confirmModal}
            navigation={navigation}
            animationType="none"
          />
        </ProfileContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should call updateLevelHandler', async () => {
    const cancelModal = jest.fn();
    const confirmModal = () => {};
    const navigation = { navigate: () => {} };

    await act(async () => {
      component = create(
        <ProfileContextProvider>
          <ModalBegin
            cancelModal={cancelModal}
            confirmModal={confirmModal}
            navigation={navigation}
            animationType="none"
          />
        </ProfileContextProvider>
      );
    });

    const cancelModalButton = component.root.find(
      ({ props }) => props.testID === 'cancelModal'
    );

    fireEvent.press(cancelModalButton);
    expect(cancelModal).toHaveBeenCalled();
  });
});
