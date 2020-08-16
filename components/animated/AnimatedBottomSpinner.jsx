import React, { useState, useEffect } from 'react';
import { StyleSheet, Animated, ActivityIndicator, View } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const AnimatedBottomSpinner = ({
  animateInFinished,
  animateOutFinished,
  animateIn,
  animateOut,
  duration = 200,
}) => {
  const theme = useTheme();
  const [animatedHeight] = useState(new Animated.Value(100));

  useEffect(() => {
    if (animateIn) {
      Animated.timing(animatedHeight, {
        toValue: 0,
        duration,
        useNativeDriver: true,
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
        toValue: 100,
        duration,
        useNativeDriver: true,
      }).start(({ finished }) => {
        if (finished) {
          animateOutFinished();
        }
      });
    }
  }, [animateOut]);

  const animatedStyleHeight = {
    translateY: animatedHeight,
  };

  return (
    <View style={styles.spinnerContainer}>
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
    </View>
  );
};

AnimatedBottomSpinner.defaultProps = {
  animateInFinished: () => {},
  animateOutFinished: () => {},
  animateIn: false,
  animateOut: false,
};

const styles = StyleSheet.create({
  spinnerContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
  },
  spinnerMore: {
    padding: 10,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    borderWidth: 1,
    borderBottomWidth: 0,
  },
});

export default AnimatedBottomSpinner;
