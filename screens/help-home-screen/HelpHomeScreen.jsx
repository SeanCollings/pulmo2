import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import options from './options';

export const helpHomeScreenOptions = options;

const HelpHomeScreen = (props) => {
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
        Home Page
      </Text>
      <Text style={styleTextContent}>
        Following the prompt 'tap to begin', click on the play button to start
        selected excercise.
      </Text>
      <Text style={styleTextContent}>
        The selected level on the Luft&trade; is displayed below the play button
        for reference and can be updated in your Profile Page.
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
        Please confirm selected level before each excercise.
      </Text>
      <Text style={styleTextContent}>
        The name and summary of the selected excercise is displayed on the page.
        The excercise can be changed by navigating to the 'Excercises' tab at
        the bottom of the screen.
      </Text>
      <Text style={styleTextContent}>
        After completing an excercise, a summary of your workout will be
        displayed. A saved copy of this can be found in your Profile Page.
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
    fontSize: 17,
    width: '80%',
    textAlign: 'center',
    paddingBottom: 20,
    fontFamily: 'tit-light',
  },
  textBold: {
    fontFamily: 'tit-bold',
  },
});

export default HelpHomeScreen;
