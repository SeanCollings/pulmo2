import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import HomeScreen, { homeScreenOptions } from '../HomeScreen';
import HistoryContextProvider from '../../../context/history-context';
import CustomExcerciseContext from '../../../context/custom-excercise-context';
import ProfileContext from '../../../context/profile-context';
import ExcerciseContext from '../../../context/excercise-context';
import { useIsFocused } from '@react-navigation/native';
import { getAsyncData } from '../../../helpers/storage';
import { ENDURANCE_KEY } from '../../../data';
import { INPUT_END } from '../../../hooks/inputReducer';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('@react-navigation/native');
jest.mock('../../../helpers/storage');

describe('HomeScreen - unit test', () => {
  let component;
  const navigation = { goBack: () => {} };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render the default excercise if there is no excercise', async () => {
    useIsFocused.mockReturnValueOnce(true);
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <CustomExcerciseContext>
            <ProfileContext>
              <ExcerciseContext>
                <HomeScreen navigation={navigation} />
              </ExcerciseContext>
            </ProfileContext>
          </CustomExcerciseContext>
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should render the active excercise if there is one', async () => {
    useIsFocused.mockReturnValueOnce(true);
    getAsyncData.mockReturnValueOnce([21, ENDURANCE_KEY]);

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <CustomExcerciseContext>
            <ProfileContext>
              <ExcerciseContext>
                <HomeScreen navigation={navigation} />
              </ExcerciseContext>
            </ProfileContext>
          </CustomExcerciseContext>
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  describe('homeScreenOptions', () => {
    test('options', () => {
      const options = homeScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = homeScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });

    test('headerRight', () => {
      const headerRight = homeScreenOptions().headerRight({
        tintColor: 'white',
      });
      expect(headerRight).toMatchSnapshot();
    });

    test('should handle headerRight navigate to HomeHelp', async () => {
      const navigate = jest.fn();
      const navData = { navigation: { navigate } };

      await act(async () => {
        component = create(
          homeScreenOptions(navData).headerRight({
            tintColor: 'white',
          })
        );
      });

      const headerButton = component.root.find(
        ({ props }) => props.title === 'help'
      );
      fireEvent.press(headerButton);
      expect(navigate).toHaveBeenCalledWith('HomeHelp');
    });

    test('tabBarIcon', () => {
      const tabBarIcon = homeScreenOptions().tabBarIcon({
        color: 'white',
      });
      expect(tabBarIcon).toMatchSnapshot();
    });
  });
});
