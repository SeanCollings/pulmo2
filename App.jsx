import React, { useState, useEffect } from 'react';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { View, StyleSheet, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';

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
  const [favActivityIdArray, setFavActivityIdArray] = useState([]);
  const [profile, setProfile] = useState({});
  const [appSettings, setAppSettings] = useState({});

  useEffect(() => {
    Text.defaultProps = Text.defaultProps || {};
    Text.defaultProps.allowFontScaling = false;
  }, []);

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

    return Promise.resolve();
  };

  const loadAsyncDependencies = async () => {
    try {
      const [
        _,
        customExcercisesAsync,
        activityIdArrayAsync,
        favActivityIdArrayAsync,
        profileAsync,
        settingsAsync,
      ] = await Promise.all([
        fetchFonts(),
        loadCustomExcercisesAsync(),
        loadActivityIdArrayAsync(),
        loadFavActivityIdArrayAsync(),
        loadProfileAsync(),
        loadSettingsAsync(),
      ]);

      return updateAsyncState({
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

  // Remove <View style={styles.container}> if white flash still persists
  return (
    <View style={styles.container} data-testid="app-component">
      {!dataLoaded && (
        <AppLoading
          startAsync={loadAsyncDependencies}
          onFinish={() => setDataLoaded(true)}
          onError={(err) => console.log(`AppLoading  error: ${err}`)}
          autoHideSplash
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
      <StatusBar style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#002f56' },
});
