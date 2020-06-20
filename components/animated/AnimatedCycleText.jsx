import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useTheme } from '../../hooks/useTheme';

const AnimatedCycleText = ({
  textArray = [],
  fadeIn = 2000,
  fadeOut = 1000,
  delay = 0,
  repeat = false,
}) => {
  const theme = useTheme();
  const [animatedOpacities] = useState(
    textArray.map(() => new Animated.Value(0))
  );

  if (!textArray.length) return null;

  const maxOpacity = theme.DARK ? 0.87 : 1;
  const getAnimations = () =>
    textArray.reduce((acc, _, i) => {
      const keepLastVisible = !repeat && i === textArray.length - 1;

      if (keepLastVisible) {
        return [
          ...acc,
          Animated.timing(animatedOpacities[i], {
            toValue: maxOpacity,
            duration: fadeIn,
          }),
        ];
      } else {
        return [
          ...acc,
          Animated.timing(animatedOpacities[i], {
            toValue: maxOpacity,
            duration: fadeIn,
          }),
          Animated.delay(delay),
          Animated.timing(animatedOpacities[i], {
            toValue: 0,
            duration: fadeOut,
          }),
        ];
      }
    }, []);

  const opacityAnimations = getAnimations();

  useEffect(() => {
    if (repeat) {
      Animated.loop(Animated.sequence(opacityAnimations)).start();
    } else {
      Animated.sequence(opacityAnimations).start();
    }
  }, []);

  return (
    <View style={styles.container}>
      {textArray.map((text, i) => {
        return (
          <Animated.Text
            key={`animted-${i}`}
            style={{
              ...styles.textStyle,
              color: theme.TEXT,
              opacity: animatedOpacities[i],
            }}
          >
            {text}
          </Animated.Text>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { alignItems: 'center', height: 60 },
  textStyle: {
    fontSize: 40,
    textAlignVertical: 'center',
    fontFamily: 'tit-light',
    textTransform: 'lowercase',
    position: 'absolute',
  },
});

export default AnimatedCycleText;
