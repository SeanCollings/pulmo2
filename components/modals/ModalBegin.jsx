import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SELECTED_LEVEL, ProfileContext } from '../../context/profile-context';
import CustomModal from '.';
import { useTheme } from '../../hooks/useTheme';

const ModalBegin = ({ cancelModal, confirmModal, navigation }) => {
  const theme = useTheme();
  const { profileContext } = useContext(ProfileContext);

  const selectedLevel =
    (profileContext && profileContext[SELECTED_LEVEL]) ||
    TOTAL_DIFFICULTY_LEVELS;

  const contents = [
    'Inhale and exhale as slowly and as deeply as you can.',
    'Repeat through all breath cycles.',
    'Rest for the prescribed time.',
    'Repeat for each round.',
    `Current difficulty level: ${selectedLevel}`,
  ];

  const BackButton = () => (
    <TouchableOpacity onPress={cancelModal} style={styles.backButton}>
      <MaterialCommunityIcons
        name="arrow-left"
        color={theme.BORDER}
        size={33}
      />
    </TouchableOpacity>
  );

  const updateLevelHandler = () => {
    navigation.navigate('Profile');
    cancelModal();
  };

  return (
    <CustomModal
      cancelModal={updateLevelHandler}
      confirmModal={confirmModal}
      header={'Ready to begin?'}
      confirmTitle="Begin"
      cancelTitle="Update level"
      headingColour={theme.SECONDARY}
      TopLeft={BackButton}
      buttonStyle={{ height: 60 }}
      animationType="fade"
    >
      <View style={styles.container}>
        {contents.map((content, i) => (
          <View key={i} style={styles.contentContainer}>
            <Text
              style={{
                ...styles.contentText,
                color: theme.TEXT,
                fontFamily:
                  i === contents.length - 1 ? 'tit-regular' : 'tit-light',
                opacity: theme.DARK ? 0.87 : 1,
              }}
            >
              {content}
            </Text>
          </View>
        ))}
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingTop: 10,
  },
  contentContainer: {
    paddingTop: 10,
  },
  contentText: {
    textAlign: 'center',
    fontSize: 17,
  },
  backButton: { position: 'absolute', left: 0 },
});

export default ModalBegin;
