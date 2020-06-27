import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import { useTheme } from '../hooks/useTheme';

const CategoryContainer = ({
  header,
  children,
  alignItems = 'center',
  paddingVertical = 20,
}) => {
  const theme = useTheme();

  const opacity = theme.DARK ? 0.87 : 1;

  const HeaderContainer = ({ header }) => {
    return (
      <View
        style={{
          ...styles.headerContainer,
          backgroundColor: theme.DARK ? theme.PRIMARY : theme.QUATERNARY,
        }}
      >
        <Text
          style={{
            ...styles.headerText,
            color: theme.DARK ? theme.TEXT : theme.BACKGROUND,
            opacity,
          }}
        >
          {header}
        </Text>
      </View>
    );
  };

  return (
    <View style={styles.categoryContainer}>
      <HeaderContainer header={header} />
      <View style={{ ...styles.categoryContent, alignItems, paddingVertical }}>
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    width: '85%',
  },
  categoryContent: {
    justifyContent: 'center',
  },
  headerContainer: {
    width: '100%',
    backgroundColor: 'gray',
    justifyContent: 'space-between',
    paddingBottom: 2,
    borderRadius: 4,
    flexDirection: 'row',
  },
  headerText: {
    fontFamily: 'tit-regular',
    fontSize: 16,
    textAlignVertical: 'center',
    paddingLeft: 10,
  },
});

export default CategoryContainer;
