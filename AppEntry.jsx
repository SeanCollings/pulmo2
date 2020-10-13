import React, { useState, useEffect, useCallback } from 'react';
import * as Font from 'expo-font';
import { View, StyleSheet, Text, ActivityIndicator, Image } from 'react-native';
import Constants from 'expo-constants';
import * as SplashScreen from 'expo-splash-screen';

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
  const [showSplashScreen, setShowSplashScreen] = useState(true);

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
      await Promise.all([fetchFonts(), loadAsyncDependencies()]);

      SplashScreen.hideAsync().then(() => {
        setDataLoaded(true);
        setTimeout(() => {
          setShowSplashScreen(false);
        }, 1000);
      });
    } catch (err) {
      console.log(`prepareResources error: ${err}`);
    }
  }, []);

  useEffect(() => {
    if (Constants.manifest?.extra?.setupData === 'true') {
      setSetupApp(true);
    } else {
      Text.defaultProps = Text.defaultProps || {};
      Text.defaultProps.allowFontScaling = false;

      prepareResources();
    }
  }, []);

  if (setupApp) return <AppSetup />;

  return (
    <View style={styles.container} data-testid="app-component">
      {showSplashScreen && (
        <View style={styles.splashScreenContainer}>
          <Image
            style={styles.image}
            source={SplashImage}
            resizeMode="contain"
          />
          <ActivityIndicator
            size="large"
            style={styles.indicator}
            color="#fff"
          ></ActivityIndicator>
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
  splashScreenContainer: {
    backgroundColor: '#002f56',
    justifyContent: 'center',
    zIndex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  indicator: {
    position: 'absolute',
    alignSelf: 'center',
    opacity: 0.7,
  },
});
