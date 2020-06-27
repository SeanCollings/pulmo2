import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Scroller from './Scroller';
import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';
import { getRangeArray } from '../utils';
import { useTheme } from '../hooks/useTheme';

const SLIDE_WIDTH = 80;

const LevelSelector = ({ header, selectedLevel, onChange }) => {
  const theme = useTheme();

  const data = getRangeArray(0, TOTAL_DIFFICULTY_LEVELS, 0.5);
  const selectedIndex = data.indexOf(selectedLevel);

  const onScrollHandler = async (index) => {
    onChange(data[index]);
  };

  const RenderItemScroller = () =>
    data.map((value) => (
      <View
        key={Math.random()}
        style={{ ...styles.scrollerItem, width: SLIDE_WIDTH }}
      >
        <Text
          style={{
            ...styles.levelText,
            color: theme.TEXT,
            opacity: theme.DARK ? 0.87 : 1,
          }}
        >
          {value}
        </Text>
      </View>
    ));

  return (
    <View style={styles.levelContainer}>
      {header && (
        <Text style={{ ...styles.levelTextHeading, color: theme.SECONDARY }}>
          {header}
        </Text>
      )}
      <View>
        <Scroller
          totalChildren={data.length}
          onScroll={onScrollHandler}
          initialIndex={selectedIndex}
          width={SLIDE_WIDTH}
        >
          <RenderItemScroller />
        </Scroller>
      </View>
    </View>
  );
};

LevelSelector.defaultProps = {
  onChange: () => {},
};

const styles = StyleSheet.create({
  scrollerItem: {
    justifyContent: 'center',
  },
  levelText: {
    fontSize: 30,
    fontFamily: 'tit-regular',
    textAlign: 'center',
  },
  levelContainer: {
    width: '100%',
  },
  levelTextHeading: {
    fontFamily: 'tit-regular',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LevelSelector;
