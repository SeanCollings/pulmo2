import React, {
  useCallback,
  useReducer,
  useState,
  useContext,
  useEffect,
} from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

import { ExcerciseContext } from '../../context/excercise-context';
import { CustomExcerciseContext } from '../../context/custom-excercise-context';
import { ProfileContext, SELECTED_LEVEL } from '../../context/profile-context';
import { HistoryContext } from '../../context/history-context';
import options from './options';
import Timer from '../../components/Timer';
import {
  CircleIconButton,
  CircleTextButton,
} from '../../components/CircleButton';
import {
  INTIAL_STATE,
  BREATHING_STATE,
  END_STATE,
  REST_STATE,
} from '../../constants/constants';
import {
  inputInitialState,
  inputReducer,
  INPUT_BREATH,
  INPUT_END,
  INPUT_REST,
  INPUT_TOGGLE,
  INPUT_STOP,
} from '../../hooks/inputReducer';
import Table from '../../components/Table';
import ModalBegin from '../../components/modals/ModalBegin';
import { formatMilliToSeconds } from '../../utils';
import {
  DATA,
  STRENGTH_KEY,
  ENDURANCE_KEY,
  CUSTOM_KEY,
  DEFAULT_EXCERCISE,
} from '../../data';
import { useTheme } from '../../hooks/useTheme';

export const homeScreenOptions = options;

let timeStampBreath;
let timeStampRest;

const getExcerciseById = (id, type, customExcercises) => {
  if (!id) {
    return DEFAULT_EXCERCISE;
  }

  switch (type) {
    case STRENGTH_KEY:
      return DATA[STRENGTH_KEY].find((x) => x.id === id);
    case ENDURANCE_KEY:
      return DATA[ENDURANCE_KEY].find((x) => x.id === id);
    case CUSTOM_KEY:
      const custom = customExcercises.find((x) => x.id === id);
      if (!custom) return DEFAULT_EXCERCISE;
      return custom;
    default:
      DEFAULT_EXCERCISE;
  }
};

