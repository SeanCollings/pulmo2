import React, {
  useCallback,
  useReducer,
  useState,
  useContext,
  useEffect,
} from 'react';
import { StyleSheet, View, Text, ScrollView, AppState } from 'react-native';
import { useIsFocused } from '@react-navigation/native';
import { useKeepAwake } from 'expo-keep-awake';
import * as SplashScreen from 'expo-splash-screen';

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
import {
  formatMilliToSeconds,
  getRemainingTime,
  getExcerciseById,
} from '../../utils';
import { useTheme } from '../../hooks/useTheme';
import AnimatedUnderline from '../../components/animated/AnimatedUnderline';
import AnimatedCycleText from '../../components/animated/AnimatedCycleText';
import ModalEndActivity from '../../components/modals/ModalEndActivity';
import Counter from '../../components/Counter';

export const homeScreenOptions = options;

let timeStampBreath;
let timeStampRest;

const HomeScreen = ({ navigation }) => {
  useKeepAwake();
  const theme = useTheme();
  const isFocused = useIsFocused();
  const { selectedExcercise } = useContext(ExcerciseContext);
  const { customExcercises } = useContext(CustomExcerciseContext);
  const { profileContext, updateWorkAverageDeviation } = useContext(
    ProfileContext
  );
  const { addActivity } = useContext(HistoryContext);

  const [showModal, setShowModal] = useState(false);
  const [showEndActivityModal, setShowEndActivityModal] = useState(false);
  const [userTimes, setUserTimes] = useState([]);
  const [currentBreathTime, setCurrentBreathTime] = useState('');
  const [_, setAppState] = useState(AppState.currentState);

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

  const handleAppStateChange = (nextAppState) => {
    if (nextAppState === 'background') {
      dispatch({ type: INPUT_TOGGLE, isActive: false });
    }
    setAppState(nextAppState);
  };

  useEffect(() => {
    SplashScreen.hideAsync();
    AppState.addEventListener('change', handleAppStateChange);
    return () => AppState.removeEventListener('change', handleAppStateChange);
  }, []);

  useEffect(() => {
    if (!isFocused && instructions.state !== INTIAL_STATE) {
      dispatch({ type: INPUT_STOP });
      setUserTimes([]);
      setCurrentBreathTime('');
    }
    return () => {};
  }, [isFocused, instructions.state]);

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
        const timeDifferenceRest = timeNow - timeStampRest;
        const restPausedExtra =
          Math.floor(timeDifferenceRest / 1000) - countDownTime;
        const totalCountDown =
          restPausedExtra > 15 ? restPausedExtra : countDownTime;

        setUserTimes((curr) => [
          ...curr,
          [currentBreathTime, getRemainingTime(totalCountDown)],
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

  const endCurrentActivity = () => {
    dispatch({ type: INPUT_STOP });
    setUserTimes([]);
    setCurrentBreathTime(null);
  };

  const stopTimerHandler = () => {
    if (!!userTimes.length) {
      dispatch({ type: INPUT_TOGGLE, isActive: false });
      setShowEndActivityModal(true);
    } else {
      endCurrentActivity();
    }
  };

  const saveActivity = (timeDifferenceBreath, incomplete) => {
    const timeBreath = timeDifferenceBreath ? [timeDifferenceBreath, ''] : [];
    const results = [...userTimes, timeBreath];

    updateWorkAverageDeviation(results);
    addActivity({
      date: new Date().toISOString(),
      excercise: activeExcercise,
      level: profileContext[SELECTED_LEVEL],
      results,
      type: selectedExcercise[1],
      incomplete,
    });
  };

  const toggleRestHandler = useCallback(() => {
    const dateNow = Date.now();
    const timeDifferenceBreath = formatMilliToSeconds(
      dateNow - timeStampBreath
    );

    if (currentRound === +activeExcercise.rounds) {
      saveActivity(timeDifferenceBreath);

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

  const resumeActivityHandler = () => {
    setShowEndActivityModal(false);

    if (instructions.state === REST_STATE)
      dispatch({ type: INPUT_TOGGLE, isActive: true });
  };
  const cancelEndActivityModalHandler = () => {
    setShowEndActivityModal(false);
    endCurrentActivity();
  };
  const confirmEndActivityModalHandler = (reason) => {
    saveActivity(
      instructions.state === BREATHING_STATE ? null : currentBreathTime,
      [reason]
    );
    setShowEndActivityModal(false);
    endCurrentActivity();
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

  const breathingState = instructions.state === BREATHING_STATE;
  const showRestartButton =
    instructions.state !== INTIAL_STATE && instructions.state !== END_STATE;

  const opacity = theme.DARK ? 0.87 : 1;
  const styleSubText = {
    ...styles.subText,
    color: theme.TEXT,
    opacity,
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View
          style={{
            ...styles.container,
            backgroundColor: theme.BACKGROUND,
          }}
        >
          <View style={styles.timerContainer}>
            <View
              style={{
                ...(!breathingState ? {} : { height: 0, opacity: 0 }),
              }}
            >
              <Timer
                isActive={isActive}
                timerFinished={(timeNow) => timerFinished(timeNow)}
                replacementText={!isActive && instructions.prompt}
                countDownTime={countDownTime}
              />
            </View>
            {breathingState && (
              <AnimatedUnderline>
                <AnimatedCycleText
                  textArray={['Breathe', instructions.prompt]}
                />
              </AnimatedUnderline>
            )}
          </View>
          <View style={styles.buttonContainer}>
            {!breathingState && (
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
            {breathingState && (
              <CircleTextButton
                onPress={toggleRestHandler}
                borderWidth={4}
                buttonSize={120}
                fontSize={30}
                text={
                  currentRound !== +activeExcercise.rounds ? 'REST' : 'DONE'
                }
                textStyle={{ color: theme.SECONDARY }}
                style={{ borderColor: theme.SECONDARY }}
              />
            )}
            {showRestartButton && (
              <CircleIconButton
                onPress={stopTimerHandler}
                name={'restart'}
                iconSize={40}
                buttonSize={56}
                borderWidth={0}
                style={styles.restartButtonContainer}
                iconStyle={{ color: theme.TERTIARY }}
              />
            )}
          </View>
          <Text style={{ ...styles.progressText, color: theme.TEXT, opacity }}>
            {progressText}
          </Text>
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
                >{`rounds`}</Text>
                <Text style={styleSubText}>{`${activeExcercise.rounds}`}</Text>
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
              cancelModal={() => closeModalHandler(false)}
              confirmModal={() => closeModalHandler(true)}
              navigation={navigation}
            />
          )}
          {showEndActivityModal && (
            <ModalEndActivity
              cancelModal={cancelEndActivityModalHandler}
              confirmModal={confirmEndActivityModalHandler}
              resumeActivity={resumeActivityHandler}
            />
          )}
        </View>
      </ScrollView>
      {showRestartButton && (
        <Counter
          disabled={instructions.state === REST_STATE}
          reset={instructions.state === BREATHING_STATE}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingBottom: 70,
  },
  timerContainer: {
    height: 100,
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  instructionContainer: {
    paddingTop: 20,
    paddingBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: '90%',
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
    fontSize: 17,
    paddingTop: 5,
    fontFamily: 'tit-light',
    width: '50%',
    paddingHorizontal: 10,
  },
  textAlignRight: {
    textAlign: 'right',
    borderRightWidth: 1,
  },
  restartButtonContainer: {
    position: 'absolute',
    right: '15%',
    top: 0,
  },
});

export default HomeScreen;
