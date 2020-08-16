import React, { useEffect, useState, useContext, useRef } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Animated,
  Text,
} from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import {
  HistoryContext,
  ACTIVITY_UPDATE,
  ACTIVITY_NEW,
  ACTIVITY_DELETE,
  ACTIVITY_UNFAVOURITE,
} from '../../context/history-context';
import ListScroller from '../../components/ListScroller';
import ActivityMinDetail from '../../components/ActivityMinDetail';

export const allActivitiesScreenOptions = options;

const AllActivitiesScreen = ({ navigation }) => {
  const theme = useTheme();
  const firstMount = useRef(true);
  const { getSavedActivitiesBySlice, updatedActivity } = useContext(
    HistoryContext
  );
  const [currentLoad, setCurrentLoad] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadedActivities, setLoadedActivities] = useState([]);
  const [animatedHeight] = useState(new Animated.Value(100));

  useEffect(() => {
    getSavedActivitiesBySlice(currentLoad).then((activitiesSlice) => {
      setIsLoading(false);
      setLoadedActivities(activitiesSlice);
      setCurrentLoad(1);
    });

    return () => {
      setCurrentLoad(0);
      setLoadedActivities([]);
    };
  }, []);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else if (updatedActivity) {
      switch (updatedActivity.type) {
        case ACTIVITY_UPDATE:
        case ACTIVITY_UNFAVOURITE:
          const updatedActivities = [...loadedActivities];
          const foundIndex = updatedActivities.findIndex(
            (activity) => activity.date === updatedActivity.date
          );

          if (foundIndex >= 0) {
            updatedActivities[foundIndex] = updatedActivity.activity;
            setLoadedActivities(updatedActivities);
          }
          break;
        case ACTIVITY_DELETE:
          const updatedActivies = loadedActivities.filter(
            (activity) => activity.date !== updatedActivity.date
          );
          setLoadedActivities(updatedActivies);
          break;
        case ACTIVITY_NEW:
          navigation.goBack();
          break;
        default:
          break;
      }
    }
  }, [updatedActivity, firstMount]);

  useEffect(() => {
    if (loadingMore) {
      getSavedActivitiesBySlice(currentLoad)
        .then((activitiesSlice) => {
          if (!!activitiesSlice.length) {
            const newActivitiesArray = [
              ...loadedActivities,
              ...activitiesSlice,
            ];
            setLoadedActivities(newActivitiesArray);
            setCurrentLoad((curr) => curr + 1);
          }
          setLoadingMore(false);
        })
        .catch(() => {
          setLoadingMore(false);
        });
    } else {
      Animated.timing(animatedHeight, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [loadingMore]);

  const endReachedHandler = async () => {
    if (loadingMore) return;

    setLoadingMore(true);
    Animated.timing(animatedHeight, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const opacity = theme.DARK ? 0.83 : 1;
  const animatedStyleHeight = {
    translateY: animatedHeight,
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.BACKGROUND,
      }}
    >
      {isLoading && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={theme.SECONDARY} />
        </View>
      )}
      {!isLoading && (
        <ListScroller
          data={loadedActivities}
          uid={'date'}
          RenderItem={ActivityMinDetail}
          navigation={navigation}
          theme={theme}
          onEndReached={endReachedHandler}
          opacity={loadingMore ? 0.5 : 1}
        />
      )}
      {loadedActivities && !loadedActivities.length && !isLoading && (
        <View style={styles.activitiesContainer}>
          <Text style={{ ...styles.favouriteText, color: theme.TEXT, opacity }}>
            Saved activities are shown here.
          </Text>
        </View>
      )}
      <View style={styles.spinnerContainer}>
        <Animated.View
          style={{
            ...styles.spinnerMore,
            ...animatedStyleHeight,
            backgroundColor: theme.BACKGROUND,
            borderColor: theme.DARK ? theme.PRIMARY : theme.BORDER,
          }}
        >
          <ActivityIndicator size="large" color={theme.SECONDARY} />
        </Animated.View>
      </View>
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
  spinnerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  spinnerMore: {
    padding: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
  activitiesContainer: {
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

export default AllActivitiesScreen;
