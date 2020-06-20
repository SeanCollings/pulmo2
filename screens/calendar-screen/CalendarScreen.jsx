import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import { HistoryContext } from '../../context/history-context';
import { getColourCache, isLeapYear } from '../../utils';
import { MONTHS, WEEK_DAYS, DAYS } from '../../constants/constants';
import ModalDayActivities from '../../components/modals/ModalDayActivities';

export const calendarScreenOptions = options;

const SCREEN_HEIGHT = Dimensions.get('window').height;

const monthSubstring = (date) => date.toISOString().substr(0, 7);

const formatMonth = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString();
  const month = MONTHS[newDate.getMonth()];
  return `${month} ${year}`;
};

const CalendarScreen = ({ navigation }) => {
  const theme = useTheme();
  const { activitiesUpdated, getActivitiesByMonth } = useContext(
    HistoryContext
  );
  const [selectedMonth, setSelectedMonth] = useState(new Date());
  const [monthsActivities, setMonthsActivities] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const [modalContents, setModalContents] = useState(null);

  const colourCache = getColourCache(theme);

  useEffect(() => {
    const formattedMonth = monthSubstring(new Date());
    setMonthsActivities({
      ...monthsActivities,
      [formattedMonth]: getActivitiesByMonth(formattedMonth),
    });
  }, [activitiesUpdated]);

  useEffect(() => {
    const formattedMonth = monthSubstring(selectedMonth);
    if (!monthsActivities[formattedMonth]) {
      setIsFetching(true);
      setMonthsActivities({
        ...monthsActivities,
        [formattedMonth]: getActivitiesByMonth(formattedMonth),
      });
    }

    setIsFetching(false);
    return () => {};
  }, [selectedMonth]);

  const getNewMonth = (nextMonth, month) => {
    let newMonth = new Date(month ? month : selectedMonth);
    newMonth.setMonth(newMonth.getMonth() + (nextMonth ? 1 : -1));
    return newMonth;
  };

  const previousMonthHandler = () => {
    setSelectedMonth(getNewMonth(false));
  };
  const nextMonthHandler = () => {
    setSelectedMonth(getNewMonth(true));
  };

  const isActivityPresent = (day) => {
    const formattedMonth = monthSubstring(selectedMonth);

    if (!monthsActivities[formattedMonth]) return [];
    const presentActivities = monthsActivities[formattedMonth]
      .filter((activity) => activity.day === day)
      .sort((a, b) => new Date(b.date) + new Date(a.date));

    return presentActivities;
  };

  const daySelectedHandler = (selectedDay, selectedActivities) => {
    if (!selectedActivities.length) return;

    const newDate = `${selectedDay} ${formatMonth(selectedMonth)}`;
    const contents = {
      day: newDate,
      activities: selectedActivities,
    };

    setModalContents(contents);
  };

  const generateMatrix = (generateMonth) => {
    const newDate = new Date(generateMonth);
    const matrix = [];
    matrix[0] = WEEK_DAYS;

    const year = newDate.getFullYear();
    const month = newDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay();
    const maxDays = DAYS[month] + isLeapYear(month, year);

    let counter = 1;
    let nextMonthCounter = 1;
    for (let row = 1; row < 7; row++) {
      matrix[row] = [];
      for (let col = 0; col < 7; col++) {
        if (row === 1 && col >= firstDay) {
          matrix[row][col] = { day: counter++ };
        } else if (row > 1 && counter <= maxDays) {
          matrix[row][col] = { day: counter++ };
        } else if (row > 1) {
          matrix[row][col] = { day: nextMonthCounter++, other: true };
        } else {
          const previous = getNewMonth(false, newDate);
          const previousMonth = previous.getMonth();

          const daysInPreviousMonth =
            DAYS[previousMonth] +
            isLeapYear(previousMonth, previous.getFullYear());
          const previousDate = daysInPreviousMonth - (firstDay - col - 1);

          matrix[row][col] = { day: previousDate, other: true };
        }
      }
    }

    return matrix;
  };

  const matrix = generateMatrix(selectedMonth);
  const Calendar = ({ calendarHeight }) => {
    return matrix.map((row, rowIndex) => {
      const rowItems = row.map((item, colIndex) => {
        const maxExcercises =
          SCREEN_HEIGHT > 600 ? (SCREEN_HEIGHT > 700 ? 3 : 2) : 1;
        const maxRows = matrix[6][0].other ? 5 : 6;
        const rowHeight = ((calendarHeight - 10 - maxRows) / maxRows) * 0.85;
        const titleRow = rowIndex === 0;
        const presentActivities = isActivityPresent(item.day);

        if (rowIndex === 6 && row[0].other) {
          return null;
        }

        const calendarTextStyle = {
          ...styles.calendarText,
          color:
            item.day === new Date(selectedMonth).getDate()
              ? theme.SECONDARY
              : theme.TEXT,
          opacity: theme.DARK ? 0.87 : 1,
          paddingBottom: titleRow ? 0 : 2,
          fontFamily:
            item.day === new Date(selectedMonth).getDate()
              ? 'tit-bold'
              : 'tit-light',
        };

        return (
          <View
            key={`col-${colIndex}`}
            style={{ ...styles.dayContainer, opacity: item.other ? 0.36 : 1 }}
          >
            <TouchableOpacity
              disabled={item.other || titleRow}
              style={{
                flex: 1,
                ...(titleRow ? { height: 20 } : { height: rowHeight }),
                backgroundColor: titleRow
                  ? theme.BACKGROUND
                  : theme.DARK
                  ? theme.PRIMARY
                  : theme.BORDER,
              }}
              onPress={() => daySelectedHandler(item.day, presentActivities)}
            >
              {titleRow && <Text style={calendarTextStyle}>{item}</Text>}
              {!titleRow && (
                <View>
                  <Text style={calendarTextStyle}>{item.day}</Text>
                  {!item.other &&
                    presentActivities.map((activity, actIndex) => {
                      if (actIndex === maxExcercises) {
                        return (
                          <View key={activity.date} style={styles.ellipseMore}>
                            <MaterialCommunityIcons
                              name="dots-horizontal"
                              color={theme.TEXT}
                              size={20}
                              style={{ opacity: theme.DARK ? 0.63 : 0.8 }}
                            />
                          </View>
                        );
                      } else if (actIndex > maxExcercises) {
                        return null;
                      }

                      return (
                        <View key={activity.date} style={styles.activityBar}>
                          <View
                            style={{
                              backgroundColor: colourCache[activity.type],
                              height: 5,
                            }}
                          ></View>
                        </View>
                      );
                    })}
                </View>
              )}
            </TouchableOpacity>
          </View>
        );
      });

      return (
        <View key={`row-${rowIndex}`} style={styles.weekContainer}>
          {rowItems}
        </View>
      );
    });
  };

  const monthTextStyle = {
    ...styles.monthTextStyle,
    color: theme.SECONDARY,
  };
  const buttonHitslop = { top: 0, bottom: 0, left: 20, right: 20 };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      {isFetching && (
        <View style={styles.spinner}>
          <ActivityIndicator
            size="large"
            color={theme.DARK ? theme.SECONDARY : theme.BACKGROUND}
          />
        </View>
      )}
      <View style={styles.calendarDetailContainer}>
        <TouchableOpacity
          onPress={previousMonthHandler}
          hitSlop={buttonHitslop}
        >
          <View style={{ ...styles.iconContainer }}>
            <MaterialCommunityIcons
              name="chevron-left"
              color={theme.SECONDARY}
              size={40}
            />
          </View>
        </TouchableOpacity>
        <Text style={monthTextStyle}>{formatMonth(selectedMonth)}</Text>
        <TouchableOpacity onPress={nextMonthHandler} hitSlop={buttonHitslop}>
          <View style={{ ...styles.iconContainer }}>
            <MaterialCommunityIcons
              name="chevron-right"
              color={theme.SECONDARY}
              size={40}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={{
          ...styles.calendarContainer,
          opacity: isFetching ? 0.6 : 1,
        }}
      >
        <Calendar calendarHeight={(SCREEN_HEIGHT - 160) * 0.9} />
      </View>
      {modalContents && (
        <ModalDayActivities
          cancelModel={() => setModalContents(null)}
          header={modalContents.day}
          activities={modalContents.activities}
          navigation={navigation}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    alignItems: 'center',
  },
  calendarDetailContainer: {
    width: '80%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 15,
  },
  iconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
  },
  monthTextStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
    justifyContent: 'center',
    textAlignVertical: 'center',
  },
  calendarContainer: {
    width: '100%',
    height: '90%',
    flex: 1,
  },
  weekContainer: {
    flexDirection: 'row',
    marginVertical: 1,
  },
  dayContainer: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 1,
  },
  calendarText: {
    fontSize: 14,
    paddingLeft: 4,
  },
  activityBar: {
    width: '100%',
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
  ellipseMore: {
    paddingHorizontal: 5,
    height: 5,
    justifyContent: 'center',
  },
  spinner: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
    opacity: 0.8,
  },
});

export default CalendarScreen;
