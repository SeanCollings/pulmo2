import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';

import App from './App';
import fixtures from './app-initialise/__fixtures__/index.fixtures';
import loadCustomExcercisesAsync from './app-initialise/load-custom-excercise';
import loadActivityIdArrayAsync from './app-initialise/load-activity-id-array';
import loadFavActivityIdArrayAsync from './app-initialise/load-fav-activity-id-array';
import loadProfileAsync from './app-initialise/load-profile';
import loadSettingsAsync from './app-initialise/load-settings';
import { LIGHT_MODE, DARK_MODE } from './constants/constants';

jest.useFakeTimers();
jest.mock('Dimensions');
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('./app-initialise/load-activity-id-array');
jest.mock('./app-initialise/load-custom-excercise');
jest.mock('./app-initialise/load-fav-activity-id-array');
jest.mock('./app-initialise/load-profile');
jest.mock('./app-initialise/load-settings');

describe('App', () => {
  let tree;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('success', () => {
    beforeEach(async () => {
      loadActivityIdArrayAsync.mockReturnValueOnce(fixtures.activityIdArray);
      loadCustomExcercisesAsync.mockReturnValueOnce(fixtures.customExcercise);
      loadFavActivityIdArrayAsync.mockReturnValueOnce(
        fixtures.favActivityIdArray
      );
      loadProfileAsync.mockReturnValueOnce(fixtures.profile);
    });

    test('renders in light mode', async () => {
      loadSettingsAsync.mockReturnValueOnce({
        ...fixtures.settings,
        theme: LIGHT_MODE,
      });

      await act(async () => {
        tree = create(<App />);
      });
      expect(tree).toMatchSnapshot();
    });

    test('renders in dark mode', async () => {
      loadSettingsAsync.mockReturnValueOnce({
        ...fixtures.settings,
        theme: DARK_MODE,
      });

      await act(async () => {
        tree = create(<App />);
      });
      expect(tree).toMatchSnapshot();
    });
  });

  describe('errors', () => {
    test('logs errors', async () => {
      console.log = jest.fn();
      loadActivityIdArrayAsync.mockReturnValueOnce(null);
      loadCustomExcercisesAsync.mockReturnValueOnce(
        new Promise((_, reject) => {
          reject(new Error('reject'));
        })
      );
      loadFavActivityIdArrayAsync.mockReturnValueOnce(null);
      loadProfileAsync.mockReturnValueOnce(null);
      loadSettingsAsync.mockReturnValueOnce(null);

      await act(async () => create(<App />));
      expect(console.log).toHaveBeenCalled();
    });
  });
});
