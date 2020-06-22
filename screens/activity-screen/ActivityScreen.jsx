import React, { useEffect, useState, useContext } from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HistoryContext } from '../../context/history-context';
import options from './options';
import { getTotalResultTime, getRemainingTime, convertDate } from '../../utils';
import Table from '../../components/Table';
import HeaderButton from '../../components/HeaderButton';
import CustomButton from '../../components/CustomButton';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useTheme } from '../../hooks/useTheme';
import {
  OPTIONS_END_ACTIVITY_EARLY,
  OPTION_SELECT_A_REASON,
} from '../../constants/constants';

export const activityScreenOptions = options;

const getIncompleteReason = (value) => {
  if (value === OPTION_SELECT_A_REASON.value) return '';

  const option = OPTIONS_END_ACTIVITY_EARLY.find((opt) => opt.value === value);

  if (!option) return '';
  return `reason: ${option.label}`;
};

const DetailContainer = ({ type, detail, colour, theme }) => {
  return (
    <View
      style={{
        ...styles.detailContainer,
        backgroundColor: theme.DARK ? theme.BACKGROUND : colour,
        borderColor: colour,
        borderWidth: theme.DARK ? 2 : 0,
      }}
    >
      <Text
        style={{
          ...styles.detailText,
          color: theme.DARK ? colour : theme.BACKGROUND,
        }}
      >
        {detail}
      </Text>
      <View style={{ justifyContent: 'center', height: 40 }}>
        <Text
          style={{
            ...styles.detailTypeText,
            color: theme.DARK ? colour : theme.BACKGROUND,
          }}
        >
          {type}
        </Text>
      </View>
    </View>
  );
};

const ActivityScreen = ({ route, navigation }) => {
  const { date, favourite } = route.params.item;

  const theme = useTheme();
  const { deleteActivity, favouriteActivity, getActivityByDate } = useContext(
    HistoryContext
  );
  const [showModal, setShowModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(favourite);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [isFetching, setIsFetching] = useState(true);
  const { excercise, level, results, type, incomplete } = selectedActivity;

  useEffect(() => {
    getActivityByDate(date).then((activity) => {
      setIsFetching(false);
      setSelectedActivity(activity);
    });
  }, []);

  const totalTime = getTotalResultTime(results || []);

  const favouriteHandler = () => {
    setIsFavourite((curr) => !curr);
    favouriteActivity(date);
  };

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="help"
            iconName={isFavourite ? 'heart' : 'heart-outline'}
            onPress={favouriteHandler}
          />
        </HeaderButtons>
      ),
    });
  }, [isFavourite]);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const deleteActivityHandler = () => {
    navigation.goBack();
    setShowModal(false);
    deleteActivity(date);
  };

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <ScrollView>
        <View style={{ alignItems: 'center', opacity: isFetching ? 0.36 : 1 }}>
          <View style={{ ...styles.topContainer, opacity }}>
            {isFetching && (
              <View style={styles.spinner}>
                <ActivityIndicator size="small" color={theme.TEXT} />
              </View>
            )}

            {!isFetching && (
              <Text
                style={{ ...styles.headingStyle, color: theme.TEXT, opacity }}
              >
                {type || ''}
              </Text>
            )}

            <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
              {convertDate(date)}
            </Text>
          </View>
          <View
            style={{ ...styles.verticalLine, borderTopColor: theme.BORDER }}
          ></View>
          <View style={styles.levelContainer}>
            <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
              total time: {(results && getRemainingTime(totalTime)) || '00:00'}
            </Text>
            <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
              level: {level || '_'}
            </Text>
          </View>
          <View style={styles.allDetailContainer}>
            <DetailContainer
              type={`inhale & exhale`}
              detail={(excercise && excercise.cycles) || '_'}
              theme={theme}
              colour={theme.QUATERNARY}
            />
            <DetailContainer
              type="rest"
              detail={
                (excercise && getRemainingTime(excercise.rest)) || '__:__'
              }
              colour={theme.SECONDARY}
              theme={theme}
            />
            <DetailContainer
              type="rounds"
              detail={(excercise && excercise.rounds) || '_'}
              theme={theme}
              colour={theme.QUATERNARY}
            />
          </View>
          <View style={styles.resultsContainer}>
            <Text
              style={{
                ...styles.headingStyle,
                paddingBottom: 5,
                color: theme.SECONDARY,
              }}
            >
              results
            </Text>
            <Table
              headerContent={['Workout', 'Rest']}
              rowContents={results || []}
              headerColour={theme.DARK ? theme.TEXT : theme.TERTIARY}
              alwaysShowHeader
            />
            {incomplete && (
              <View style={{ alignItems: 'center' }}>
                <Text
                  style={{ ...styles.textStyle, color: theme.TEXT, opacity }}
                >
                  Incomplete
                </Text>
                {!!incomplete.length && (
                  <Text
                    style={{
                      ...styles.reasonTextStyle,
                      color: theme.TEXT,
                      opacity: theme.DARK ? 0.63 : 0.8,
                    }}
                  >
                    {getIncompleteReason(incomplete[0])}
                  </Text>
                )}
              </View>
            )}
          </View>
        </View>
        {showModal && (
          <ConfirmModal
            cancelModal={() => setShowModal(false)}
            confirmModal={deleteActivityHandler}
            message="Are you sure you want to delete this activity permanently? "
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="delete" onPress={showModalHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalLine: {
    width: '80%',
    borderTopWidth: 1,
    opacity: 0.6,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 15,
  },
  textStyle: {
    fontFamily: 'tit-light',
    fontSize: 18,
  },
  reasonTextStyle: {
    fontFamily: 'tit-light',
    fontSize: 17,
    textTransform: 'lowercase',
  },
  headingStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
  },
  levelContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  allDetailContainer: {
    width: '90%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '32%',
    borderRadius: 20,
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'tit-regular',
    fontSize: 24,
    paddingBottom: 5,
  },
  detailTypeText: {
    fontFamily: 'tit-regular',
    textAlign: 'center',
  },
  resultsContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  spinner: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
});

export default ActivityScreen;
