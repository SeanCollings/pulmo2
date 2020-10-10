import React, { useContext, useEffect, useState, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';

import { useTheme } from '../hooks/useTheme';
import { MainTabs, DisclaimerStack } from './AppNavigator';
import {
  ProfileContext,
  DISCLAIMER_DONT_SHOW_AGAIN,
  DISCLAIMER,
  DISCLAIMER_SHOW,
} from '../context/profile-context';

const AppNavigator = (props) => {
  const theme = useTheme();
  const firstMount = useRef(true);
  const { profileContext } = useContext(ProfileContext);
  const disclaimerContext = profileContext[DISCLAIMER] || {};
  const [showDisclaimer, setShowDisclaimer] = useState(
    disclaimerContext[DISCLAIMER_SHOW] ||
      !disclaimerContext[DISCLAIMER_DONT_SHOW_AGAIN]
  );

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
  }, []);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      if (!disclaimerContext[DISCLAIMER_SHOW]) {
        setShowDisclaimer(false);
      }
    }
  }, [disclaimerContext]);

  const defaultTabBarOptions = {
    activeTintColor: theme.DARK ? theme.SECONDARY : theme.BACKGROUND,
    inactiveTintColor: theme.DARK ? theme.DARK_GRAY : theme.SECONDARY,
    tabStyle: { backgroundColor: theme.PRIMARY },
    labelStyle: { fontFamily: 'tit-regular', fontSize: 12 },
    allowFontScaling: false,
  };

  // Remove view>styles if white flash still persists
  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <NavigationContainer>
        {showDisclaimer && <DisclaimerStack />}
        {!showDisclaimer && (
          <MainTabs defaultTabBarOptions={defaultTabBarOptions} />
        )}
      </NavigationContainer>
      <StatusBar style="light" />
    </View>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({ container: { height: '200%' } });
