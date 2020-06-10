import React from 'react';
import { StyleSheet, Switch, Platform } from 'react-native';

import { COLORS } from '../constants/constants';

const CustomSwitch = ({ state, onChange, trackColor }) => {
  return (
    <Switch
      trackColor={{ true: trackColor, false: COLORS.BORDER }}
      thumbColor={Platform.OS === 'android' ? COLORS.SECONDARY_TEXT : ''}
      value={state}
      onValueChange={onChange}
    />
  );
};

CustomSwitch.defaultProps = {
  state: false,
  onChange: () => null,
};

const styles = StyleSheet.create({});

export default CustomSwitch;
