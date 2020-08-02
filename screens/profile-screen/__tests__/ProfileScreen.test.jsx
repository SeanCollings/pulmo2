import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ProfileScreen, { profileScreenOptions } from '../ProfileScreen';
import ProfileContextProvider from '../../../context/profile-context';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('ProfileScreen - unit test', () => {
  let component;

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    await act(async () => {
      component = create(
        <ProfileContextProvider>
          <ProfileScreen />
        </ProfileContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  describe('profileScreenOptions', () => {
    test('options', () => {
      const options = profileScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = profileScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });

    test('headerRight', () => {
      const headerRight = profileScreenOptions().headerRight({
        tintColor: 'white',
      });
      expect(headerRight).toMatchSnapshot();
    });

    test('should handle headerRight navigate to Settings', async () => {
      const navigate = jest.fn();
      const navData = { navigation: { navigate } };

      await act(async () => {
        component = create(
          profileScreenOptions(navData).headerRight({
            tintColor: 'white',
          })
        );
      });

      const headerButton = component.root.find(
        ({ props }) => props.title === 'settings'
      );
      fireEvent.press(headerButton);
      expect(navigate).toHaveBeenCalledWith('Settings');
    });

    test('should handle headerRight navigate to ProfileHelp', async () => {
      const navigate = jest.fn();
      const navData = { navigation: { navigate } };

      await act(async () => {
        component = create(
          profileScreenOptions(navData).headerRight({
            tintColor: 'white',
          })
        );
      });

      const headerButton = component.root.find(
        ({ props }) => props.title === 'help'
      );
      fireEvent.press(headerButton);
      expect(navigate).toHaveBeenCalledWith('ProfileHelp');
    });

    test('tabBarIcon', () => {
      const tabBarIcon = profileScreenOptions().tabBarIcon({
        color: 'white',
      });
      expect(tabBarIcon).toMatchSnapshot();
    });
  });
});
