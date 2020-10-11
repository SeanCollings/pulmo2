import React from 'react';
import { act, create } from 'react-test-renderer';
import * as SplashScreen from 'expo-splash-screen';

import App from './App';
import fixtures from './app-initialise/__fixtures__/index.fixtures';
import loadCustomExcercisesAsync from './app-initialise/load-custom-excercise';
import loadActivityIdArrayAsync from './app-initialise/load-activity-id-array';
import loadFavActivityIdArrayAsync from './app-initialise/load-fav-activity-id-array';
import loadProfileAsync from './app-initialise/load-profile';
import loadSettingsAsync from './app-initialise/load-settings';
import { LIGHT_MODE } from './constants/constants';
import { getAsyncData } from './helpers/storage';
import { STRENGTH_KEY } from './data';

jest.useFakeTimers();
jest.mock('Dimensions');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('./app-initialise/load-activity-id-array');
jest.mock('./app-initialise/load-custom-excercise');
jest.mock('./app-initialise/load-fav-activity-id-array');
jest.mock('./app-initialise/load-profile');
jest.mock('./app-initialise/load-settings');
jest.mock('./helpers/storage');
jest.mock('expo-splash-screen', () => ({
  preventAutoHideAsync: jest.fn(),
}));

describe('App', () => {
  let tree;

  test('should hasve 1 child', async () => {
    SplashScreen.preventAutoHideAsync.mockImplementation(() =>
      Promise.resolve()
    );
    getAsyncData.mockReturnValueOnce([11, STRENGTH_KEY]);
    loadActivityIdArrayAsync.mockReturnValueOnce(fixtures.activityIdArray);
    loadCustomExcercisesAsync.mockReturnValueOnce(fixtures.customExcercise);
    loadFavActivityIdArrayAsync.mockReturnValueOnce(
      fixtures.favActivityIdArray
    );
    loadProfileAsync.mockReturnValueOnce(fixtures.profile);
    loadSettingsAsync.mockReturnValueOnce({
      ...fixtures.settings,
      theme: LIGHT_MODE,
    });

    await act(async () => {
      tree = create(<App />);
    });

    expect(tree.toJSON().children.length).toBe(1);
    expect(tree).toMatchSnapshot();
  });
});
