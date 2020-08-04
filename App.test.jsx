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
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('success', () => {
    test('has 1 child', async () => {
      let tree;

      await act(async () => {
        tree = create(<App />);
      });
      expect(tree.toJSON().children.length).toBe(1);
    });

    // Set to test.skip as Azure produces a different snapshot for some reason.
    // Remove skip to test App workflow locally.
    test.skip('renders in light mode', async () => {
      let tree;
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
      expect(tree).toMatchSnapshot();
    });

    // Set to test.skip as Azure produces a different snapshot for some reason.
    // Remove skip to test App workflow locally.
    test.skip('renders in dark mode', async () => {
      let tree;
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
