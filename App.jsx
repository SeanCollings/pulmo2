import React, { useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import AppEntry from './AppEntry';

export default () => {
  const [splashScreenEnabled, setSplashScreenEnabled] = useState(false);

  useEffect(() => {
    SplashScreen.preventAutoHideAsync().then(() => {
      setSplashScreenEnabled(true);
    });
  }, []);

  if (!splashScreenEnabled) return null;

  return <AppEntry />;
};
