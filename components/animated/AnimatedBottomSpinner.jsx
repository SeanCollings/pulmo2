import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, ActivityIndicator } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const AnimatedBottomSpinner = ({
  animateInFinished,
  animateOutFinished,
  animateIn,
  animateOut,
}) => {
  const theme = useTheme();
  const [animatedHeight] = useState(new Animated.Value(-100));

  useEffect(() => {
    if (animateIn) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration: 200,
      }).start(({ finished }) => {
        if (finished) {
          animateInFinished();
        }
      });
    }
  }, [animateIn]);

  useEffect(() => {
    if (animateOut) {
      Animated.timing(animatedHeight, {
        toValue: -100,
        duration: 200,
      }).start(({ finished }) => {
        if (finished) {
          animateOutFinished();
        }
      });
    }
  }, [animateOut]);

  const animatedStyleHeight = {
    bottom: animatedHeight,
  };

  return (
    <Animated.View
      style={{
        ...styles.spinnerMore,
        ...animatedStyleHeight,
        backgroundColor: theme.BACKGROUND,
        borderColor: theme.DARK ? theme.PRIMARY : theme.BORDER,
      }}
    >
      <ActivityIndicator size="large" color={theme.SECONDARY} />
    </Animated.View>
  );
};

AnimatedBottomSpinner.defaultProps = {
  animateInFinished: () => {},
  animateOutFinished: () => {},
  animateIn: false,
  animateOut: false,
};

const styles = StyleSheet.create({
  spinnerMore: {
    position: 'absolute',
    alignSelf: 'center',
    padding: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
});

export default AnimatedBottomSpinner;
