import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ModalExcercise from '../ModalExcercise';

jest.useFakeTimers();

describe('ModalExcercise - unit test', () => {
  const excercise = {
    id: 21,
    title: 'Modal Excercise',
    cycles: '12',
    rest: '10',
    rounds: '5',
  };

  afterEach(() => {
    cleanup();
  });

  test('should render default', async () => {
    await act(async () => {
      component = create(<ModalExcercise />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render with a non editable excercise selected', async () => {
    await act(async () => {
      component = create(<ModalExcercise excercise={excercise} />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render with an editable excercise selected', async () => {
    await act(async () => {
      component = create(<ModalExcercise excercise={excercise} isEditable />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render with an editable empty excercise', async () => {
    await act(async () => {
      component = create(<ModalExcercise isEditable />);
    });
    expect(component).toMatchSnapshot();
  });

  test('should render in the editable state when edit button pressed and there is an excerise and it is editable', async () => {
    await act(async () => {
      component = create(<ModalExcercise isEditable excercise={excercise} />);
    });

    const editButton = component.root.find(
      ({ props }) => props.testID === 'editButton'
    );
    fireEvent.press(editButton);

    expect(component).toMatchSnapshot();
  });

  describe('Create new excercise', () => {
    test('should handle update existing excercise', async () => {
      const confirmSelectCustomModal = jest.fn();

      await act(async () => {
        component = create(
          <ModalExcercise
            isEditable
            excercise={excercise}
            confirmSelectCustomModal={confirmSelectCustomModal}
          />
        );
      });

      const createNewExcerciseHandler = component.root.find(
        ({ props }) => props.testID === 'confirmModal'
      );
      fireEvent.press(createNewExcerciseHandler);
      expect(confirmSelectCustomModal).toHaveBeenCalled();
    });

    describe('Validation', () => {
      test('should show errors if validation fails', async () => {
        await act(async () => {
          component = create(<ModalExcercise isEditable />);
        });

        const createNewExcerciseHandler = component.root.find(
          ({ props }) => props.testID === 'confirmModal'
        );
        fireEvent.press(createNewExcerciseHandler);
        expect(component).toMatchSnapshot();
      });

      test('should handle create new when no existing excercise and validation passes', async () => {
        const confirmModal = jest.fn();

        await act(async () => {
          component = create(
            <ModalExcercise isEditable confirmModal={confirmModal} />
          );
        });

        const textInputTitle = component.root.find(
          ({ props }) => props.testID === `textInput_Title`
        );
        const textInputCycles = component.root.find(
          ({ props }) => props.testID === `textInput_Inhale & exhale`
        );
        const textInputRest = component.root.find(
          ({ props }) => props.testID === `textInput_Rest`
        );
        const textInputRounds = component.root.find(
          ({ props }) => props.testID === `textInput_Rounds`
        );
        const createNewExcerciseHandler = component.root.find(
          ({ props }) => props.testID === 'confirmModal'
        );

        fireEvent(textInputTitle, 'onChangeText', 'New Title');
        fireEvent(textInputCycles, 'onChangeText', '12');
        fireEvent(textInputRest, 'onChangeText', '45');
        fireEvent(textInputRounds, 'onChangeText', '4');
        fireEvent.press(createNewExcerciseHandler);

        expect(confirmModal).toHaveBeenCalled();
      });
    });
  });

  describe('delete excercise prompt', () => {
    test('should render the delete excercise prompt', async () => {
      await act(async () => {
        component = create(<ModalExcercise excercise={excercise} isEditable />);
      });

      const deleteButton = component.root.find(
        ({ props }) => props.testID === 'deleteButton'
      );

      fireEvent.press(deleteButton);
      expect(component).toMatchSnapshot();
    });

    test('should handle cancel delete activity', async () => {
      await act(async () => {
        component = create(<ModalExcercise excercise={excercise} isEditable />);
      });

      const deleteButton = component.root.find(
        ({ props }) => props.testID === 'deleteButton'
      );
      fireEvent.press(deleteButton);

      const cancelDeleteButton = component.root.find(
        ({ props }) => props.testID === 'cancelDelete'
      );
      fireEvent.press(cancelDeleteButton);

      expect(component).toMatchSnapshot();
    });

    test('should handle confirm delete activity', async () => {
      const deleteCustomModal = jest.fn();
      const cancelModal = jest.fn();

      await act(async () => {
        component = create(
          <ModalExcercise
            excercise={excercise}
            isEditable
            deleteCustomModal={deleteCustomModal}
            cancelModal={cancelModal}
          />
        );
      });

      const deleteButton = component.root.find(
        ({ props }) => props.testID === 'deleteButton'
      );
      fireEvent.press(deleteButton);

      const confirmDeleteButton = component.root.find(
        ({ props }) => props.testID === 'confirmDelete'
      );
      fireEvent.press(confirmDeleteButton);

      expect(deleteCustomModal).toHaveBeenCalled();
      expect(cancelModal).toHaveBeenCalled();
    });
  });
});
