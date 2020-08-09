import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ProfileScreen, { profileScreenOptions } from '../ProfileScreen';
import ProfileContextProvider, {
  WORK_AVE_DEV_CURRENT,
  WORK_AVE_DEV_TOTAL_ACTIVITIES,
  WORK_AVE_DEV_IMPROVEMENT,
  WORK_AVE_DEV_DOWN,
  WORK_AVERAGE_DEVIATION,
} from '../../../context/profile-context';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('ProfileScreen - unit test', () => {
  let component;
  const profile = {
    [WORK_AVERAGE_DEVIATION]: {
      [WORK_AVE_DEV_CURRENT]: 17.64,
      [WORK_AVE_DEV_TOTAL_ACTIVITIES]: 5,
      [WORK_AVE_DEV_IMPROVEMENT]: WORK_AVE_DEV_DOWN,
    },
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <ProfileScreen />
        </ProfileContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should call all activities bar selector', async () => {
    const navigation = { navigate: jest.fn() };
    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <ProfileScreen navigation={navigation} />
        </ProfileContextProvider>
      );
    });

    const allActivitiesButton = component.root.find(
      ({ props }) => props.testID === `allActivities`
    );
    fireEvent.press(allActivitiesButton);
    expect(navigation.navigate).toHaveBeenCalledWith('AllActivities');
  });

  test('should call favourites bar selector', async () => {
    const navigation = { navigate: jest.fn() };
    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <ProfileScreen navigation={navigation} />
        </ProfileContextProvider>
      );
    });

    const favouritesButton = component.root.find(
      ({ props }) => props.testID === `favourites`
    );
    fireEvent.press(favouritesButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Favourites');
  });

  test('should call calendar bar selector', async () => {
    const navigation = { navigate: jest.fn() };
    await act(async () => {
      component = create(
        <ProfileContextProvider profile={profile}>
          <ProfileScreen navigation={navigation} />
        </ProfileContextProvider>
      );
    });

    const calendarButton = component.root.find(
      ({ props }) => props.testID === `calendar`
    );
    fireEvent.press(calendarButton);
    expect(navigation.navigate).toHaveBeenCalledWith('Calendar');
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
