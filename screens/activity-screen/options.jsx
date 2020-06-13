import React from 'react';
import { Text } from 'react-native';

const options = ({ route, navigation }) => {
  const { title } = route.params.item.excercise;

  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text style={{ fontSize: 20, color: tintColor, ...style }}>
          {title}
        </Text>
      );
    },
  };
};

export default options;
