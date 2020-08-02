import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ModalEndActivity from '../ModalEndActivity';

jest.useFakeTimers();

describe('ModalEndActivity - unit test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render default', async () => {
    await act(async () => {
      component = create(<ModalEndActivity animationType="none" />);
    });

    expect(component).toMatchSnapshot();
  });

  test('should handle resume activity button press', async () => {
    const resumeActivity = jest.fn();

    await act(async () => {
      component = create(
        <ModalEndActivity
          resumeActivity={resumeActivity}
          animationType="none"
        />
      );
    });

    const resumeActivityButton = component.root.find(
      ({ props }) => props.testID === 'resumeActivity'
    );

    fireEvent.press(resumeActivityButton);
    expect(resumeActivity).toHaveBeenCalled();
  });

  test('should handle confirm ernd activity button press', async () => {
    const confirmModal = jest.fn();

    await act(async () => {
      component = create(
        <ModalEndActivity confirmModal={confirmModal} animationType="none" />
      );
    });

    const confirmModalButton = component.root.find(
      ({ props }) => props.testID === 'confirmModal'
    );

    fireEvent.press(confirmModalButton);
    expect(confirmModal).toHaveBeenCalled();
  });
});
