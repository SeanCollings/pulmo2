import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import VersionCheck from 'react-native-version-check-expo';
import Constants from 'expo-constants';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import ThemeSelector from '../../components/ThemeSelector';
import {
  EXPO_VERSION,
  ANDROID_VERSION,
  RELEASE_ID,
} from '../../release-constants';
import CategoryContainer from '../../components/CategoryContainer';
import BarSelector from '../../components/BarSelector';

export const settingsScreenOptions = options;

const getVersion = (version) => (version.includes('#') ? '0' : version);

const SettingsScreen = ({ navigation }) => {
  const theme = useTheme();
  const [latestVersion, setLatestVersion] = useState(null);
  const [showLatestVersion, setShowLatestVersion] = useState(false);

  useEffect(() => {
    let mounted = true;
    VersionCheck.getLatestVersion().then((version) => {
      if (mounted) {
        setLatestVersion(version);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  const releaseId = getVersion(RELEASE_ID);
  const androidBuildVersion = getVersion(ANDROID_VERSION);
  const sdkVersion = Constants?.manifest?.sdkVersion.split('.')[0] || '0';

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
                color: theme.TEXT,
                opacity,
              }}
            >{` ${EXPO_VERSION}.${sdkVersion}.${releaseId}.${androidBuildVersion}`}</Text>
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
