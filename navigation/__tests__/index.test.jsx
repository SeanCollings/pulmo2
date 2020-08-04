import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import AppNavigator from '..';
import ProfileContextProvider from '../../context/profile-context';
import ExcerciseContext from '../../context/excercise-context';
import HistoryContextProvider from '../../context/history-context';
import CustomExcerciseContext from '../../context/custom-excercise-context';
import { getAsyncData } from '../../helpers/storage';

jest.useFakeTimers();
jest.mock('Dimensions');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../../helpers/storage');

describe.skip('navigation', () => {
  let component;
  const profile = {
    selected_level: 2,
    streak: {
      current: 0,
      lastActivity: '2020-07-26T15:15:43.411Z',
    },
    disclaimer: { disclaimer_show: false, dont_show_again: true },
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('renders disclaimer if show disclaimer is true', async () => {
    const showDisclaimerProfile = {
      ...profile,
      disclaimer: { disclaimer_show: true, dont_show_again: true },
    };

    await act(async () => {
      component = create(
        <ProfileContextProvider profile={showDisclaimerProfile}>
          <AppNavigator />
        </ProfileContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('renders app if show disclaimer is false', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <CustomExcerciseContext>
            <ExcerciseContext>
              <ProfileContextProvider profile={profile}>
                <AppNavigator />
              </ProfileContextProvider>
            </ExcerciseContext>
          </CustomExcerciseContext>
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });
});
