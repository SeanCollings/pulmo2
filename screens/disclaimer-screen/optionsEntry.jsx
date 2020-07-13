import React from 'react';
import { Text } from 'react-native';

const optionsEntry = (navData) => {
  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text
          style={{
            fontSize: 20,
            color: tintColor,
            ...style,
            alignSelf: 'center',
          }}
        >
          Disclaimer
        </Text>
      );
    },
  };
};

export default optionsEntry;
