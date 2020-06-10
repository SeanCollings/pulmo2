import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

import { COLORS } from '../../constants/constants';
import options from './options';

export const helpHomeScreenOptions = options;

const HelpHomeScreen = (props) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text style={styles.textHeading}>Home Page</Text>
      <Text style={styles.textContent}>
        Following the prompt 'click to begin', click on the play button to start
        selected excercise.
      </Text>
      <Text style={styles.textContent}>
        The selected level on the Luft&trade; is displayed below the play button
        for reference and can be updated in your Profile Page.
      </Text>
      <Text style={{ ...styles.textContent, ...styles.textBold }}>
        Please confirm selected level before each excercise.
      </Text>
      <Text style={styles.textContent}>
        The name and summary of the selected excercise is displayed on the page.
        The excercise can be changed by navigating to the 'Excercises' tab at
        the bottom of the screen.
      </Text>
      <Text style={styles.textContent}>
        After completing an excercise, a summary of your workout will be
        displayed. A saved copy of this can be found in your Profile Page.
      </Text>
      <Text style={styles.textContent}></Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 30,
    backgroundColor: COLORS.BACKGROUND,
  },
  textHeading: {
    paddingBottom: 20,
    fontSize: 20,
    color: COLORS.SECONDARY,
    fontFamily: 'tit-regular',
  },
  textContent: {
    fontSize: 16,
    width: '80%',
    textAlign: 'center',
    paddingBottom: 20,
    color: COLORS.TEXT,
    fontFamily: 'tit-light',
  },
  textBold: {
    fontFamily: 'tit-bold',
  },
});

export default HelpHomeScreen;
