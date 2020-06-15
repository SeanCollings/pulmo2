import React from 'react';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';

const BarSelector = ({ textContent, onPress = () => null }) => {
  const theme = useTheme();

  const opacity = theme.DARK ? 0.87 : 1;
  const elevation = theme.DARK
    ? {}
    : {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 2.84,
        elevation: 5,
      };

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
      <View style={styles.justifyContainer}>
        <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
          {textContent}
        </Text>
      </View>
      <View style={styles.justifyContainer}>
        <MaterialCommunityIcons
          name={'chevron-right'}
          color={theme.BORDER}
          size={27}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    paddingHorizontal: '10%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
  },
  justifyContainer: {
    justifyContent: 'center',
  },
  textStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
  },
});

export default BarSelector;
