import React, { useCallback } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {
  getDay,
  convertDate,
  getRemainingTime,
  getTotalResultTime,
  getIcon,
} from '../utils';

const ActivityDetail = ({ item, navigation, theme }) => {
  const { date, excercise, results, type, level } = item;
  const totalTime = getTotalResultTime(results);
  const icon = getIcon(type);

  const onSelect = useCallback(
    () => navigation.navigate('Activity', { item }),
    [item]
  );

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity
        style={styles.activityResultContainer}
        onPress={onSelect}
        activeOpacity={0.6}
      >
        <View style={styles.iconContainer}>
          <MaterialCommunityIcons name={icon} color={theme.BORDER} size={30} />
        </View>
        <View style={styles.activityTextContainer}>
          <Text style={{ ...styles.activityHeading, color: theme.SECONDARY }}>
            {excercise.title}
          </Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ ...styles.activityText, color: theme.QUATERNARY }}>
              {getDay(date)}
            </Text>
            <Text style={{ ...styles.activityText, color: theme.TEXT }}>
              {` ${convertDate(date)}`}
            </Text>
          </View>
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

const styles = StyleSheet.create({
  container: {
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
  verticalLine: {
    width: '80%',
    borderTopWidth: 1,
    opacity: 0.6,
  },
});

export default ActivityDetail;
