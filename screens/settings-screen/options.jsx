import React from 'react';
import { Text } from 'react-native';

const options = (navData) => {
  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text style={{ fontSize: 20, color: tintColor, ...style }}>
          Settings
        </Text>
      );
    },
  };
};

export default options;
