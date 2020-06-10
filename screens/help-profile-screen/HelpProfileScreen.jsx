import React from 'react';
import { StyleSheet, Text, ScrollView, View } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { COLORS } from '../../constants/constants';
import options from './options';

export const helpProfileScreenOptions = options;

const HelpProfileScreen = (props) => {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{ alignItems: 'center' }}
    >
      <Text style={styles.textHeading}>Profile Page</Text>
      <Text style={styles.textContent}>
        Use{' '}
        <MaterialCommunityIcons
          name="chevron-left-circle"
          color={COLORS.BORDER}
          size={20}
        />{' '}
        and{' '}
        <MaterialCommunityIcons
          name="chevron-right-circle"
          color={COLORS.BORDER}
          size={20}
        />{' '}
        to select the difficulty level that you will use on the Luft&trade;.
      </Text>
      <Text style={{ ...styles.textContent, ...styles.textBold }}>
        At the start of each excercise you will confirm the difficulty level.
      </Text>
      <Text style={styles.textContent}>
        Each excercise will be saved to your Profile Page and can be viewed in
        detail by selecting it from the history list.
      </Text>
      <Text style={styles.textContent}>
        If you would like to delete an excercise, click throught to details and
        select delete.
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

export default HelpProfileScreen;
