import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

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

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
        Use dark mode
      </Text>
      <View>
        <View style={styles.switchContainer}>
          <CustomSwitch
            onChange={onChangeHandler}
            state={selectedTheme === DARK_MODE}
            trackColor={theme.SECONDARY}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 10,
  },
  switchContainer: {
    paddingTop: 1,
  },
  iconContainer: {
    paddingTop: 2,
  },
  textStyle: {
    fontSize: 17,
    fontFamily: 'tit-regular',
  },
});

export default ThemeSelector;
