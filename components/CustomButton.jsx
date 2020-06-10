import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/constants';

const CustomButton = ({ title, style, onPress, colour }) => {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...styles.buttonContainer,
        ...style,
        color: colour,
      }}
    >
      <Text style={styles.textStyle}>{title}</Text>
    </TouchableOpacity>
  );
};

CustomButton.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.BORDER,
    backgroundColor: COLORS.BACKGROUND,
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 2,
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'tit-regular',
    fontSize: 14,
    color: COLORS.TEXT,
    opacity: 0.7,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
