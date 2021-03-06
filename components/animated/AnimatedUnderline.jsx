import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

import { useTheme } from '../../hooks/useTheme';

const AnimatedUnderline = ({
  children,
  duration = 2000,
  fadeOut = 1000,
  jest = false,
}) => {
  const theme = useTheme();
  const [animatedGrow] = useState(new Animated.Value(0));
  const [animationOpacity] = useState(
    new Animated.Value(theme.DARK ? 0.5 : 0.7)
  );

  const interpolateGrow = animatedGrow.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '90%'],
  });

  const lineGrowAnimation = Animated.timing(animatedGrow, {
    toValue: 1,
    duration,
    useNativeDriver: false,
  });
  const opacityAnimation = Animated.timing(animationOpacity, {
    toValue: 0,
    duration: fadeOut,
    useNativeDriver: false,
  });

  useEffect(() => {
    if (jest) return;

    Animated.loop(
      Animated.sequence([lineGrowAnimation, opacityAnimation])
    ).start();
  });

  const animatedGrowStyle = {
    width: interpolateGrow,
    opacity: animationOpacity,
  };

  return (
    <View style={styles.container}>
      <View>{children}</View>
      <View style={styles.lineContainer}>
        <View
          style={{
            ...styles.horizontalLine,
            borderBottomColor: theme.BACKGROUND,
            width: '100%',
          }}
        ></View>
        <Animated.View
          style={{
            ...styles.horizontalLine,
            borderBottomColor: theme.TEXT,
            position: 'absolute',
            ...animatedGrowStyle,
          }}
        ></Animated.View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  lineContainer: {
    width: '100%',
    alignItems: 'center',
  },
  horizontalLine: {
    borderBottomWidth: 1,
  },
});

export default AnimatedUnderline;
