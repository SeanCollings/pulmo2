import React, { useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const AnimatedUnderline = ({ text, duration = 2000 }) => {
  const theme = useTheme();
  const animatedGrow = new Animated.Value(0);
  const animationOpacity = new Animated.Value(theme.DARK ? 0.5 : 0.7);

  const interpolateGrow = animatedGrow.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '90%'],
  });

  const lineGrowAnimation = Animated.timing(animatedGrow, {
    toValue: 1,
    duration,
  });
  const opacityAnimation = Animated.timing(animationOpacity, {
    toValue: 0,
    duration: 1000,
  });

  useEffect(() => {
    Animated.loop(
      Animated.sequence([lineGrowAnimation, opacityAnimation])
    ).start();
  }, []);

  const opacity = theme.DARK ? 0.87 : 1;
  const animatedGrowStyle = {
    width: interpolateGrow,
    opacity: animationOpacity,
  };

  return (
    <View style={styles.container}>
      <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
        {text}
      </Text>
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
  textStyle: {
    fontSize: 40,
    textAlignVertical: 'center',
    fontFamily: 'tit-light',
    textTransform: 'lowercase',
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
