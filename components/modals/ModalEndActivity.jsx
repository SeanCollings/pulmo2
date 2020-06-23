import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Picker,
  Platform,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from '.';
import { useTheme } from '../../hooks/useTheme';
import {
  OPTIONS_END_ACTIVITY_EARLY,
  OPTION_SELECT_A_REASON,
} from '../../constants/constants';

const ModalEndActivity = ({ cancelModal, confirmModal, resumeActivity }) => {
  const theme = useTheme();
  const [reason, setReason] = useState(OPTIONS_END_ACTIVITY_EARLY[0].value);

  const BackButton = () => (
    <TouchableOpacity onPress={resumeActivity} style={styles.backButton}>
      <MaterialCommunityIcons
        name="arrow-left"
        color={theme.BORDER}
        size={33}
      />
    </TouchableOpacity>
  );

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <CustomModal
      cancelModal={cancelModal}
      confirmModal={() => confirmModal(reason)}
      header={'Save current progress?'}
      cancelTitle="No"
      confirmTitle="Yes"
      headingColour={theme.SECONDARY}
      TopLeft={BackButton}
      animationType="fade"
    >
      <View style={styles.contentContainer}>
        <Text style={{ ...styles.contentText, color: theme.TEXT, opacity }}>
          Your current activity is not complete.
        </Text>
        <Text
          style={{
            ...styles.contentText,
            color: theme.TEXT,
            opacity,
            paddingBottom: 20,
          }}
        >
          Would you like to save it as is?
        </Text>
        <View
          style={{
            alignSelf: 'center',
            borderWidth: theme.DARK ? 2 : 1,
            borderColor: theme.DARK ? theme.PRIMARY : theme.BORDER,
            backgroundColor: theme.BACKGROUND,
            borderRadius: 10,
            width: '80%',
          }}
        >
          <Picker
            selectedValue={reason}
            style={{
              height: Platform.OS === 'android' ? 40 : 45,
              width: '100%',
              fontFamily: 'tit-light',
              color: theme.TEXT,
              opacity: reason === OPTION_SELECT_A_REASON.value ? 0.36 : opacity,
            }}
            onValueChange={(itemValue) => setReason(itemValue)}
          >
            {OPTIONS_END_ACTIVITY_EARLY.map((option, i) => {
              const colour =
                i === 0
                  ? theme.BORDER
                  : theme.DARK
                  ? theme.BACKGROUND
                  : theme.TEXT;
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
      </View>
    </CustomModal>
  );
};

ModalEndActivity.defaulProps = {
  cancelModal: () => {},
  confirmModal: () => {},
  resumeActivity: () => {},
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
  },
  contentText: {
    textAlign: 'center',
    fontSize: 17,
    fontFamily: 'tit-light',
  },
  backButton: { position: 'absolute', left: 0 },
});

export default ModalEndActivity;