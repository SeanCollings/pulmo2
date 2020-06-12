import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { useTheme } from '../hooks/useTheme';

const CustomHeaderButton = (props) => {
  const theme = useTheme();

  return (
    <View>
      <HeaderButton
        {...props}
        IconComponent={MaterialCommunityIcons}
        iconSize={23}
        // color={Platform.OS === 'android' ? 'white' : '#ccc'}
        color={theme.SECONDARY_TEXT}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default CustomHeaderButton;
