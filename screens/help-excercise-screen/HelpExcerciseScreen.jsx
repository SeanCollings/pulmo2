import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

import { COLORS } from '../../constants/constants';
import options from './options';

export const helpExcerciseScreenOptions = options;

const HelpExcerciseScreen = (props) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text style={styles.textHeading}>Excercises Page</Text>
      <Text style={{ ...styles.textContent, paddingBottom: 0 }}>
        There are three types of excercises:
      </Text>
      <Text style={{ ...styles.textContent, ...styles.textBold }}>
        Strength, Endurance, Custom
      </Text>
      <Text style={styles.textContent}>
        To preview an excercise, tap on its title.
      </Text>
      <Text style={styles.textContent}>
        An excercise can be selected by either tapping on its toggle, or
        selecting it on the preview menu.
      </Text>
      <Text style={styles.textContent}>
        Create a <Text style={styles.textBold}>Custom</Text> excercise by
        inputting the title, breath cycles, rest period and number of rounds.
        <Text style={styles.textBold}> Custom</Text> excercises are saved and
        can be editted or deleted later.
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

export default HelpExcerciseScreen;
