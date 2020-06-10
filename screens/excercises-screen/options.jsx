import React from 'react';
import { Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderButton from '../../components/HeaderButton';

const options = (navData) => {
  return {
    headerTitle: ({ tintColor }) => {
      return <Text style={{ fontSize: 20, color: tintColor }}>Excercises</Text>;
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="help"
          iconName={'help-circle-outline'}
          onPress={() => navData.navigation.navigate('ExcerciseHelp')}
        />
      </HeaderButtons>
    ),
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons
        name="format-list-bulleted"
        color={color}
        size={26}
      />
    ),
  };
};

export default options;
