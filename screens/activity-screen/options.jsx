import React from 'react';
import { Text } from 'react-native';
import { CardStyleInterpolators } from '@react-navigation/stack';

const options = ({ route }) => {
  const { title } = route.params.item;

  return {
    headerTitle: () => {
      return <Text></Text>;
    },
    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
  };
};

export default options;
