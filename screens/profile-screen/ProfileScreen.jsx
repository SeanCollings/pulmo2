import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import options from './options';
import LevelSelector from '../../components/LevelSelector';
import { useTheme } from '../../hooks/useTheme';
import BarSelector from '../../components/BarSelector';

export const profileScreenOptions = options;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <View style={styles.levelSelectorContainer}>
        <LevelSelector header="Selected level" />
      </View>
      <ScrollView style={{ width: '100%' }}>
        <BarSelector
          textContent="Calendar"
          onPress={() => navigation.navigate('Calendar')}
          iconName="calendar-outline"
        />
        <BarSelector
          textContent="All activities"
          onPress={() => navigation.navigate('AllActivities')}
          iconName="view-headline"
        />
        <BarSelector
          textContent="Favourites"
          onPress={() => navigation.navigate('Favourites')}
          iconName="heart-outline"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  levelSelectorContainer: {
    paddingBottom: 20,
  },
});

export default ProfileScreen;
