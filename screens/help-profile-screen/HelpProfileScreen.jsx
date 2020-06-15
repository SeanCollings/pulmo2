import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../hooks/useTheme';
import options from './options';

export const helpProfileScreenOptions = options;

const HelpProfileScreen = (props) => {
  const theme = useTheme();
  const styleTextContent = {
    ...styles.textContent,
    color: theme.TEXT,
    opacity: theme.DARK ? 0.87 : 1,
  };

  return (
    <ScrollView
      style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text style={{ ...styles.textHeading, color: theme.SECONDARY }}>
        Profile Page
      </Text>
      <Text style={styleTextContent}>
        Use{' '}
        <MaterialCommunityIcons
          name="chevron-left-circle"
          color={theme.BORDER}
          size={20}
        />{' '}
        and{' '}
        <MaterialCommunityIcons
          name="chevron-right-circle"
          color={theme.BORDER}
          size={20}
        />{' '}
        to select the difficulty level that you will use on the Luft&trade;.
      </Text>
      <Text
        style={{
          ...styleTextContent,
          ...styles.textBold,
          ...(theme.DARK
            ? { color: theme.TERTIARY, fontFamily: 'tit-light' }
            : {}),
        }}
      >
        At the start of each excercise you will confirm the difficulty level.
      </Text>
      <Text style={styleTextContent}>
        Each excercise will be saved to your Profile Page and can be viewed in
        detail by selecting it from 'All activities'.
      </Text>
      <Text style={styleTextContent}>
        If you would like to delete an excercise, click through to an activity's
        details and select delete.
      </Text>
      <Text style={styleTextContent}></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
  },
  textHeading: {
    paddingBottom: 20,
    fontSize: 20,
    fontFamily: 'tit-regular',
  },
  textContent: {
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
    paddingBottom: 20,
    fontFamily: 'tit-light',
  },
  textBold: {
    fontFamily: 'tit-bold',
  },
});

export default HelpProfileScreen;
