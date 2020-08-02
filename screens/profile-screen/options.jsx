import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderButton from '../../components/HeaderButton';

const options = (navData) => {
  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <Text style={{ fontSize: 20, color: tintColor, ...style }}>
          Profile
        </Text>
      );
    },
    headerRight: ({ tintColor }) => {
      return (
        <View style={styles.headerRightContainer}>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="settings"
              iconName={'settings'}
              onPress={() => navData.navigation.navigate('Settings')}
              color={tintColor}
            />
          </HeaderButtons>
          <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item
              title="help"
              iconName={'help-circle-outline'}
              onPress={() => navData.navigation.navigate('ProfileHelp')}
              color={tintColor}
            />
          </HeaderButtons>
        </View>
      );
    },
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="account" color={color} size={26} />
    ),
  };
};

const styles = StyleSheet.create({
  headerRightContainer: {
    flexDirection: 'row',
  },
});

export default options;
