import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { Picker } from '@react-native-community/picker';

import { useTheme } from '../hooks/useTheme';

const OptionsPicker = ({ options, selectedOption, onChange, style }) => {
  const theme = useTheme();

  return (
    <View
      style={{
        ...styles.container,
        borderWidth: theme.DARK ? 2 : 1,
        borderColor: theme.DARK ? theme.PRIMARY : theme.BORDER,
        backgroundColor: theme.BACKGROUND,
      }}
    >
      <Picker
        selectedValue={selectedOption}
        style={{
          ...styles.pickerContainer,
          color: theme.TEXT,
          ...style,
        }}
        onValueChange={(itemValue) => onChange(itemValue)}
      >
        {options.map((option, i) => {
          const colour =
            i === 0 ? theme.BORDER : theme.DARK ? theme.BACKGROUND : theme.TEXT;
          return (
            <Picker.Item
              key={`${option.value}`}
              color={colour}
              label={option.label}
              value={option.value}
            />
          );
        })}
      </Picker>
    </View>
  );
};

OptionsPicker.defaultProps = {
  options: [],
  onChange: () => {},
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    borderRadius: 10,
    width: '80%',
  },
  pickerContainer: {
    width: '100%',
    fontFamily: 'tit-light',
    height: Platform.OS === 'android' ? 40 : 45,
  },
});

export default OptionsPicker;
