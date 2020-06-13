import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { useTheme } from '../hooks/useTheme';

const Tabs = ({ options, onPress, selectedTab }) => {
  const theme = useTheme();
  const length = options.length;

  return (
    <View style={styles.container}>
      {options.map((option, i) => {
        const selected = selectedTab === option;
        return (
          <View
            key={`tab-${i}`}
            style={{
              width: `${100 / length}%`,
            }}
          >
            <TouchableOpacity
              onPress={() => onPress(options[i])}
              activeOpacity={0.8}
              style={{
                ...styles.tabContainer,
                backgroundColor: theme.BACKGROUND,
              }}
            >
              <View style={styles.textContainer}>
                <Text
                  style={{
                    ...styles.tabText,
                    color: theme.TEXT,
                    opacity: theme.DARK ? 0.7 : 0.9,
                  }}
                >
                  {option}
                </Text>
              </View>
              <View
                style={{
                  ...styles.underline,
                  width: `${100 / length}%`,
                  borderBottomColor: selected
                    ? theme.DARK
                      ? theme.DARK_GRAY
                      : theme.BORDER
                    : theme.BACKGROUND,
                }}
              ></View>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
  },
  tabContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  textContainer: {
    height: '100%',
    justifyContent: 'center',
  },
  tabText: {
    fontFamily: 'tit-regular',
    fontSize: 16,
  },
  underline: {
    borderBottomWidth: 1,
  },
});

export default Tabs;
