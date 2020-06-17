import React, { useEffect } from 'react';
import { StyleSheet, Animated, View } from 'react-native';

const AnimateAppear = ({
  style,
  children,
  isVisible,
  startingScale = 0,
  durationScale = 300,
  startingOpacity = 0,
  durationOpacity = 300,
}) => {
  let animatedScale = new Animated.Value(isVisible ? startingScale : 1);
  let animatedOpacity = new Animated.Value(startingOpacity);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(animatedScale, {
        toValue: isVisible ? 1 : 0,
        duration: durationScale,
      }),
      Animated.timing(animatedOpacity, {
        toValue: isVisible ? 1 : 0,
        duration: durationOpacity,
      }),
    ]).start();
  }, [isVisible]);

  const animatedStyleScale = {
    opacity: animatedOpacity,
    transform: [{ scale: animatedScale }],
  };

  if (!isVisible) return null;

  return (
    <View style={{ ...styles.container, ...style }}>
      <Animated.View style={{ ...animatedStyleScale }}>
        {isVisible && children}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AnimateAppear;
