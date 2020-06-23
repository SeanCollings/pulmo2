import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';

import { useTheme } from '../hooks/useTheme';
import { MainTabs } from './AppNavigator';

const AppNavigator = (props) => {
  const theme = useTheme();

  const defaultTabBarOptions = {
    activeTintColor: theme.DARK ? theme.SECONDARY : theme.BACKGROUND,
    inactiveTintColor: theme.DARK ? theme.DARK_GRAY : theme.SECONDARY,
    tabStyle: { backgroundColor: theme.PRIMARY },
    labelStyle: { fontFamily: 'tit-regular', fontSize: 12 },
  };

  return (
    <View style={styles.container}>
      <NavigationContainer>
        <MainTabs defaultTabBarOptions={defaultTabBarOptions} />
      </NavigationContainer>
      <StatusBar style="light" />
    </View>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({ container: { flex: 1 } });
