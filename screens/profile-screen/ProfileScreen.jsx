import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import options from './options';
import LevelSelector from '../../components/LevelSelector';
import { useTheme } from '../../hooks/useTheme';
import BarSelector from '../../components/BarSelector';
import {
  SELECTED_LEVEL,
  ProfileContext,
  STREAK,
} from '../../context/profile-context';
import WorkAverageDeviation from '../../components/WorkAverageDeviation';

export const profileScreenOptions = options;

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { profileContext, updateProfileContext } = useContext(ProfileContext);
  const currentStreak = profileContext[STREAK];
  const selectedLevel = profileContext[SELECTED_LEVEL];
  const [streak, setStreak] = useState(currentStreak);

  useEffect(() => {
    setStreak(currentStreak);
  }, [currentStreak]);

  const levelChangeHandler = (newLevel) => {
    updateProfileContext(SELECTED_LEVEL, newLevel);
  };

  const opacityDarker = theme.DARK ? 0.63 : 0.8;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <WorkAverageDeviation />
      <View style={styles.levelSelectorContainer}>
        <LevelSelector
          header="Selected level"
          selectedLevel={selectedLevel}
          onChange={levelChangeHandler}
        />
      </View>
      <View style={styles.streakContainer}>
        <Text
          style={{
            ...styles.streakText,
            color: theme.TEXT,
            opacity: opacityDarker,
          }}
        >
          {`${streak.current} day streak`}
        </Text>
      </View>
      <ScrollView style={{ width: '100%' }}>
        <BarSelector
          testID="allActivities"
          textContent="All activities"
          onPress={() => navigation.navigate('AllActivities')}
          iconName="view-headline"
        />
        <BarSelector
          testID="favourites"
          textContent="Favourites"
          onPress={() => navigation.navigate('Favourites')}
          iconName="heart-outline"
        />
        <BarSelector
          testID="calendar"
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
  streakContainer: {
    paddingBottom: 10,
  },
  streakText: {
    fontFamily: 'tit-regular',
    fontSize: 18,
  },
});

export default ProfileScreen;
