import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import options from './options';
import { COLORS } from '../../constants/constants';
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
          <MaterialCommunityIcons name={icon} color={COLORS.BORDER} size={30} />
        </View>
        <View style={styles.activityTextContainer}>
          <Text style={styles.activityHeading}>{excercise.title}</Text>
          <Text style={styles.activityText}>
            {getDay(date)} {convertDate(date)}
          </Text>
          <View style={styles.bottomItemContainer}>
            <Text style={{ ...styles.activityText, opacity: 0.7 }}>
              {getRemainingTime(totalTime)}
            </Text>
            <Text style={{ ...styles.activityText, opacity: 0.7 }}>
              level: {level}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <View style={{ ...styles.verticalLine }}></View>
    </View>
  );
};

const ProfileScreen = ({ navigation }) => {
  const { activities, getSavedActivites } = useContext(HistoryContext);
  const [allActivites, setAllActivites] = useState(activities);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!activities.length) {
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

    setAllActivites(sortedActivites);
  }, [activities]);

  return (
    <View style={styles.container}>
      <LevelSelector header="difficulty level" />
      <View style={styles.historyContainer}>
        <Text style={styles.historyHeaderText}>History</Text>
      </View>
      <View style={styles.verticalLine}></View>
      <View style={styles.listContainer}>
        {isLoading && (
          <View style={{ paddingTop: 20 }}>
            <ActivityIndicator size="large" color={COLORS.SECONDARY} />
          </View>
        )}
        {!isLoading && (
          <ListScroller
            data={allActivites}
            uid={'date'}
            RenderItem={RenderItemHistory}
            navigation={navigation}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: COLORS.BACKGROUND,
  },
  verticalLine: {
    width: '80%',
    borderTopColor: COLORS.BORDER,
    borderTopWidth: 1,
    opacity: 0.6,
  },
  historyContainer: { paddingVertical: 10, alignItems: 'center' },
  historyHeaderText: {
    fontSize: 20,
    fontFamily: 'tit-regular',
    color: COLORS.SECONDARY,
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
    color: COLORS.SECONDARY,
  },
  activityText: {
    fontFamily: 'tit-light',
    fontSize: 14,
    color: COLORS.TEXT,
  },
  bottomItemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingRight: 10,
  },
});

export default ProfileScreen;
