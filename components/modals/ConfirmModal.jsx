import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomModal from '.';
import { useTheme } from '../../hooks/useTheme';

const ConfirmModal = ({
  cancelModal,
  confirmModal,
  header = 'Warning',
  message = '',
}) => {
  const theme = useTheme();

  return (
    <CustomModal
      cancelModal={cancelModal}
      confirmModal={confirmModal}
      header={header}
      cancelTitle="No"
      confirmTitle="Yes"
      headingColour={theme.TEXT}
    >
      <View style={styles.contentContainer}>
        <Text style={{ ...styles.contentText, color: theme.TEXT }}>
          {message}
        </Text>
      </View>
    </CustomModal>
  );
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
});

export default ConfirmModal;
