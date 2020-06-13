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
          bgColour || (theme.DARK ? theme.PRIMARY : theme.BACKGROUND),
        borderColor: theme.BORDER,
        ...(!theme.DARK ? { borderColor: theme.BORDER, borderWidth: 1 } : {}),
      }}
    >
      <Text
        style={{
          ...styles.textStyle,
          color: colour || theme.TEXT,
          opacity: theme.DARK ? 0.87 : 1,
        }}
      >
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
