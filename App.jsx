import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import AppEntry from './AppEntry';
import { View } from 'react-native';

export default () => {
  const [splashScreenEnabled, setSplashScreenEnabled] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(() => {
      setSplashScreenEnabled(true);
    });
  }, []);

  if (!splashScreenEnabled) return <View style={{ flex: 1 }}></View>;

  return <AppEntry />;
};
