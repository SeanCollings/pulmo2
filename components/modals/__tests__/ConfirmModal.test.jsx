import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import ConfirmModal from '../ConfirmModal';

jest.useFakeTimers();

describe('ConfirmModal - unit test', () => {
  afterEach(() => {
    cleanup();
  });

  test('should render default', async () => {
    const cancelModal = () => {};
    const confirmModal = () => {};

    await act(async () => {
      component = create(
        <ConfirmModal cancelModal={cancelModal} confirmModal={confirmModal} />
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should render with custom header and mesassge', async () => {
    const cancelModal = () => {};
    const confirmModal = () => {};
    const header = 'ConfirmModal header';
    const message = 'ConfirmModal message';

    await act(async () => {
      component = create(
        <ConfirmModal
          cancelModal={cancelModal}
          confirmModal={confirmModal}
          header={header}
          message={message}
        />
      );
    });

    expect(component).toMatchSnapshot();
  });
});
