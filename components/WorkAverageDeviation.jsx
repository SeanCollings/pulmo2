import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';
import {
  ProfileContext,
  WORK_AVERAGE_DEVIATION,
  WORK_AVE_DEV_CURRENT,
  WORK_AVE_DEV_IMPROVEMENT,
  WORK_AVE_DEV_UP,
  WORK_AVE_DEV_DOWN,
} from '../context/profile-context';

const getIconNameAndSize = (improvement) => {
  switch (improvement) {
    case WORK_AVE_DEV_UP:
      return ['menu-up', 24];
    case WORK_AVE_DEV_DOWN:
      return ['menu-down', 24];
    default:
      return ['minus', 17];
  }
};

const WorkAverageDeviation = (props) => {
  const theme = useTheme();
  const { profileContext } = useContext(ProfileContext);
  const {
    [WORK_AVE_DEV_CURRENT]: currentWorkAverageDeviation,
    [WORK_AVE_DEV_IMPROVEMENT]: workAverageImprovement,
  } = profileContext[WORK_AVERAGE_DEVIATION];
  const [workAverageDeviation, setWorkAverageDeviation] = useState(
    currentWorkAverageDeviation
  );

  useEffect(() => {
    setWorkAverageDeviation(currentWorkAverageDeviation);
  }, [currentWorkAverageDeviation]);

  const [iconName, iconSize] = getIconNameAndSize(workAverageImprovement);
  const opacityDarker = theme.DARK ? 0.63 : 0.8;

  return (
    <View style={{ ...styles.wadContainer }}>
      <Text
        style={{
          ...styles.wadTextStyle,
          color: theme.TEXT,
          opacity: opacityDarker,
        }}
      >
        {`Work Average deviation: ${workAverageDeviation.toFixed(2)}%`}
      </Text>
      <View style={{ justifyContent: 'center', paddingLeft: 5 }}>
        <MaterialCommunityIcons
          name={iconName}
          color={theme.BORDER}
          size={iconSize}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wadContainer: {
    paddingVertical: 5,
    flexDirection: 'row',
  },
  wadTextStyle: {
    fontSize: 17,
    fontFamily: 'tit-light',
  },
});

export default WorkAverageDeviation;
