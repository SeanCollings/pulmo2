import React, { useContext, useEffect, useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import options from './options';
import { HistoryContext } from '../../context/history-context';
import {
  convertDate,
  getRemainingTime,
  getTotalResultTime,
  getDay,
} from '../../utils';
import ListScroller from '../../components/ListScroller';
import { STRENGTH_KEY, ENDURANCE_KEY } from '../../data';
import LevelSelector from '../../components/LevelSelector';
import { useTheme } from '../../hooks/useTheme';
import ThemeSelector from '../../components/ThemeSelector';
import Tabs from '../../components/Tabs';

const HISTORY = 'History';
const FAVOURITES = 'Favourites';

export const profileScreenOptions = options;

const getIcon = (type) => {
  if (type === STRENGTH_KEY) {
    return 'dumbbell';
  } else if (type === ENDURANCE_KEY) {
    return 'clock';
  } else {
    return 'wrench';
  }
};

const RenderItemHistory = ({ item, navigation }) => {
  const theme = useTheme();
  const { date, excercise, results, type, level } = item;
  const totalTime = getTotalResultTime(results);
  const icon = getIcon(type);

  return (
    <View style={styles.activityItemContainer}>
      <TouchableOpacity
        style={styles.activityResultContainer}
        onPress={() => navigation.navigate('Activity', { item })}
        activeOpacity={0.6}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} color={theme.BORDER} size={30} />
        </View>
        <View style={styles.activityTextContainer}>
          <Text style={{ ...styles.activityHeading, color: theme.SECONDARY }}>
            {excercise.title}
          </Text>
          <Text style={{ ...styles.activityText, color: theme.TEXT }}>
            {getDay(date)} {convertDate(date)}
          </Text>
          <View style={styles.bottomItemContainer}>
            <Text
              style={{
                ...styles.activityText,
                color: theme.TEXT,
                opacity: 0.7,
              }}
            >
              {getRemainingTime(totalTime)}
            </Text>
            <Text
              style={{
                ...styles.activityText,
                color: theme.TEXT,
                opacity: 0.7,
              }}
            >
              level: {level}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View
        style={{ ...styles.verticalLine, borderTopColor: theme.BORDER }}
      ></View>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const theme = useTheme();
  const { activities, getSavedActivites } = useContext(HistoryContext);
  const [allActivites, setAllActivites] = useState(activities);
  const [favouritedActivities, setFavouritedActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(HISTORY);

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
    const sortedActivites = activities.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );
    const favExcercises = sortedActivites.filter(
      (activity) => activity.favourite
    );

    setFavouritedActivities(favExcercises);
    setAllActivites(sortedActivites);
    setSelectedTab(HISTORY);
  }, [activities]);

  const tabSelectHandler = (selected) => {
    setSelectedTab(selected);
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <LevelSelector header="difficulty level" />
      <View style={styles.themeContainer}>
        <ThemeSelector />
      </View>
      <View style={styles.historyContainer}>
        <Tabs
          options={[HISTORY, FAVOURITES]}
          onPress={tabSelectHandler}
          selectedTab={selectedTab}
        />
      </View>
      <View style={styles.listContainer}>
        {isLoading && (
          <View style={{ paddingTop: 20 }}>
            <ActivityIndicator size="large" color={theme.SECONDARY} />
          </View>
        )}
        {!isLoading && (
          <View>
            <View style={{ ...(selectedTab !== HISTORY ? { height: 0 } : {}) }}>
              <ListScroller
                data={allActivites}
                uid={'date'}
                RenderItem={RenderItemHistory}
                navigation={navigation}
              />
            </View>
            <View
              style={{ ...(selectedTab !== FAVOURITES ? { height: 0 } : {}) }}
            >
              <ListScroller
                data={favouritedActivities}
                uid={'date'}
                RenderItem={RenderItemHistory}
                navigation={navigation}
              />
            </View>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  verticalLine: {
    width: '80%',
    borderTopWidth: 1,
    opacity: 0.6,
  },
  themeContainer: {
    position: 'absolute',
    right: 0,
    width: '100%',
    alignItems: 'flex-end',
    paddingRight: '1%',
    marginTop: 10,
    paddingRight: 10,
  },
  historyContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    width: '80%',
  },
  historyHeaderText: {
    fontSize: 20,
    fontFamily: 'tit-regular',
    textTransform: 'lowercase',
  },
  listContainer: {
    flex: 1,
    paddingTop: 5,
    paddingBottom: 20,
  },
  activityItemContainer: {
    alignItems: 'center',
    paddingTop: 5,
  },
  activityResultContainer: {
    flexDirection: 'row',
    paddingBottom: 5,
    paddingHorizontal: '10%',
  },
  iconContainer: {
    alignItems: 'center',
    width: '20%',
    justifyContent: 'center',
  },
  activityTextContainer: {
    width: '80%',
  },
  activityHeading: {
    fontFamily: 'tit-regular',
    fontSize: 18,
  },
  activityText: {
    fontFamily: 'tit-light',
    fontSize: 14,
  },
  bottomItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
});

export default ProfileScreen;
