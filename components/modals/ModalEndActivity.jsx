import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from '.';
import { useTheme } from '../../hooks/useTheme';
import {
  OPTIONS_END_ACTIVITY_EARLY,
  OPTION_SELECT_A_REASON,
} from '../../constants/constants';
import OptionsPicker from '../OptionsPicker';

const ModalEndActivity = ({ cancelModal, confirmModal, resumeActivity }) => {
  const theme = useTheme();
  const [reason, setReason] = useState(OPTIONS_END_ACTIVITY_EARLY[0].value);

  const BackButton = () => (
    <TouchableOpacity
      testID="resumeActivity"
      onPress={resumeActivity}
      style={styles.backButton}
    >
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
        <OptionsPicker
          selectedOption={reason}
          options={OPTIONS_END_ACTIVITY_EARLY}
          onChange={setReason}
          style={{
            opacity: reason === OPTION_SELECT_A_REASON.value ? 0.36 : opacity,
          }}
        />
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
