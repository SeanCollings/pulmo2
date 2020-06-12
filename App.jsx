import React, { useState } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';

import Navigator from './navigation';
import ExcerciseContextProvider from './context/excercise-context';
import ProfileContextProvider, {
  PROFILE_KEYS,
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

const fetchFonts = () => {
  return Font.loadAsync({
    'tit-light': require('./assets/fonts/TitilliumWeb-Light.ttf'),
    'tit-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    'tit-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [customExcercises, setCustomExcercises] = useState([]);
  const [activityIdArray, setActivityIdArray] = useState([]);
  const [profile, setProfile] = useState({});
  const [appSettings, setAppSettings] = useState({});

  const loadCustomExcercises = async () => {
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

        setCustomExcercises(formattedCustomExcercise);

        return Promise.resolve();
      }
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadActivityIdArray = async () => {
    try {
      const getActivityIdArray = await getAsyncData(ACTIVITY_TAG);
      setActivityIdArray(getActivityIdArray);

      return Promise.resolve();
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadProfile = async () => {
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

      setProfile(formattedProfile);
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadSettings = async () => {
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

      setAppSettings(formattedSettings);
      return Promise.resolve();
    } catch (err) {
      console.log(err);
      return Promise.resolve();
    }
  };

  const loadAsyncDependencies = () => {
    return Promise.all([
      fetchFonts(),
      loadCustomExcercises(),
      loadActivityIdArray(),
      loadProfile(),
      loadSettings(),
    ]);
  };

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={loadAsyncDependencies}
        onFinish={() => setDataLoaded(true)}
        onError={(err) => console.log(err)}
      />
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
