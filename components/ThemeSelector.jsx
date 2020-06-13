import React, { useContext } from 'react';
import { StyleSheet, View, BackHandler } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { THEME, SettingsContext } from '../context/settings-context';
import CustomSwitch from './Switch';
import { DARK_MODE, LIGHT_MODE } from '../constants/constants';
import { useTheme } from '../hooks/useTheme';

const ThemeSelector = (props) => {
  const theme = useTheme();
  const { settingsContext, updateSettingsContext } = useContext(
    SettingsContext
  );

  const selectedTheme = settingsContext[THEME];

  const onChangeHandler = (active) => {
    const selectedTheme = active ? DARK_MODE : LIGHT_MODE;
    updateSettingsContext(THEME, selectedTheme);
  };

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          name={'theme-light-dark'}
          color={theme.BORDER}
          size={22}
        />
      </View>
      <CustomSwitch
        onChange={onChangeHandler}
        state={selectedTheme === DARK_MODE}
        trackColor={theme.SECONDARY}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  iconContainer: {
    justifyContent: 'center',
  },
});

export default ThemeSelector;
