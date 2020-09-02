import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import VersionCheck from 'react-native-version-check-expo';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import ThemeSelector from '../../components/ThemeSelector';
import { BUILD_VERSION, ANDROID_VERSION, RELEASE_ID } from '../../version';
import CategoryContainer from '../../components/CategoryContainer';
import BarSelector from '../../components/BarSelector';

export const settingsScreenOptions = options;

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [latestVersion, setLatestVersion] = useState(null);
  const [showLatestVersion, setShowLatestVersion] = useState(false);

  VersionCheck.getLatestVersion().then((version) => {
    setLatestVersion(version);
  });

  const releaseId = RELEASE_ID.includes('#') ? '1' : RELEASE_ID;

  const opacity = theme.DARK ? 0.36 : 0.7;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <View style={styles.upperContainer}>
        <CategoryContainer header="Day/night mode">
          <ThemeSelector />
        </CategoryContainer>
        <View style={styles.barSelectorContainer}>
          <BarSelector
            textContent="Disclaimer"
            onPress={() => navigation.navigate('Disclaimer')}
            iconName="note-text"
          />
        </View>
      </View>
      <TouchableOpacity
        onPress={() => setShowLatestVersion((curr) => !curr)}
        activeOpacity={1}
      >
        {showLatestVersion && (
          <View style={styles.versionContainer}>
            <Text
              style={{ ...styles.textStyle, color: theme.TEXT, opacity }}
            >{`latest version: ${latestVersion}`}</Text>
          </View>
        )}
        {!showLatestVersion && (
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
            >{` ${BUILD_VERSION}.${releaseId}.${ANDROID_VERSION}`}</Text>
          </View>
        )}
      </TouchableOpacity>
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
  barSelectorContainer: {
    width: '100%',
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
