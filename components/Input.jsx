import React, { useState } from 'react';
import { StyleSheet, View, Text, Animated, TextInput } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const Input = ({
  value,
  onChangeText,
  customStyles,
  maxLength = 40,
  showRemaining = false,
  ...rest
}) => {
  const theme = useTheme();
  const [animatedGrow] = useState(new Animated.Value(-300));
  const [animationOpacity] = useState(new Animated.Value(0));

  const opacity = theme.DARK ? 0.87 : 1;
  const opacityDarker = theme.DARK ? 0.63 : 0.8;

  const onFocusHandler = () => {
    Animated.parallel([
      Animated.timing(animatedGrow, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(animationOpacity, {
        toValue: opacity,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };
  const onBlurHandler = () => {
    Animated.parallel([
      Animated.timing(animatedGrow, {
        toValue: -300,
        duration: 10,
        useNativeDriver: true,
      }),
      Animated.timing(animationOpacity, {
        toValue: 0,
        duration: 10,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const onChangeTextHandler = (text) => {
    let newText = text;
    if (newText.length > maxLength) {
      newText = newText.substr(0, maxLength);
    }
    onChangeText(newText);
  };

  const animatedGrowStyle = {
    transform: [{ translateX: animatedGrow }],
    opacity: animationOpacity,
  };

  return (
    <View style={styles.container}>
      <View style={styles.textInputContainer}>
        <TextInput
          testID="textInput"
          {...rest}
          style={{
            ...styles.input,
            color: theme.TEXT,
            opacity,
            ...customStyles,
          }}
          value={value}
          onChangeText={onChangeTextHandler}
          maxLength={maxLength}
          numberOfLines={2}
          onFocus={onFocusHandler}
          onBlur={onBlurHandler}
          multiline
          selectionColor={theme.SECONDARY}
        />
        <View style={styles.animatedContainer}>
          <Animated.View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: theme.BORDER,
              ...animatedGrowStyle,
            }}
          ></Animated.View>
        </View>
      </View>
      <View style={styles.remainingContainer}>
        <Text
          style={{
            ...styles.remainingText,
            color: theme.TEXT,
            opacity: opacityDarker,
          }}
        >
          {`${value.length} / ${maxLength}`}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 5,
  },
  textInputContainer: {
    width: '78%',
  },
  animatedContainer: {
    overflow: 'hidden',
  },
  input: {
    fontFamily: 'tit-light',
    fontSize: 17,
  },
  remainingContainer: {
    width: '22%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 10,
  },
  remainingText: {
    fontFamily: 'tit-light',
    fontSize: 14,
  },
});

export default Input;
