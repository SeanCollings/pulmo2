import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ExcercisesScreen, { excercisesScreenOptions } from '../ExcercisesScreen';
import CustomExcerciseContext from '../../../context/custom-excercise-context';
import ProfileContext from '../../../context/profile-context';
import ExcerciseContext from '../../../context/excercise-context';
import { getAsyncData, storeAsyncData } from '../../../helpers/storage';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../../../helpers/storage');

describe('ExcercisesScreen - unit test', () => {
  let component;
  const navigation = { goBack: () => {} };
  const customExcercises = [
    {
      cycles: '12',
      id: 12345,
      rest: '5',
      rounds: '2',
      title: 'My Custom Workout',
    },
    {
      cycles: '30',
      id: 2345,
      rest: '2',
      rounds: '5',
      title: 'My bestercise',
    },
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={[]}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigation} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should render with custom excercises', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={customExcercises}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigation} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should render with custom excercises modal', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={customExcercises}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigation} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const customModal = component.root.find(
      ({ props }) => props.testID === `openExcerciseModal_2345`
    );

    fireEvent.press(customModal);
    expect(component).toMatchSnapshot();
  });

  test('should cancel custom excercises modal', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={customExcercises}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigation} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const customModal = component.root.find(
      ({ props }) => props.testID === `openExcerciseModal_2345`
    );
    fireEvent.press(customModal);
    const cancelModal = component.root.find(
      ({ props }) => props.testID === `cancelModal`
    );
    fireEvent.press(cancelModal);
  });

  test('should confirm custom excercises modal', async () => {
    getAsyncData.mockReturnValueOnce(null);
    storeAsyncData.mockReturnValueOnce(Promise.resolve());
    const navigationHome = { navigate: jest.fn() };

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={customExcercises}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigationHome} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const customModal = component.root.find(
      ({ props }) => props.testID === `openExcerciseModal_2345`
    );
    fireEvent.press(customModal);
    const confirmModal = component.root.find(
      ({ props }) => props.testID === `confirmModal`
    );
    fireEvent.press(confirmModal);

    expect(navigationHome.navigate).toHaveBeenCalledWith('Home');
  });

  test('should open create new custom excercises modal', async () => {
    getAsyncData.mockReturnValueOnce(null);
    const navigationHome = { navigate: jest.fn() };

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={customExcercises}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigationHome} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const createCustomModal = component.root.find(
      ({ props }) => props.testID === `createNewExcercise`
    );

    fireEvent.press(createCustomModal);
    expect(component).toMatchSnapshot();
  });

  test('should cancel create new custom excercises modal', async () => {
    getAsyncData.mockReturnValueOnce(null);
    const navigationHome = { navigate: jest.fn() };

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={customExcercises}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigationHome} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const createCustomModal = component.root.find(
      ({ props }) => props.testID === `createNewExcercise`
    );
    fireEvent.press(createCustomModal);
    const cancelModal = component.root.find(
      ({ props }) => props.testID === `cancelModal`
    );
    fireEvent.press(cancelModal);
  });

  test('should open excercise modal', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={[]}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigation} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const openExcerciseModal = component.root.find(
      ({ props }) => props.testID === `openExcerciseModal_21`
    );

    fireEvent.press(openExcerciseModal);
    expect(component).toMatchSnapshot();
  });

  test('should cancel excercise modal', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={[]}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigation} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const openExcerciseModal = component.root.find(
      ({ props }) => props.testID === `openExcerciseModal_21`
    );
    fireEvent.press(openExcerciseModal);
    const cancelModal = component.root.find(
      ({ props }) => props.testID === `cancelModal`
    );
    fireEvent.press(cancelModal);
    expect(component).toMatchSnapshot();
  });

  test('should confirm selected excercise modal and navigate Home', async () => {
    getAsyncData.mockReturnValueOnce(null);
    storeAsyncData.mockReturnValueOnce(Promise.resolve());
    const navigationHome = { navigate: jest.fn() };

    await act(async () => {
      component = create(
        <CustomExcerciseContext excercises={[]}>
          <ProfileContext>
            <ExcerciseContext>
              <ExcercisesScreen navigation={navigationHome} />
            </ExcerciseContext>
          </ProfileContext>
        </CustomExcerciseContext>
      );
    });

    const openExcerciseModal = component.root.find(
      ({ props }) => props.testID === `openExcerciseModal_21`
    );
    fireEvent.press(openExcerciseModal);
    const confirmModal = component.root.find(
      ({ props }) => props.testID === `confirmModal`
    );
    fireEvent.press(confirmModal);

    expect(navigationHome.navigate).toHaveBeenCalledWith('Home');
    expect(component).toMatchSnapshot();
  });

  describe('excercisesScreenOptions', () => {
    test('options', () => {
      const options = excercisesScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = excercisesScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });

    test('headerRight', () => {
      const headerRight = excercisesScreenOptions().headerRight({
        tintColor: 'white',
      });
      expect(headerRight).toMatchSnapshot();
    });

    test('should handle headerRight navigate to ExcerciseHelp', async () => {
      const navigate = jest.fn();
      const navData = { navigation: { navigate } };

      await act(async () => {
        component = create(
          excercisesScreenOptions(navData).headerRight({
            tintColor: 'white',
          })
        );
      });

      const headerButton = component.root.find(
        ({ props }) => props.title === 'help'
      );
      fireEvent.press(headerButton);
      expect(navigate).toHaveBeenCalledWith('ExcerciseHelp');
    });

    test('tabBarIcon', () => {
      const tabBarIcon = excercisesScreenOptions().tabBarIcon({
        color: 'white',
      });
      expect(tabBarIcon).toMatchSnapshot();
    });
  });
});
