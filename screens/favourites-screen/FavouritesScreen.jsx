import React, { useContext, useState, useEffect, useRef } from 'react';
import { StyleSheet, View, ActivityIndicator, Text } from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import {
  HistoryContext,
  ACTIVITY_UNFAVOURITE,
  ACTIVITY_UPDATE,
} from '../../context/history-context';
import ListScroller from '../../components/ListScroller';
import ActivityMinDetail from '../../components/ActivityMinDetail';
import AnimatedBottomSpinner from '../../components/animated/AnimatedBottomSpinner';

export const favouritesScreenOptions = options;

const FavouritesScreen = ({ navigation }) => {
  const theme = useTheme();
  const firstMount = useRef(true);
  const { updatedActivity, getFavActiviesBySlice } = useContext(HistoryContext);
  const [currentLoad, setCurrentLoad] = useState(0);
  const [favouritedActivities, setFavouritedActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [animateIn, setAnimateIn] = useState(false);
  const [animateOut, setAnimateOut] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  useEffect(() => {
    getFavActiviesBySlice(currentLoad).then((activitiesSlice) => {
      setIsLoading(false);
      setFavouritedActivities(activitiesSlice);
      setCurrentLoad(1);
    });

    return () => {
      setCurrentLoad(0);
      setFavouritedActivities([]);
    };
  }, []);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else if (updatedActivity) {
      switch (updatedActivity.type) {
        case ACTIVITY_UPDATE:
          const updatedActivities = [...favouritedActivities];
          const foundIndex = updatedActivities.findIndex(
            (activity) => activity.date === updatedActivity.activity.date
          );

          if (foundIndex >= 0) {
            updatedActivities[foundIndex] = updatedActivity.activity;
            setFavouritedActivities(updatedActivities);
          }
          break;
        case ACTIVITY_UNFAVOURITE:
          const updatedActivies = favouritedActivities.filter(
            (activity) => activity.date !== updatedActivity.date
          );
          setFavouritedActivities(updatedActivies);
          break;
        default:
          break;
      }
    }
  }, [updatedActivity, firstMount]);

  const endReachedHandler = async () => {
    setAnimateIn(true);
    setLoadingMore(true);
  };

  const animateInFinishedHandler = () => {
    setAnimateIn(false);
    getFavActiviesBySlice(currentLoad)
      .then((activitiesSlice) => {
        if (!!activitiesSlice.length) {
          const newActivitiesArray = [
            ...favouritedActivities,
            ...activitiesSlice,
          ];
          setFavouritedActivities(newActivitiesArray);
          setCurrentLoad((curr) => curr + 1);
        }
        setAnimateOut(true);
        setLoadingMore(false);
      })
      .catch(() => {
        setAnimateOut(true);
        setLoadingMore(false);
      });
  };
  const animateOutFinishedHandler = () => {
    setAnimateOut(false);
  };

  const opacity = theme.DARK ? 0.83 : 1;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      {isLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={theme.SECONDARY} />
        </View>
      )}
      {!isLoading && !!favouritedActivities.length && (
        <ListScroller
          data={favouritedActivities}
          uid={'date'}
          RenderItem={ActivityMinDetail}
          navigation={navigation}
          theme={theme}
          onEndReached={endReachedHandler}
          opacity={loadingMore ? 0.5 : 1}
        />
      )}
      {favouritedActivities && !favouritedActivities.length && !isLoading && (
        <View style={styles.favouriteContainer}>
          <Text style={{ ...styles.favouriteText, color: theme.TEXT, opacity }}>
            Favourited activities are shown here.
          </Text>
        </View>
      )}
      <AnimatedBottomSpinner
        animateIn={animateIn}
        animateOut={animateOut}
        animateInFinished={animateInFinishedHandler}
        animateOutFinished={animateOutFinishedHandler}
      />
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
  favouriteContainer: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
  },
  favouriteText: {
    fontSize: 16,
    fontFamily: 'tit-light',
  },
});

export default FavouritesScreen;