const HomeScreen = ({ navigation }) => {
  const theme = useTheme();
  const { selectedExcercise } = useContext(ExcerciseContext);
  const { customExcercises } = useContext(CustomExcerciseContext);
  const { profileContext } = useContext(ProfileContext);
  const { addActivity } = useContext(HistoryContext);

  const [showModal, setShowModal] = useState(false);
  const [userTimes, setUserTimes] = useState([]);
  const [currentBreathTime, setCurrentBreathTime] = useState('');

  const [
    { isActive, currentRound, instructions, countDownTime },
    dispatch,
  ] = useReducer(inputReducer, inputInitialState);

  const activeExcercise = selectedExcercise
    ? getExcerciseById(
        selectedExcercise[0],
        selectedExcercise[1],
        customExcercises
      )
    : {};

  useEffect(() => {
    if (selectedExcercise) {
      dispatch({ type: INPUT_STOP });
      setUserTimes([]);
    }
  }, [selectedExcercise]);

  const toggleHandler = () => {
    if (instructions.state === END_STATE) {
      setUserTimes([]);
      dispatch({ type: INPUT_STOP });
    } else if (currentRound > 0) {
      dispatch({ type: INPUT_TOGGLE, isActive: !isActive });
    } else {
      setShowModal(true);
    }
  };

  const timerFinished = useCallback(
    (timeNow) => {
      if (currentRound < +activeExcercise.rounds) {
        // Finess the time
        const timeDifferenceRest = formatMilliToSeconds(
          timeNow -
            timeStampRest -
            (countDownTime > 53 ? 1000 * Math.max(1, countDownTime / 60) : 0)
        );

        setUserTimes((curr) => [
          ...curr,
          [currentBreathTime, timeDifferenceRest],
        ]);

        timeStampBreath = Date.now();
        setCurrentBreathTime(timeStampBreath);

        dispatch({
          type: INPUT_BREATH,
          currentRound: currentRound + 1,
          countDownTime: activeExcercise.rest,
        });
      }
    },
    [currentRound, currentBreathTime, timeStampRest]
  );

  const stopTimerHandler = () => {
    dispatch({ type: INPUT_STOP });
    setUserTimes([]);
    setCurrentBreathTime(null);
  };

  const toggleRestHandler = useCallback(() => {
    const dateNow = Date.now();
    const timeDifferenceBreath = formatMilliToSeconds(
      dateNow - timeStampBreath
    );

    if (currentRound === +activeExcercise.rounds) {
      addActivity(
        new Date().toISOString(),
        activeExcercise,
        profileContext[SELECTED_LEVEL],
        [...userTimes, [timeDifferenceBreath, '']],
        selectedExcercise[1]
      );

      setUserTimes((curr) => [...curr, [timeDifferenceBreath, '']]);
      dispatch({ type: INPUT_END });
    } else {
      setCurrentBreathTime(timeDifferenceBreath);
      dispatch({ type: INPUT_REST });
      timeStampRest = Date.now();
    }
  }, [currentRound, currentBreathTime, timeStampBreath]);

  const closeModalHandler = (startWorkout) => {
    setShowModal(false);

    if (startWorkout) {
      timeStampBreath = Date.now();
      dispatch({
        type: INPUT_BREATH,
        currentRound: 1,
        countDownTime: activeExcercise.rest,
      });
    }
  };

  if (!activeExcercise) return null;

  let progressText = `selected level: ${profileContext[SELECTED_LEVEL]}`;
  if (currentRound > 0 && instructions.state !== END_STATE) {
    progressText = `round ${currentRound}/${activeExcercise.rounds}`;
  } else if (instructions.state === END_STATE) {
    progressText = 'restart';
  }

  let buttonIconName = 'play';
  if (isActive) buttonIconName = 'pause';
  else if (instructions.state === END_STATE) buttonIconName = 'restart';

  const styleSubText = { ...styles.subText, color: theme.TEXT };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
        <View style={styles.timerContainer}>
          <Timer
            isActive={isActive}
            timerFinished={(timeNow) => timerFinished(timeNow)}
            replacementText={!isActive && instructions.prompt}
            countDownTime={countDownTime}
          />
        </View>
        <View style={styles.buttonContainer}>
          {instructions.state !== BREATHING_STATE && (
            <CircleIconButton
              onPress={toggleHandler}
              name={buttonIconName}
              borderWidth={4}
              size={60}
              buttonSize={120}
              iconStyle={{ color: theme.SECONDARY }}
              style={{ borderColor: theme.SECONDARY }}
            />
          )}
          {instructions.state === BREATHING_STATE && (
            <CircleTextButton
              onPress={toggleRestHandler}
              borderWidth={4}
              buttonSize={120}
              fontSize={30}
              text={currentRound !== +activeExcercise.rounds ? 'REST' : 'DONE'}
              textStyle={{ color: theme.SECONDARY }}
              style={{ borderColor: theme.SECONDARY }}
            />
          )}
          <Text style={{ ...styles.progressText, color: theme.TEXT }}>
            {progressText}
          </Text>
          {instructions.state !== INTIAL_STATE &&
            instructions.state !== END_STATE && (
              <CircleIconButton
                onPress={stopTimerHandler}
                name={'restart'}
                iconSize={40}
                buttonSize={56}
                borderWidth={0}
                style={{
                  position: 'absolute',
                  right: '15%',
                  top: 0,
                }}
                iconStyle={{ color: theme.TERTIARY }}
              />
            )}
        </View>
        <View style={styles.instructionContainer}>
          <Text style={{ ...styles.ExcerciseTitle, color: theme.TERTIARY }}>
            {activeExcercise.title}
          </Text>
          {instructions.state !== END_STATE &&
            instructions.state !== REST_STATE && (
              <View style={styles.gridContainer}>
                <Text
                  style={{
                    ...styleSubText,
                    ...styles.textAlignRight,
                    borderRightColor: theme.BORDER,
                  }}
                >{`inhale & exhale`}</Text>
                <Text
                  style={styleSubText}
                >{`${activeExcercise.cycles} times`}</Text>
              </View>
            )}
          {(instructions.state === INTIAL_STATE ||
            instructions.state === REST_STATE) && (
            <View style={styles.gridContainer}>
              <Text
                style={{
                  ...styleSubText,
                  ...styles.textAlignRight,
                  borderRightColor: theme.BORDER,
                }}
              >{`rest for`}</Text>
              <Text
                style={styleSubText}
              >{`${activeExcercise.rest} seconds`}</Text>
            </View>
          )}
          {instructions.state === INTIAL_STATE && (
            <View style={styles.gridContainer}>
              <Text
                style={{
                  ...styleSubText,
                  ...styles.textAlignRight,
                  borderRightColor: theme.BORDER,
                }}
              >{`repeat`}</Text>
              <Text
                style={styleSubText}
              >{`${activeExcercise.rounds} times`}</Text>
            </View>
          )}
        </View>
        <View style={styles.tableContainer}>
          <Table
            headerContent={['Workout', 'Rest']}
            rowContents={userTimes}
            headerColour={theme.DARK ? theme.TEXT : theme.TERTIARY}
          />
        </View>
        {showModal && (
          <ModalBegin
            cancelModel={() => closeModalHandler(false)}
            confirmModal={() => closeModalHandler(true)}
            navigation={navigation}
          />
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  timerContainer: {
    height: 100,
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    paddingBottom: 10,
  },
  instructionContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
  },
  tableContainer: { marginTop: 20, width: '100%', alignItems: 'center' },
  progressText: {
    fontSize: 20,
    fontFamily: 'tit-light',
    marginTop: 10,
  },
  ExcerciseTitle: {
    fontSize: 22,
    fontFamily: 'tit-regular',
    paddingBottom: 5,
  },
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  subText: {
    fontSize: 16,
    paddingTop: 5,
    fontFamily: 'tit-light',
    width: '50%',
    paddingHorizontal: 10,
  },
  textAlignRight: {
    textAlign: 'right',
    borderRightWidth: 1,
  },
});

export default HomeScreen;
