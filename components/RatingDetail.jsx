import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { RATINGS_FACES, RATINGS_OPTIONS } from './RatingScale';
import { useTheme } from '../hooks/useTheme';

const RatingDetail = ({ rating }) => {
  const theme = useTheme();

  const iconColour = theme.DARK ? theme.TEXT : theme.BACKGROUND;
  const backgroundColor = theme.DARK ? theme.SECONDARY : theme.SECONDARY;
  const size = 36;
  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <View style={styles.container}>
      <View style={styles.categoryBody}>
        <View
          style={{
            ...styles.ratingSymbol,
            backgroundColor,
            height: size,
            width: size,
            borderRadius: size,
          }}
        >
          <MaterialCommunityIcons
            name={RATINGS_FACES[rating]}
            color={iconColour}
            size={size * 0.8}
            style={{ opacity }}
          />
        </View>
        <View style={styles.ratingValueContainer}>
          <Text style={{ ...styles.ratingText, color: theme.TEXT, opacity }}>
            {RATINGS_OPTIONS[rating]}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  categoryBody: {
    flexDirection: 'row',
    paddingLeft: 10,
    paddingVertical: 10,
  },
  ratingSymbol: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  ratingValueContainer: {
    justifyContent: 'center',
    paddingLeft: 15,
    paddingBottom: 4,
  },
  ratingText: {
    fontFamily: 'tit-light',
    fontSize: 18,
  },
});

export default RatingDetail;
