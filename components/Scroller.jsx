import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, ScrollView, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';

import { COLORS } from '../constants/constants';

const Scroller = ({
  children,
  totalChildren,
  onScroll,
  initialIndex,
  width = 80,
}) => {
  const infListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  useEffect(() => {
    infListRef.current.scrollTo({
      x: currentIndex * width,
      y: 0,
      animated: false,
    });
  }, []);

  const onLeftPressHandler = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      infListRef.current.scrollTo({
        x: newIndex * width,
        y: 0,
        animated: true,
      });
      setCurrentIndex(newIndex);
      onScroll(newIndex);
    }
  };
  const onRightPressHandler = () => {
    if (currentIndex < totalChildren - 1) {
      const newIndex = currentIndex + 1;
      infListRef.current.scrollTo({
        x: newIndex * width,
        y: 0,
        animated: true,
      });

      setCurrentIndex(newIndex);
      onScroll(newIndex);
    }
  };

  return (
    <View style={{ ...styles.container }}>
      <TouchableOpacity style={styles.leftButton} onPress={onLeftPressHandler}>
        <MaterialCommunityIcons
          name={'chevron-left-circle'}
          color={COLORS.BORDER}
          size={30}
        />
      </TouchableOpacity>
      <View style={{ width }}>
        <ScrollView
          pagingEnabled
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          ref={infListRef}
          keyboardShouldPersistTaps="always"
        >
          {children}
        </ScrollView>
      </View>
      <TouchableOpacity
        style={styles.rightButton}
        onPress={onRightPressHandler}
      >
        <MaterialCommunityIcons
          name={'chevron-right-circle'}
          color={COLORS.BORDER}
          size={30}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignSelf: 'center',
    justifyContent: 'flex-start',
  },
  scrollViewContainer: {},
  leftButton: {
    justifyContent: 'center',
    paddingTop: 4,
  },
  rightButton: {
    justifyContent: 'center',
    paddingTop: 4,
  },
  childrenContainer: {
    padding: 10,
    backgroundColor: 'orange',
  },
});

export default Scroller;
