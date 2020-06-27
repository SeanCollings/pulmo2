import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Dimensions,
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
import RatingDetail from '../../components/RatingDetail';
import CategoryContainer from '../../components/CategoryContainer';

export const activityScreenOptions = options;

const SCREEN_WIDTH = Dimensions.get('window').width;

const getIncompleteReason = (value) => {
  if (value === OPTION_SELECT_A_REASON.value) return '';

  const option = OPTIONS_END_ACTIVITY_EARLY.find((opt) => opt.value === value);

  if (!option) return '';
  return `Reason: ${option.label}`;
};

const DetailContainer = ({ type, detail, colour, theme }) => {
  return (
    <View
      style={{
        ...styles.detailContainer,
        backgroundColor: theme.DARK ? theme.PRIMARY : colour,
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
  const {
    activitiesUpdated,
    deleteActivity,
    favouriteActivity,
    getActivityByDate,
  } = useContext(HistoryContext);
  const firstMount = useRef(true);
  const [showModal, setShowModal] = useState(false);
  const [isFavourite, setIsFavourite] = useState(favourite);
  const [selectedActivity, setSelectedActivity] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState(false);

  const {
    excercise,
    level,
    results,
    type,
    incomplete,
    rating,
  } = selectedActivity;

  const getSelectedActivity = useCallback(
    (activity) => {
      setIsLoading(false);
      setSelectedActivity(activity);
      navigation.setOptions({
        headerTitle: ({ tintColor, style }) => {
          let title = (activity && activity.excercise.title) || '';

          if (SCREEN_WIDTH < 350 && title.length > 18) {
            title = title.substr(0, 18) + '...';
          }

          return (
            <Text style={{ fontSize: 20, color: tintColor, ...style }}>
              {title}
            </Text>
          );
        },
      });
    },
    [navigation]
  );

  useEffect(() => {
    getActivityByDate(date).then((activity) => {
      getSelectedActivity(activity);
    });
  }, []);

  useEffect(() => {
    if (isDeleting) {
      setIsDeleting(false);
      deleteActivity(date).then(() => {
        navigation.goBack();
      });
    }
  }, [isDeleting, date, navigation, deleteActivity]);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else {
      setIsLoading(true);
      getActivityByDate(date).then((activity) => {
        getSelectedActivity(activity);
      });
    }
  }, [activitiesUpdated]);

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
    setShowModal(false);
    setIsDeleting(true);
    setIsLoading(true);
  };

  const editActivityHandler = () => {
    navigation.navigate('EditActivity', {
      editActivity: {
        date,
        title: excercise.title,
        reason: incomplete,
        rating,
        level,
      },
    });
  };

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <ScrollView>
        <View style={{ alignItems: 'center', opacity: isLoading ? 0.36 : 1 }}>
          <View style={{ ...styles.topContainer, opacity }}>
            {isLoading && (
              <View style={styles.spinner}>
                <ActivityIndicator size="small" color={theme.TEXT} />
              </View>
            )}
            {!isLoading && (
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
          <CategoryContainer
            header="Results"
            alignItems="flex-start"
            paddingVertical={0}
          ></CategoryContainer>
          <View style={styles.resultsContainer}>
            <Table
              headerContent={['Workout', 'Rest']}
              rowContents={results || []}
              headerColour={theme.DARK ? theme.TEXT : theme.TERTIARY}
              alwaysShowHeader
            />
          </View>
          {incomplete && (
            <CategoryContainer
              header="Status: Incomplete"
              alignItems="flex-start"
              paddingVertical={18}
            >
              {!!incomplete.length && (
                <Text
                  style={{
                    ...styles.reasonTextStyle,
                    color: theme.TEXT,
                    opacity,
                  }}
                >
                  {getIncompleteReason(incomplete[0])}
                </Text>
              )}
            </CategoryContainer>
          )}
          {(rating || rating === 0) && (
            <CategoryContainer
              header="How did you feel?"
              alignItems="flex-start"
              paddingVertical={10}
            >
              <RatingDetail rating={rating} />
            </CategoryContainer>
          )}
        </View>
        {showModal && (
          <ConfirmModal
            cancelModal={() => setShowModal(false)}
            confirmModal={deleteActivityHandler}
            message="Are you sure you want to delete this activity permanently? "
          />
        )}
      </ScrollView>
      <View
        style={{ ...styles.buttonContainer, opacity: isLoading ? 0.36 : 1 }}
      >
        <CustomButton
          title="delete"
          onPress={showModalHandler}
          disabled={isLoading}
          style={{ width: 100 }}
        />
        <CustomButton
          title="Edit"
          onPress={editActivityHandler}
          disabled={isLoading}
          style={{ width: 100 }}
        />
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
    paddingBottom: 2,
    paddingLeft: 10,
  },
  headingStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
  },
  levelContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  allDetailContainer: {
    width: '90%',
    paddingBottom: 20,
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
    paddingVertical: 20,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
  },
  spinner: {
    alignSelf: 'center',
    paddingHorizontal: 10,
  },
  incompleteContainer: {
    alignItems: 'center',
    paddingBottom: 10,
  },
});

export default ActivityScreen;
