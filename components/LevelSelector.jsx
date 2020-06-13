import React, { useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';

import Scroller from './Scroller';
import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';
import { SELECTED_LEVEL, ProfileContext } from '../context/profile-context';
import { getRangeArray } from '../utils';
import { useTheme } from '../hooks/useTheme';

const SLIDE_WIDTH = 80;

const LevelSelector = ({ header }) => {
  const theme = useTheme();
  const { profileContext, updateProfileContext } = useContext(ProfileContext);

  const selectedLevel = profileContext[SELECTED_LEVEL];
  const data = getRangeArray(0, TOTAL_DIFFICULTY_LEVELS, 0.5);
  const selectedIndex = data.indexOf(selectedLevel);

  const onScrollHandler = async (index) => {
    updateProfileContext(SELECTED_LEVEL, data[index]);
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
            color: theme.DARK ? theme.TEXT : theme.SECONDARY,
            opacity: theme.DARK ? 0.87 : 1,
          }}
        >
          {value}
        </Text>
      </View>
    ));

  return (
    <View style={styles.levelContainer}>
      <Text style={{ ...styles.levelTextHeading, color: theme.SECONDARY }}>
        {header}
      </Text>
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
    paddingTop: 10,
    paddingBottom: 20,
    width: '80%',
  },
  levelTextHeading: {
    fontFamily: 'tit-regular',
    fontSize: 20,
    textAlign: 'center',
  },
});

export default LevelSelector;
