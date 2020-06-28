import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

import Navigator from './navigation';
import ExcerciseContextProvider from './context/excercise-context';
import ProfileContextProvider, {
  PROFILE_KEYS,
  STREAK,
  STREAK_LAST_ACTIVITY,
  STREAK_CURRENT,
} from './context/profile-context';
import CustomExcerciseContextProvider, {
  CUSTOM_TAG,
} from './context/custom-excercise-context';
import HistoryContextProvider from './context/history-context';
import SettingsContextProvider, {
  SETTINGS_KEYS,
} from './context/settings-context';
import { getAsyncData, getMultiAsyncData } from './helpers/storage';
import { ACTIVITY_TAG } from './context/history-context';
import { APP_ID } from './constants/constants';
import { isDateYesterday, isDateToday } from './utils';

const fetchFonts = () => {
  return Font.loadAsync({
    'tit-light': require('./assets/fonts/TitilliumWeb-Light.ttf'),
    'tit-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    'tit-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
  });
};

const getCurrentStreak = (profile) => {
  if (profile[STREAK]) {
    const currentStreak = { ...profile[STREAK] };
    const lastActivity = currentStreak[STREAK_LAST_ACTIVITY];

    if (!isDateToday(lastActivity) && !isDateYesterday(lastActivity)) {
      currentStreak[STREAK_CURRENT] = 0;
    }

    return currentStreak;
  } else {
    return null;
  }
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [customExcercises, setCustomExcercises] = useState([]);
  const [activityIdArray, setActivityIdArray] = useState([]);
  const [profile, setProfile] = useState({});
  const [appSettings, setAppSettings] = useState({});

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }, []);

  const loadCustomExcercisesAsync = async () => {
    try {
      const getCustomIdArray = await getAsyncData(CUSTOM_TAG);

      if (getCustomIdArray) {
        const savedCustomExcercises = await getMultiAsyncData(
          CUSTOM_TAG,
          getCustomIdArray
        );

        const formattedCustomExcercise = savedCustomExcercises.reduce(
          (acc, array) => {
            if (array[1]) return [...acc, JSON.parse(array[1])];
            else return acc;
          },
          []
        );

        return Promise.resolve(formattedCustomExcercise);
      }
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadActivityIdArrayAsync = async () => {
    try {
      const getActivityIdArray = await getAsyncData(ACTIVITY_TAG);

      return Promise.resolve(getActivityIdArray);
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadProfileAsync = async () => {
    try {
      const profileValues = await getMultiAsyncData('', PROFILE_KEYS);
      const formattedProfile = profileValues.reduce((acc, array) => {
        const key = array[0];
        const value = array[1];

        if (key && key.includes(APP_ID) && value) {
          const formattedKey = key.split(APP_ID)[1];
          return { ...acc, [formattedKey]: JSON.parse(value) };
        } else return acc;
      }, {});

      const currentSteak = getCurrentStreak(formattedProfile);

      return Promise.resolve({
        ...formattedProfile,
        ...(currentSteak && { [STREAK]: currentSteak }),
      });
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadSettingsAsync = async () => {
    try {
      const settingsValues = await getMultiAsyncData('', SETTINGS_KEYS);
      const formattedSettings = settingsValues.reduce((acc, array) => {
        const key = array[0];
        const value = array[1];

        if (key && key.includes(APP_ID) && value) {
          const formattedKey = key.split(APP_ID)[1];
          return { ...acc, [formattedKey]: JSON.parse(value) };
        } else return acc;
      }, {});

      return Promise.resolve(formattedSettings);
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const updateAsyncState = ({
    customExcercisesAsync,
    activityIdArrayAsync,
    profileAsync,
    settingsAsync,
  }) => {
    customExcercisesAsync && setCustomExcercises(customExcercisesAsync);
    activityIdArrayAsync && setActivityIdArray(activityIdArrayAsync);
    profileAsync && setProfile(profileAsync);
    settingsAsync && setAppSettings(settingsAsync);

    return Promise.resolve();
  };

  const loadAsyncDependencies = async () => {
    const [
      _,
      customExcercisesAsync,
      activityIdArrayAsync,
      profileAsync,
      settingsAsync,
    ] = await Promise.all([
      fetchFonts(),
      loadCustomExcercisesAsync(),
      loadActivityIdArrayAsync(),
      loadProfileAsync(),
      loadSettingsAsync(),
    ]);

    return updateAsyncState({
      customExcercisesAsync,
      activityIdArrayAsync,
      profileAsync,
      settingsAsync,
    });
  };

  if (!dataLoaded) {
    return (
      <View>
        <AppLoading
          startAsync={loadAsyncDependencies}
          onFinish={() => setDataLoaded(true)}
          onError={(err) => console.log(err)}
          autoHideSplash
        />
        <StatusBar style="light" />
      </View>
    );
  }

  return (
    <CustomExcerciseContextProvider excercises={customExcercises}>
      <ExcerciseContextProvider>
        <ProfileContextProvider profile={profile}>
          <HistoryContextProvider idArray={activityIdArray}>
            <SettingsContextProvider settings={appSettings}>
              <Navigator />
            </SettingsContextProvider>
          </HistoryContextProvider>
        </ProfileContextProvider>
      </ExcerciseContextProvider>
    </CustomExcerciseContextProvider>
  );
}
