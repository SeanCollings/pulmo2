import React from 'react';
import { Text } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';

const options = (navData) => {
  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text style={{ fontSize: 20, color: tintColor, ...style }}>
          Disclaimer
        </Text>
      );
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default options;
