import React, { useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SELECTED_LEVEL, ProfileContext } from '../../context/profile-context';
import CustomModal from '.';
import { useTheme } from '../../hooks/useTheme';

const ModalBegin = ({ cancelModel, confirmModal, navigation }) => {
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
    <TouchableOpacity onPress={cancelModel} style={styles.backButton}>
      <MaterialCommunityIcons
        name="arrow-left"
        color={theme.BORDER}
        size={26}
      />
    </TouchableOpacity>
  );

  const updateLevelHandler = () => {
    navigation.navigate('Profile');
    setTimeout(() => {
      cancelModel();
    }, 0);
  };

  return (
    <CustomModal
      cancelModel={updateLevelHandler}
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
  },
  contentContainer: {
    paddingTop: 10,
  },
  contentText: {
    textAlign: 'center',
    fontSize: 16,
  },
  backButton: { position: 'absolute', left: 0, paddingTop: 3 },
});

export default ModalBegin;
