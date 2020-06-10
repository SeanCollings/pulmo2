import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';
import { COLORS } from '../../constants/constants';
import CustomButton from '../CustomButton';

const CustomModal = ({
  header,
  cancelTitle,
  confirmTitle,
  cancelModel,
  confirmModal,
  headingColour,
  children,
  TopLeft = () => null,
  TopRight = () => null,
  buttonStyle,
}) => {
  return (
    <View style={styles.centeredView}>
      <Modal animationType="none" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View
              style={{
                ...styles.headerContainer,
                justifyContent: !!header ? 'space-around' : 'space-between',
              }}
            >
              {TopLeft && <TopLeft />}
              {!!header && (
                <Text
                  style={{ ...styles.modalHeadingText, color: headingColour }}
                >
                  {header}
                </Text>
              )}
              {TopRight && <TopRight />}
            </View>

            <View>{children}</View>
            <View style={styles.buttonContainer}>
              {cancelModel && (
                <View style={{ width: '40%' }}>
                  <CustomButton
                    title={cancelTitle}
                    onPress={cancelModel}
                    style={buttonStyle}
                  />
                </View>
              )}
              {confirmModal && (
                <View style={{ width: '40%' }}>
                  <CustomButton
                    title={confirmTitle}
                    onPress={confirmModal}
                    style={buttonStyle}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

CustomModal.defaultProps = {
  cancelModel: () => {},
  contents: [],
  cancelTitle: 'Cancel',
  confirmTitle: 'Confirm',
  headingColour: COLORS.TEXT,
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 2.84,
    elevation: 5,
  },
  headerContainer: {
    width: '105%',
    flexDirection: 'row',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around',
  },
  modalHeadingText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'tit-regular',
    color: COLORS.TEXT,
    width: '80%',
  },
  textStyle: {
    fontSize: 16,
    color: COLORS.TEXT,
    textAlign: 'center',
    fontFamily: 'tit-light',
  },
});

export default CustomModal;
