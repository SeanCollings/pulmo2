import React from 'react';
import { Text } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';

const options = () => {
  return {
    headerTitle: () => {
      return <Text></Text>;
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default options;
