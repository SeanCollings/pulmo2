import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import AppNavigator from '..';
import ProfileContextProvider from '../../context/profile-context';

jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('navigation', () => {
  let tree;
  const profile = {
    selected_level: 2,
    streak: {
      current: 0,
      lastActivity: '2020-07-26T15:15:43.411Z',
    },
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
      tree = create(
        <ProfileContextProvider profile={showDisclaimerProfile}>
          <AppNavigator />
        </ProfileContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('renders app if show disclaimer is false', async () => {
    await act(async () => {
      tree = create(
        <ProfileContextProvider profile={profile}>
          <AppNavigator />
        </ProfileContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });
});
