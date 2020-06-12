import React from 'react';
import { StyleSheet, Switch, Platform } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const CustomSwitch = ({ state, onChange, trackColor, falseColour }) => {
  const theme = useTheme();

  let falseValue = falseColour || (theme.DARK ? theme.DARK_GRAY : theme.BORDER);

  return (
    <Switch
      trackColor={{ true: trackColor, false: falseValue }}
      thumbColor={Platform.OS === 'android' ? theme.SECONDARY_TEXT : ''}
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
