import React from 'react';
import { Text } from 'react-native';

const options = (navData) => {
  return {
    headerTitle: ({ tintColor }) => {
      return <Text style={{ fontSize: 20, color: tintColor }}>Help</Text>;
    },
  };
};

export default options;
