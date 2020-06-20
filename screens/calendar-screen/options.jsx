import React from 'react';
import { Text } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';

const options = (props) => {
  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text style={{ fontSize: 20, color: tintColor, ...style }}>
          Calendar
        </Text>
      );
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default options;
