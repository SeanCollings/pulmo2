import React from 'react';
import { Text } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';

const options = () => {
  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text style={{ fontSize: 20, color: tintColor, ...style }}>
          Edit Activity
        </Text>
      );
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default options;
