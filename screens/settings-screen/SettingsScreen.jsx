import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';

export const settingsScreenOptions = options;

const SettingsScreen = (props) => {
  const theme = useTheme();

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}
      contentContainerStyle={{ alignItems: 'center' }}
    ></ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default SettingsScreen;
