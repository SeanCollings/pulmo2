import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';

import Navigator from './navigation';
import ExcerciseContextProvider from './context/excercise-context';
import ProfileContextProvider from './context/profile-context';
import CustomExcerciseContextProvider from './context/custom-excercise-context';
import HistoryContextProvider from './context/history-context';
import SettingsContextProvider from './context/settings-context';
import loadCustomExcercisesAsync from './app-initialise/load-custom-excercise';
import loadSettingsAsync from './app-initialise/load-settings';
import loadProfileAsync from './app-initialise/load-profile';
import loadFavActivityIdArrayAsync from './app-initialise/load-fav-activity-id-array';
import loadActivityIdArrayAsync from './app-initialise/load-activity-id-array';
import AppSetup from './setup';

const fetchFonts = () => {
  return Font.loadAsync({
    'tit-light': require('./assets/fonts/TitilliumWeb-Light.ttf'),
    'tit-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    'tit-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
  });
};

// let customExcercises = [];
// let activityIdArray = [];
// let favActivityIdArray = [];
// let profile = {};
// let appSettings = {};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [setupApp, setSetupApp] = useState(false);
  const [customExcercises, setCustomExcercises] = useState([]);
  const [activityIdArray, setActivityIdArray] = useState([]);
  const [favActivityIdArray, setFavActivityIdArray] = useState([]);
  const [profile, setProfile] = useState({});
  const [appSettings, setAppSettings] = useState({});

  const updateAsyncState = ({
    customExcercisesAsync,
    activityIdArrayAsync,
    favActivityIdArrayAsync,
    profileAsync,
    settingsAsync,
  }) => {
    customExcercisesAsync && setCustomExcercises(customExcercisesAsync);
    activityIdArrayAsync && setActivityIdArray(activityIdArrayAsync);
    favActivityIdArrayAsync && setFavActivityIdArray(favActivityIdArrayAsync);
    profileAsync && setProfile(profileAsync);
    settingsAsync && setAppSettings(settingsAsync);
    // customExcercises = customExcercisesAsync || [];
    // activityIdArray = activityIdArrayAsync || [];
    // favActivityIdArray = favActivityIdArrayAsync || [];
    // profile = profileAsync || {};
    // appSettings = settingsAsync || {};

    return Promise.resolve();
  };

  const loadAsyncDependencies = async () => {
    try {
      const [
        customExcercisesAsync,
        activityIdArrayAsync,
        favActivityIdArrayAsync,
        profileAsync,
        settingsAsync,
      ] = await Promise.all([
        loadCustomExcercisesAsync(),
        loadActivityIdArrayAsync(),
        loadFavActivityIdArrayAsync(),
        loadProfileAsync(),
        loadSettingsAsync(),
      ]);

      return await updateAsyncState({
        customExcercisesAsync,
        activityIdArrayAsync,
        favActivityIdArrayAsync,
        profileAsync,
        settingsAsync,
      });
    } catch (err) {
      throw new Error(err);
    }
  };

  useEffect(() => {
    if (Constants.manifest?.extra?.setupData === 'true') {
      setSetupApp(true);
    }

    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      loadAsyncDependencies()
        .then(() => {
          setDataLoaded(true);
        })
        .catch((err) => console.log(`loadAsyncDependencies error: ${err}`));
    }
  }, [fontsLoaded]);

  if (setupApp) return <AppSetup />;

  // Remove <View style={styles.container}> if white flash still persists
  return (
    <View style={styles.container} data-testid="app-component">
      {!fontsLoaded && (
        <AppLoading
          startAsync={fetchFonts}
          onFinish={() => setFontsLoaded(true)}
          onError={(err) => console.log(`AppLoading error: ${err}`)}
        />
      )}
      {dataLoaded && (
        <CustomExcerciseContextProvider excercises={customExcercises}>
          <ExcerciseContextProvider>
            <ProfileContextProvider profile={profile}>
              <HistoryContextProvider
                idArray={activityIdArray}
                favIdArray={favActivityIdArray}
              >
                <SettingsContextProvider settings={appSettings}>
                  <Navigator />
                </SettingsContextProvider>
              </HistoryContextProvider>
            </ProfileContextProvider>
          </ExcerciseContextProvider>
        </CustomExcerciseContextProvider>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#002f56' },
});
