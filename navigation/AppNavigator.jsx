import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useTheme } from '../hooks/useTheme';
import { defaultNavOptions } from '../constants/navigation-constants';
import HomeScreen, {
  homeScreenOptions,
} from '../screens/home-screen/HomeScreen';
import ExcercisesScreen, {
  excercisesScreenOptions,
} from '../screens/excercises-screen/ExcercisesScreen';
import ProfileScreen, {
  profileScreenOptions,
} from '../screens/profile-screen/ProfileScreen';
import ActivityScreen, {
  activityScreenOptions,
} from '../screens/activity-screen/ActivityScreen';
import HelpHomeScreen, {
  helpHomeScreenOptions,
} from '../screens/help-home-screen/HelpHomeScreen';
import HelpExcerciseScreen, {
  helpExcerciseScreenOptions,
} from '../screens/help-excercise-screen/HelpExcerciseScreen';
import HelpProfileScreen, {
  helpProfileScreenOptions,
} from '../screens/help-profile-screen/HelpProfileScreen';

const StackHome = createStackNavigator();

export const HomeStack = () => (
  <StackHome.Navigator screenOptions={defaultNavOptions(useTheme())}>
    <StackHome.Screen
      name="Home"
      component={HomeScreen}
      options={homeScreenOptions}
    />
    <StackHome.Screen
      name="HomeHelp"
      component={HelpHomeScreen}
      options={helpHomeScreenOptions}
    />
  </StackHome.Navigator>
);

const StackExcercises = createStackNavigator();

export const ExcercisesStack = () => (
  <StackExcercises.Navigator screenOptions={defaultNavOptions(useTheme())}>
    <StackExcercises.Screen
      name="Excercises"
      component={ExcercisesScreen}
      options={excercisesScreenOptions}
    />
    <StackExcercises.Screen
      name="ExcerciseHelp"
      component={HelpExcerciseScreen}
      options={helpExcerciseScreenOptions}
    />
  </StackExcercises.Navigator>
);

const StackProfile = createStackNavigator();

export const ProfileStack = () => (
  <StackProfile.Navigator screenOptions={defaultNavOptions(useTheme())}>
    <StackProfile.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileScreenOptions}
    />
    <StackProfile.Screen
      name="Activity"
      component={ActivityScreen}
      options={activityScreenOptions}
    />
    <StackProfile.Screen
      name="ProfileHelp"
      component={HelpProfileScreen}
      options={helpProfileScreenOptions}
    />
  </StackProfile.Navigator>
);

const Tab = createBottomTabNavigator();

export const MainTabs = ({ defaultTabBarOptions }) => (
  <Tab.Navigator tabBarOptions={defaultTabBarOptions}>
    <Tab.Screen name="Home" component={HomeStack} options={homeScreenOptions} />
    <Tab.Screen
      name="Excercises"
      component={ExcercisesStack}
      options={excercisesScreenOptions}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={profileScreenOptions}
    />
  </Tab.Navigator>
);
