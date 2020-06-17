import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';

const BarSelector = ({ textContent, iconName, onPress = () => null }) => {
  const theme = useTheme();

  const opacity = theme.DARK ? 0.87 : 1;
  const elevation = theme.DARK ? {} : styles.buttonElevation;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      style={{
        ...styles.container,
        backgroundColor: theme.DARK ? theme.PRIMARY : theme.BACKGROUND,
        ...elevation,
      }}
    >
      <View style={styles.innerContainer}>
        <View style={{ ...styles.justifyContainer }}>
          {iconName && (
            <View style={styles.contentIcon}>
              <MaterialCommunityIcons
                name={iconName}
                color={theme.BORDER}
                size={21}
              />
            </View>
          )}
          <Text
            style={{
              ...styles.textStyle,
              color: theme.TEXT,
              opacity,
            }}
          >
            {textContent}
          </Text>
        </View>
        <View
          style={{
            ...styles.justifyContainer,
            paddingTop: 1,
          }}
        >
          <MaterialCommunityIcons
            name={'chevron-right'}
            color={theme.BORDER}
            size={23}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    paddingHorizontal: '10%',
    justifyContent: 'center',
    marginVertical: 2,
  },
  innerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  contentIcon: {
    paddingRight: 20,
    paddingTop: 1,
    justifyContent: 'center',
  },
  justifyContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  textStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
    justifyContent: 'center',
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

export default BarSelector;
