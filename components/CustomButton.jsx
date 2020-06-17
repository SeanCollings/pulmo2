import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useTheme } from '../hooks/useTheme';

const CustomButton = ({ title, style, onPress, bgColour, colour }) => {
  const theme = useTheme();

  const elevation = theme.DARK ? {} : styles.buttonElevation;

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
      <View
        style={{
          ...styles.buttonContainer,
          ...style,
          ...elevation,
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
      </View>
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
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'tit-regular',
    fontSize: 14,
    textAlign: 'center',
    textTransform: 'uppercase',
  },
  buttonElevation: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
  },
});

export default CustomButton;
