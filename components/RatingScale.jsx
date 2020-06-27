import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const RATINGS_OPTIONS = ['terrible', 'weak', 'normal', 'good', 'great'];
export const RATINGS_FACES = [
  'emoticon-dead',
  'emoticon-sad',
  'emoticon-neutral',
  'emoticon-happy',
  'emoticon',
];

const RatingScale = ({ selectedRating, onPress, showLine = true }) => {
  const theme = useTheme();
  const [rating, setRating] = useState(selectedRating);

  const opacity = theme.DARK ? 0.87 : 1;

  const ratingSelectedHandler = (index) => {
    const newRating = index === rating ? null : index;
    setRating(newRating);
    onPress(newRating);
  };

  const Marker = ({ index, totalOptions }) => {
    const selected = rating === index;
    const toggleOff = theme.DARK ? theme.DARKER_GRAY : theme.BORDER;
    const toggleOn = theme.DARK ? theme.SECONDARY : theme.SECONDARY;

    const iconColour = theme.DARK ? theme.TEXT : theme.BACKGROUND;
    const backgroundColor = selected ? toggleOn : toggleOff;

    const width = (SCREEN_WIDTH * 0.8) / totalOptions;
    const size = width * (selected ? 0.7 : 0.65);

    return (
      <View
        style={{
          width,
          height: width,
          ...styles.markerInnerContainer,
        }}
      >
        <View
          style={{
            backgroundColor: theme.BACKGROUND,
            borderRadius: size + 4,
            height: size + 4,
            width: size + 4,
          }}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => ratingSelectedHandler(index)}
            style={{
              ...styles.marker,
              backgroundColor,
              height: size,
              width: size,
              borderRadius: size,
            }}
          >
            <MaterialCommunityIcons
              name={RATINGS_FACES[index]}
              color={iconColour}
              size={size * 0.8}
              style={{ opacity }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const RatingsText = ({ rating, totalOptions }) => {
    const width = (SCREEN_WIDTH * 0.8) / totalOptions;

    return (
      <Text
        style={{
          ...styles.ratingsText,
          color: theme.TEXT,
          opacity,
          width,
        }}
      >
        {rating}
      </Text>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.markerContainer}>
        {showLine && (
          <View style={styles.lineContainer}>
            <View
              style={{
                ...styles.line,
                borderBottomColor: theme.BORDER,
                opacity,
              }}
            ></View>
          </View>
        )}
        {[...Array(RATINGS_OPTIONS.length).keys()].map((_, i) => (
          <Marker
            key={`marker-${i}`}
            index={i}
            totalOptions={RATINGS_OPTIONS.length}
          />
        ))}
      </View>
      <View style={styles.ratingsContainer}>
        {RATINGS_OPTIONS.map((option, i) => (
          <RatingsText
            key={`rating-options-${i}`}
            index={i}
            rating={option}
            totalOptions={RATINGS_OPTIONS.length}
          />
        ))}
      </View>
    </View>
  );
};

RatingScale.defaultProps = {
  onPress: () => {},
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  headerText: {
    fontFamily: 'tit-light',
    fontSize: 16,
    paddingBottom: 5,
  },
  markerContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  markerInnerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    justifyContent: 'center',
    alignItems: 'center',
    left: 2,
    top: 2,
  },
  ratingsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  ratingsText: {
    fontFamily: 'tit-regular',
    fontSize: 14,
    width: 30,
    textAlign: 'center',
  },
  promptContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 0,
  },
  promptText: {
    fontFamily: 'tit-light',
    fontSize: 14,
  },
  lineContainer: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  line: { width: '90%', borderBottomWidth: 1 },
});

export default RatingScale;
