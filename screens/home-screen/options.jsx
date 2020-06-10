import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderButton from '../../components/HeaderButton';

const homeScreenOptions = (navData) => {
  return {
    headerTitle: ({ tintColor }) => {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 20,
              color: tintColor,
            }}
          >
            PulmO
          </Text>
          <View style={{ top: 5 }}>
            <Text
              style={{
                fontSize: 20 * 0.9,
                color: tintColor,
              }}
            >
              2
            </Text>
          </View>
        </View>
      );
    },
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="help"
          iconName={'help-circle-outline'}
          onPress={() => navData.navigation.navigate('HomeHelp')}
        />
      </HeaderButtons>
    ),
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="home" color={color} size={26} />
    ),
  };
};

export default homeScreenOptions;
