import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import AppEntry from './AppEntry';

export default () => {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return <AppEntry />;
};
