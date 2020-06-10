import React, { useState } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  FlatList,
  Text,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/constants';

const SCREEN_WIDTH = Dimensions.get('window').width;

const SlidePosition = ({ totalSlides, selectedSlide }) => (
  <View style={styles.slidePosition}>
    {[...Array(totalSlides).keys()].map((_, i) => (
      <MaterialCommunityIcons
        key={`sp-${i}`}
        name={i === selectedSlide ? 'circle' : 'circle-outline'}
        color={COLORS.BORDER}
        size={12}
      />
    ))}
  </View>
);

const Slides = ({ totalSlides, children }) => {
  const [selectedSlide, setSelectedSlide] = useState(0);

  const onScrollHandler = (event) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    setSelectedSlide(
      Math.floor(Math.floor(offsetX) / Math.floor(SCREEN_WIDTH))
    );
  };

  return (
    <View style={styles.scrollView}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={onScrollHandler}
        keyboardShouldPersistTaps="always"
      >
        {children}
      </ScrollView>
      <SlidePosition totalSlides={totalSlides} selectedSlide={selectedSlide} />
    </View>
  );
};

Slides.defaultProps = {
  data: [],
  IndividualSlide: () => null,
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  slidePosition: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 10,
    width: SCREEN_WIDTH,
  },
});

export default Slides;
