import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator } from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import { HistoryContext } from '../../context/history-context';
import ListScroller from '../../components/ListScroller';
import ActivityMinDetail from '../../components/ActivityMinDetail';

export const favouritesScreenOptions = options;

const FavouritesScreen = ({ navigation }) => {
  const theme = useTheme();
  const firstMount = useRef(true);
  const { activities, activitiesUpdated, getSavedActivites } = useContext(
    HistoryContext
  );
  const [favouritedActivities, setFavouritedActivities] = useState([]);
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
    const favExcercises = activities
      .filter((activity) => activity.favourite)
      .sort((a, b) => new Date(b.date) - new Date(a.date));

    setFavouritedActivities(favExcercises);
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
          data={favouritedActivities}
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

export default FavouritesScreen;
