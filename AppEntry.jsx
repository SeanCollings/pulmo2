import React, { useState, useEffect, useCallback } from 'react';
import * as Font from 'expo-font';
import { View, StyleSheet, Text, Image } from 'react-native';
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
import SplashImage from './assets/pulmo2_splash.png';

const fetchFonts = () => {
  return Font.loadAsync({
    'tit-light': require('./assets/fonts/TitilliumWeb-Light.ttf'),
    'tit-regular': require('./assets/fonts/TitilliumWeb-Regular.ttf'),
    'tit-bold': require('./assets/fonts/TitilliumWeb-Bold.ttf'),
  });
};

export default function App() {
  const [dataLoaded, setDataLoaded] = useState(false);
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

  const prepareResources = useCallback(async () => {
    try {
      await fetchFonts();
      await loadAsyncDependencies();
    } catch (err) {
      console.log(`prepareResources error: ${err}`);
    } finally {
      setDataLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (Constants.manifest?.extra?.setupData === 'true') {
      setSetupApp(true);
    } else {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.allowFontScaling = false;

      setTimeout(() => {
        prepareResources();
      }, 1000);
    }
  }, []);

  if (setupApp) return <AppSetup />;

  return (
    <View style={styles.container} data-testid="app-component">
      {!dataLoaded && (
        <View style={{ ...styles.container, justifyContent: 'center' }}>
          <Image
            style={styles.image}
            source={SplashImage}
            resizeMode="contain"
          />
        </View>
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
  image: {
    width: '100%',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
  },
});