import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { MainTabs } from './AppNavigator';

const AppNavigator = (props) => {
  return (
    <NavigationContainer>
      <MainTabs />
    </NavigationContainer>
  );
};

export default AppNavigator;
