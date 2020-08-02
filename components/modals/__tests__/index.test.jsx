import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import Modal from '../index';
import { Text } from 'react-native';

jest.useFakeTimers();

describe('Modal - unit test', () => {
  let component;
  afterEach(() => {
    cleanup();
  });

  test('should render default', async () => {
    await act(async () => {
      component = create(<Modal />);
    });

    expect(component).toMatchSnapshot();
  });

  test('should render with custom props', async () => {
    const cancelModal = () => {};
    const confirmModal = () => {};
    const header = 'Modal header';
    const cancelTitle = 'Modal cancelTitle';
    const confirmTitle = 'Modal confirmTitle';
    const headingColour = 'white';
    const TopLeft = () => <Text>TopLeft</Text>;
    const TopRight = () => <Text>TopRight</Text>;

    await act(async () => {
      component = create(
        <Modal
          cancelModal={cancelModal}
          confirmModal={confirmModal}
          header={header}
          cancelTitle={cancelTitle}
          confirmTitle={confirmTitle}
          headingColour={headingColour}
          TopLeft={TopLeft}
          TopRight={TopRight}
        />
      );
    });

    expect(component).toMatchSnapshot();
  });
});
