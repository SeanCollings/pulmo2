import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useTheme } from '../hooks/useTheme';
import { MainTabs } from './AppNavigator';

const AppNavigator = (props) => {
  const theme = useTheme();

  const defaultTabBarOptions = {
    activeTintColor: theme.DARK ? theme.SECONDARY : theme.BACKGROUND,
    inactiveTintColor: theme.DARK ? theme.DARK_GRAY : theme.SECONDARY,
    tabStyle: { backgroundColor: theme.PRIMARY },
    labelStyle: { fontFamily: 'tit-regular' },
  };

  return (
    <NavigationContainer>
      <MainTabs defaultTabBarOptions={defaultTabBarOptions} />
    </NavigationContainer>
  );
};

export default AppNavigator;
