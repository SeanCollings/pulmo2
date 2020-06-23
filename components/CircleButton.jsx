import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const getButtonSize = (size, borderWidth) => ({
  width: size,
  height: size,
  borderRadius: size,
  borderWidth,
});

const CircleButton = ({
  buttonSize,
  borderWidth,
  onPress,
  onLongPress,
  children,
  style,
}) => (
  <TouchableOpacity
    activeOpacity={0.6}
    onPress={onPress}
    onLongPress={onLongPress}
    style={{
      ...styles.button,
      ...style,
      ...getButtonSize(buttonSize, borderWidth),
    }}
  >
    {children}
  </TouchableOpacity>
);

export const CircleTextButton = ({
  text,
  textStyle,
  fontSize = 45,
  ...rest
}) => (
  <CircleButton {...rest}>
    <Text style={{ ...styles.buttonText, ...textStyle, fontSize }}>{text}</Text>
  </CircleButton>
);

export const CircleIconButton = ({
  name,
  iconSize = 60,
  iconStyle,
  ...rest
}) => (
  <CircleButton {...rest}>
    <MaterialCommunityIcons
      name={name}
      size={iconSize}
      style={{ ...iconStyle }}
    ></MaterialCommunityIcons>
  </CircleButton>
);

CircleIconButton.defaultProps = {
  buttonSize: 120,
  borderWidth: 5,
};

CircleTextButton.defaultProps = {
  buttonSize: 120,
  borderWidth: 5,
};

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'tit-regular',
  },
});
