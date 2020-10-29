import React from 'react';
import { Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import HeaderButton from '../../components/HeaderButton';
import { APP_ENV, ENV_STAGING } from '../../release-constants';

const homeScreenOptions = (navData) => {
  const tag = APP_ENV === ENV_STAGING ? ' (beta)' : '';

  return {
    headerTitle: ({ tintColor, style }) => {
      return (
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontSize: 20,
              color: tintColor,
              ...style,
            }}
          >
            PulmO
          </Text>
          <View style={{ top: 5 }}>
            <Text
              style={{
                fontSize: 20 * 0.9,
                color: tintColor,
                ...style,
              }}
            >
              {`2${tag}`}
            </Text>
          </View>
        </View>
      );
    },
    headerRight: ({ tintColor }) => {
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="help"
            iconName={'help-circle-outline'}
            onPress={() => navData.navigation.navigate('HomeHelp')}
            color={tintColor}
          />
        </HeaderButtons>
      );
    },
    tabBarIcon: ({ color, size }) => (
      <MaterialCommunityIcons name="home" color={color} size={26} />
    ),
  };
};

export default homeScreenOptions;
