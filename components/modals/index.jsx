import React from 'react';
import { StyleSheet, View, Modal, Text } from 'react-native';

import CustomButton from '../CustomButton';
import { useTheme } from '../../hooks/useTheme';

const CustomModal = ({
  header,
  cancelTitle,
  confirmTitle,
  cancelModal,
  confirmModal,
  headingColour,
  children,
  TopLeft = () => null,
  TopRight = () => null,
  buttonStyle,
  animationType = 'none',
}) => {
  const theme = useTheme();

  const elevation = theme.DARK ? {} : styles.elevationStyle;

  return (
    <View style={styles.centeredView}>
      <Modal animationType={animationType} transparent>
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              ...elevation,
              backgroundColor: theme.BACKGROUND,
              ...(theme.DARK
                ? { borderColor: theme.PRIMARY, borderWidth: 1 }
                : {}),
            }}
          >
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

            <View style={styles.childrenContainer}>{children}</View>
            {(cancelModal || confirmModal) && (
              <View style={styles.buttonContainer}>
                {cancelModal && (
                  <View style={{ width: '40%' }}>
                    <CustomButton
                      title={cancelTitle}
                      onPress={cancelModal}
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
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
};

CustomModal.defaultProps = {
  cancelModal: () => {},
  contents: [],
  cancelTitle: 'Cancel',
  confirmTitle: 'Confirm',
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
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
  },
  elevationStyle: {
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
    width: '80%',
  },
  childrenContainer: {
    width: '100%',
  },
});

export default CustomModal;
