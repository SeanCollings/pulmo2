import React, { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';

import AppEntry from './AppEntry';

export default () => {
  useEffect(() => {
    if (!process.env.NODE_ENV === 'development') {
      SplashScreen.hideAsync();
    }
  }, []);

  return <AppEntry />;
};
