import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import CustomModal from '.';

const ConfirmModal = ({
  cancelModel,
  confirmModal,
  header = 'Warning',
  message = '',
}) => {
  return (
    <CustomModal
      cancelModel={cancelModel}
      confirmModal={confirmModal}
      header={header}
      cancelTitle="No"
      confirmTitle="Yes"
    >
      <View style={styles.contentContainer}>
        <Text style={styles.contentText}>{message}</Text>
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
    fontSize: 16,
    fontFamily: 'tit-light',
  },
});

export default ConfirmModal;
