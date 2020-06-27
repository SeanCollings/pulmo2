import React, { useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';

import options from './options';
import LevelSelector from '../../components/LevelSelector';
import { useTheme } from '../../hooks/useTheme';
import BarSelector from '../../components/BarSelector';
import { SELECTED_LEVEL, ProfileContext } from '../../context/profile-context';

export const profileScreenOptions = options;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { profileContext, updateProfileContext } = useContext(ProfileContext);
  const selectedLevel = profileContext[SELECTED_LEVEL];

  const levelChangeHandler = (newLevel) => {
    updateProfileContext(SELECTED_LEVEL, newLevel);
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <View style={styles.levelSelectorContainer}>
        <LevelSelector
          header="Selected level"
          selectedLevel={selectedLevel}
          onChange={levelChangeHandler}
        />
      </View>
      <ScrollView style={{ width: '100%' }}>
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
        <BarSelector
          textContent="Calendar"
          onPress={() => navigation.navigate('Calendar')}
          iconName="calendar-outline"
        />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 10,
  },
  levelSelectorContainer: {
    paddingBottom: 10,
  },
});

export default ProfileScreen;
