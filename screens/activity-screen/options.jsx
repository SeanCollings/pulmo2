import React from 'react';
import { Text } from 'react-native';

const options = ({ route, navigation }) => {
  const { title } = route.params.item.excercise;

  return {
    headerTitle: ({ tintColor }) => {
      return <Text style={{ fontSize: 20, color: tintColor }}>{title}</Text>;
    },
  };
};

export default options;
