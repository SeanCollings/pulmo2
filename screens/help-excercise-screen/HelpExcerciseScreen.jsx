import React from 'react';
import { StyleSheet, Text, ScrollView } from 'react-native';

import { useTheme } from '../../hooks/useTheme';
import options from './options';

export const helpExcerciseScreenOptions = options;

const HelpExcerciseScreen = (props) => {
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
        Excercises Page
      </Text>
      <Text style={{ ...styleTextContent, paddingBottom: 0 }}>
        There are three types of excercises:
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
        Strength, Endurance, Custom
      </Text>
      <Text style={styleTextContent}>
        To preview an excercise, tap on its title.
      </Text>
      <Text style={styleTextContent}>
        An excercise can be selected by either tapping on its toggle, or
        selecting it on the preview menu.
      </Text>
      <Text style={styleTextContent}>
        Create a{' '}
        <Text
          style={{
            ...styles.textBold,
            ...(theme.DARK
              ? { color: theme.TERTIARY, fontFamily: 'tit-light' }
              : {}),
          }}
        >
          Custom
        </Text>{' '}
        excercise by inputting the title, breath cycles, rest period and number
        of rounds.
        <Text
          style={{
            ...styles.textBold,
            ...(theme.DARK
              ? { color: theme.TERTIARY, fontFamily: 'tit-light' }
              : {}),
          }}
        >
          {' '}
          Custom
        </Text>{' '}
        excercises are saved and can be editted or deleted later.
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

export default HelpExcerciseScreen;
