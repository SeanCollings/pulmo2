import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

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
        <Ionicons
          name={'ios-sunny'}
          color={theme.DARK ? theme.BORDER : theme.SECONDARY}
          size={24}
        />
      </View>
      <View style={styles.switchContainer}>
        <CustomSwitch
          onChange={onChangeHandler}
          state={selectedTheme === DARK_MODE}
          trackColor={theme.SECONDARY}
        />
      </View>
      <View style={styles.iconContainer}>
        <Ionicons
          name={'ios-moon'}
          color={theme.DARK ? theme.BORDER : theme.SECONDARY}
          size={24}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  switchContainer: {
    paddingHorizontal: 10,
    paddingTop: 1,
  },
  iconContainer: {
    paddingTop: 2,
  },
  textStyle: {
    fontSize: 18,
    fontFamily: 'tit-regular',
  },
});

export default ThemeSelector;
