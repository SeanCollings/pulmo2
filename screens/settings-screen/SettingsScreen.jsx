import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import ThemeSelector from '../../components/ThemeSelector';
import { BUILD_VERSION, ANDROID_VERSION } from '../../version';
import CategoryContainer from '../../components/CategoryContainer';

export const settingsScreenOptions = options;

const SettingsScreen = (props) => {
  const theme = useTheme();

  const opacity = theme.DARK ? 0.36 : 0.7;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <View style={styles.upperContainer}>
        <CategoryContainer header="Day/night mode">
          <ThemeSelector />
        </CategoryContainer>
      </View>
      <View style={styles.versionContainer}>
        <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
          version:
        </Text>
        <Text
          style={{
            ...styles.textStyle,
            fontSize: 14,
            color: theme.TEXT,
            opacity,
          }}
        >{` ${BUILD_VERSION}.${ANDROID_VERSION}`}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  upperContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  versionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 5,
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'tit-light',
    fontSize: 17,
    alignSelf: 'flex-end',
  },
});

export default SettingsScreen;
