import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const CustomButton = ({ title, style, onPress, bgColour, colour }) => {
  const theme = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={onPress}
      style={{
        ...styles.buttonContainer,
        ...style,
        backgroundColor:
          bgColour || (theme.DARK ? theme.DARKER_GRAY : theme.BACKGROUND),
        borderColor: theme.BORDER,
      }}
    >
      <Text style={{ ...styles.textStyle, color: colour || theme.TEXT }}>
        {title}
      </Text>
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
    paddingVertical: 6,
    paddingHorizontal: 14,
    elevation: 2,
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'tit-regular',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
});

export default CustomButton;
