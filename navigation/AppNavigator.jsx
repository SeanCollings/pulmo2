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
import SettingsScreen, {
  settingsScreenOptions,
} from '../screens/settings-screen/SettingsScreen';
import AllActivitiesScreen, {
  allActivitiesScreenOptions,
} from '../screens/all-activities-screen/AllActivitiesScreen';
import FavouritesScreen, {
  favouritesScreenOptions,
} from '../screens/favourites-screen/FavouritesScreen';
import CalendarScreen, {
  calendarScreenOptions,
} from '../screens/calendar-screen/CalendarScreen';
import EditActivityScreen, {
  editActivityScreenOptions,
} from '../screens/edit-activity-screen/EditActivityScreen';
import DisclaimerScreen, {
  disclaimerScreenOptions,
  disclaimerScreenOptionsEntry,
} from '../screens/disclaimer-screen/DisclaimerScreen';

const StackHome = createStackNavigator();
const HomeStack = () => (
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
const ExcercisesStack = () => (
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
const ProfileStack = () => (
  <StackProfile.Navigator screenOptions={defaultNavOptions(useTheme())}>
    <StackProfile.Screen
      name="Profile"
      component={ProfileScreen}
      options={profileScreenOptions}
    />
    <StackProfile.Screen
      name="ProfileHelp"
      component={HelpProfileScreen}
      options={helpProfileScreenOptions}
    />
    <StackProfile.Screen
      name="AllActivities"
      component={AllActivitiesScreen}
      options={allActivitiesScreenOptions}
    />
    <StackProfile.Screen
      name="Favourites"
      component={FavouritesScreen}
      options={favouritesScreenOptions}
    />
    <StackProfile.Screen
      name="Activity"
      component={ActivityScreen}
      options={activityScreenOptions}
    />
    <StackProfile.Screen
      name="EditActivity"
      component={EditActivityScreen}
      options={editActivityScreenOptions}
    />
    <StackProfile.Screen
      name="Calendar"
      component={CalendarScreen}
      options={calendarScreenOptions}
    />
    <StackProfile.Screen
      name="Settings"
      component={SettingsScreen}
      options={settingsScreenOptions}
    />
    <StackProfile.Screen
      name="Disclaimer"
      component={DisclaimerScreen}
      options={disclaimerScreenOptions}
      initialParams={{ readOnly: true }}
    />
  </StackProfile.Navigator>
);

const StackDisclaimer = createStackNavigator();
export const DisclaimerStack = () => (
  <StackDisclaimer.Navigator screenOptions={defaultNavOptions(useTheme())}>
    <StackDisclaimer.Screen
      name="Disclaimer"
      component={DisclaimerScreen}
      options={disclaimerScreenOptionsEntry}
      initialParams={{ readOnly: false }}
    />
  </StackDisclaimer.Navigator>
);

const Tab = createBottomTabNavigator();
export const MainTabs = ({ defaultTabBarOptions }) => (
  <Tab.Navigator
    tabBarOptions={{ ...defaultTabBarOptions }}
    initialRouteName="Home"
  >
    <Tab.Screen
      name="Excercises"
      component={ExcercisesStack}
      options={excercisesScreenOptions}
    />
    <Tab.Screen name="Home" component={HomeStack} options={homeScreenOptions} />
    <Tab.Screen
      name="Profile"
      component={ProfileStack}
      options={profileScreenOptions}
    />
  </Tab.Navigator>
);
