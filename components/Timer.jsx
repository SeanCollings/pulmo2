import React, { useState, useEffect, useCallback, useRef } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { getRemainingTime } from '../utils';
import { useTheme } from '../hooks/useTheme';

const Timer = ({ isActive, timerFinished, replacementText, countDownTime }) => {
  const theme = useTheme();
  const [timeRemaining, setTimeRemaining] = useState(countDownTime);
  const minutesSeconds = getRemainingTime(timeRemaining);
  const intervalDiff = useRef(null);

  const resetHandler = useCallback(() => {
    setTimeRemaining(countDownTime);
  }, [countDownTime]);

  useEffect(() => {
    setTimeRemaining(countDownTime);
    if (countDownTime === 0) {
      intervalDiff.current = null;
    }
  }, [countDownTime, intervalDiff]);

  useEffect(() => {
    let interval;

    if (isActive) {
      const dateNow = Date.now();

      const diff =
        (intervalDiff.current && dateNow - intervalDiff.current) || 1000;
      intervalDiff.current = dateNow;
      const newTimeout = Math.max(0, 1000 - (diff - 1000));

      interval = setInterval(() => {
        if (timeRemaining === 0) {
          timerFinished(dateNow);
          resetHandler();
        } else {
          setTimeRemaining((time) => time - 1);
        }
      }, newTimeout);
    } else if (!isActive && timeRemaining !== 0) {
      intervalDiff.current = null;
    }
    return () => {
      interval && clearInterval(interval);
    };
  }, [isActive, timeRemaining, timerFinished, resetHandler, intervalDiff]);

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <View style={styles.container}>
      {replacementText ? (
        <Text style={{ ...styles.replacementText, color: theme.TEXT, opacity }}>
          {replacementText}
        </Text>
      ) : (
        <Text style={{ ...styles.timerText, color: theme.TEXT, opacity }}>
          {minutesSeconds}
        </Text>
      )}
    </View>
  );
};

Timer.defaultProps = {
  timeChange: () => {},
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  timerText: {
    fontSize: 60,
    textAlignVertical: 'center',
    textAlign: 'center',
    fontFamily: 'tit-light',
  },
  replacementText: {
    fontSize: 40,
    height: 60,
    textAlignVertical: 'center',
    fontFamily: 'tit-light',
    textTransform: 'lowercase',
  },
});

export default Timer;
