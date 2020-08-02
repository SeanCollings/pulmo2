import React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';

const CHECKBOX_SIZE = 28;

const Checkbox = ({ state, onChange, label }) => {
  const theme = useTheme();
  const animatedScale = new Animated.Value(state ? 1 : 0.01);

  const checkboxHandler = () => {
    Animated.spring(animatedScale, {
      toValue: state ? 0.01 : 1,
      bounciness: 10,
      speed: 80,
    }).start(({ finished }) => {
      if (finished) onChange();
    });
  };

  const opacity = theme.DARK ? 0.87 : 1;
  const animatedStyleScale = {
    transform: [{ scale: animatedScale }],
  };

  return (
    <TouchableOpacity
      testID="checkboxButton"
      activeOpacity={1}
      onPress={checkboxHandler}
    >
      <View style={styles.container}>
        <View style={styles.checkContainer}>
          <MaterialCommunityIcons
            name={'checkbox-blank-outline'}
            color={theme.DARK ? theme.DARK_GRAY : theme.BORDER}
            size={CHECKBOX_SIZE}
            style={{ opacity }}
          />
          <Animated.View
            style={{
              ...styles.checkStyle,
              ...animatedStyleScale,
            }}
          >
            <MaterialCommunityIcons
              name={'check-bold'}
              color={theme.DARK ? theme.BORDER : theme.TEXT}
              size={CHECKBOX_SIZE - 12}
              style={{ opacity }}
            />
          </Animated.View>
        </View>
        <View style={{ ...styles.labelContainer, paddingLeft: label ? 10 : 0 }}>
          <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
            {label}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

Checkbox.defaultProps = {
  state: false,
  onChange: () => null,
};

const styles = StyleSheet.create({
  container: { flexDirection: 'row' },
  checkContainer: { justifyContent: 'center', alignItems: 'center' },
  checkStyle: {
    position: 'absolute',
  },
  labelContainer: { justifyContent: 'center' },
  textStyle: {
    fontFamily: 'tit-light',
    fontSize: 16,
    paddingBottom: 2,
  },
});

export default Checkbox;
