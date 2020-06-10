import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/constants';

const CustomHeaderButton = (props) => {
  return (
    <View>
      <HeaderButton
        {...props}
        IconComponent={MaterialCommunityIcons}
        iconSize={23}
        // color={Platform.OS === 'android' ? 'white' : '#ccc'}
        color={COLORS.SECONDARY_TEXT}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
