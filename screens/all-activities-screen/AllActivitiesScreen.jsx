import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import { HistoryContext } from '../../context/history-context';
import ListScroller from '../../components/ListScroller';
import ActivityMinDetail from '../../components/ActivityMinDetail';

export const allActivitiesScreenOptions = options;

const AllActivitiesScreen = ({ navigation }) => {
  const theme = useTheme();
  const { activities, activitiesUpdated, getSavedActivites } = useContext(
    HistoryContext
  );
  const [allActivites, setAllActivites] = useState(activities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!activities.length && getSavedActivites) {
      getSavedActivites().then(() => {
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getSavedActivites().then(() => {
      setIsLoading(false);
    });
    const sortedActivites = activities.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    setAllActivites(sortedActivites);
  }, [activitiesUpdated]);

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      {isLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={theme.SECONDARY} />
        </View>
      )}
      {!isLoading && (
        <ListScroller
          data={allActivites}
          uid={'date'}
          RenderItem={ActivityMinDetail}
          navigation={navigation}
          theme={theme}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  spinner: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
});

export default AllActivitiesScreen;
