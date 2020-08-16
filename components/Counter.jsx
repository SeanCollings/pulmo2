import React, { useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  Animated,
  View,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';

const firstNumberIs1 = (number) => {
  if (number > 99) return false;

  const regEx = /^1[0-9].*$/;
  return regEx.test(number.toString()) || number === 1;
};

const Counter = ({
  reset,
  disabled,
  duration = 200,
  countStart = 0,
  jest = false,
}) => {
  const theme = useTheme();
  const firstMount = useRef(true);
  const [count, setCount] = useState(countStart);
  const [animatedRotate, setAnimatedRotate] = useState(new Animated.Value(0));
  const [animatedGrow] = useState(new Animated.Value(0));
  const animatedOpacity = new Animated.Value(0);

  const interpolateRotate = animatedRotate.interpolate({
    inputRange: [0, 1],
    outputRange: ['-90deg', '0deg'],
  });

  const rotateAnimation = (duration) =>
    Animated.timing(animatedRotate, {
      toValue: 1,
      duration,
      delay: firstMount.current ? 100 : 0,
      useNativeDriver: false,
    });
  const opacityAnimation = Animated.timing(animatedOpacity, {
    toValue: 1,
    duration,
    useNativeDriver: false,
  });
  const growAnimation = Animated.timing(animatedGrow, {
    toValue: 1,
    duration,
    useNativeDriver: false,
  });

  useEffect(() => {
    Animated.parallel([
      growAnimation,
      rotateAnimation(duration),
      opacityAnimation,
    ]).start(({ finished }) => {
      if (finished && !jest) setAnimatedRotate(new Animated.Value(0));
    });
  }, []);

  useEffect(() => {
    if (firstMount.current) {
      firstMount.current = false;
    } else if (reset) {
      rotateAnimation(duration).start(({ finished }) => {
        if (finished && !jest) setAnimatedRotate(new Animated.Value(0));
      });
      setCount(0);
    }
  }, [reset]);

  const countUpHandler = () => {
    if (count < 999) setCount((curr) => curr + 1);
  };
  const countDownHandler = () => {
    if (count > 0) setCount((curr) => curr - 1);
  };

  const animatedRotateStyle = {
    transform: [{ rotate: interpolateRotate }],
  };
  const animatedGrowStyle = {
    transform: [{ scale: animatedGrow }],
  };

  return (
    <Animated.View
      style={{
        ...styles.container,
        opacity: animatedOpacity,
        backgroundColor:
          firstMount.current || disabled ? theme.BACKGROUND : theme.SECONDARY,
      }}
    >
      <View style={{ opacity: disabled ? 0.5 : 1 }}>
        <Animated.View style={{ ...animatedGrowStyle }}>
          <TouchableOpacity
            testID="counterButton"
            activeOpacity={0.8}
            style={{
              ...styles.fabContainer,
              backgroundColor: theme.BACKGROUND,
              borderColor: theme.SECONDARY,
            }}
            onPress={countUpHandler}
            onLongPress={countDownHandler}
            disabled={disabled}
          >
            <Animated.View style={{ ...animatedRotateStyle }}>
              {count === 0 && (
                <MaterialCommunityIcons
                  name={'plus'}
                  color={theme.SECONDARY}
                  size={30}
                />
              )}
              {count > 0 && (
                <Text
                  style={{
                    ...styles.textStyle,
                    color: theme.SECONDARY,
                    marginRight: firstNumberIs1(count) ? 3 : 0,
                  }}
                >
                  {count}
                </Text>
              )}
            </Animated.View>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    marginRight: 15,
    marginBottom: 20,
    borderRadius: 55,
  },
  fabContainer: {
    width: 55,
    height: 55,
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: 'tit-regular',
    fontSize: 30,
    marginTop: -5,
  },
});

export default Counter;
