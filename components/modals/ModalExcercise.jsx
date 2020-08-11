import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import CustomModal from '.';
import CustomButton from '../CustomButton';
import { useTheme } from '../../hooks/useTheme';

const TITLE = 'Title';
const CYCLES = 'Inhale & exhale';
const REST = 'Rest';
const ROUNDS = 'Rounds';

const TITLE_LENGTH = 30;
const LENGTH_2 = 2;
const LENGTH_3 = 3;

const ModalExcercise = ({
  excercise,
  cancelModal,
  confirmModal,
  headingColour,
  cancelTitle,
  confirmTitle,
  isEditable = false,
  confirmSelectCustomModal = () => {},
  deleteCustomModal = () => {},
}) => {
  const theme = useTheme();
  const [editExcercise, setEditExcercise] = useState(isEditable && !excercise);
  const [deleteExcercise, setDeleteExcercise] = useState(false);
  const [error, setError] = useState({});

  // Added refs as useState would cause keyboard to disappear
  const title = useRef((excercise && excercise.title) || '');
  const cycles = useRef((excercise && excercise.cycles) || '');
  const rest = useRef((excercise && excercise.rest) || '');
  const rounds = useRef((excercise && excercise.rounds) || '');

  const opacity = theme.DARK ? 0.87 : 1;

  const contents = [
    [CYCLES, cycles.current],
    [REST, rest.current],
    [ROUNDS, rounds.current],
  ];

  const editButtonHandler = () => {
    setEditExcercise((curr) => !curr);
  };

  const deleteButtonHandler = () => {
    setDeleteExcercise(true);
  };

  const validatedExcecise = () => {
    let hasError = false;
    let excerciseError = {};
    const wholeNumberRegex = new RegExp(/^\d+$/);

    if (title.current.length < 1 || title.current.length > TITLE_LENGTH) {
      excerciseError[TITLE] = `${TITLE} is incorrect length`;
      hasError = true;
    }
    if (
      cycles.current.length < 1 ||
      cycles.current.length > LENGTH_2 ||
      cycles.current === '0'
    ) {
      excerciseError[CYCLES] = `${CYCLES} is incorrect length`;
      hasError = true;
    }
    if (
      rounds.current.length < 1 ||
      rounds.current.length > LENGTH_2 ||
      rounds.current === '0'
    ) {
      excerciseError[ROUNDS] = `${ROUNDS} is incorrect length`;
      hasError = true;
    }
    if (
      rest.current.length < 1 ||
      rest.current.length > LENGTH_3 ||
      rest.current === '0'
    ) {
      excerciseError[REST] = `${REST} is incorrect length`;
      hasError = true;
    }
    if (!wholeNumberRegex.test(cycles.current)) {
      excerciseError[CYCLES] = `${CYCLES} is the wrong format`;
      hasError = true;
    }
    if (!wholeNumberRegex.test(rounds.current)) {
      excerciseError[ROUNDS] = `${ROUNDS} is the wrong format`;
      hasError = true;
    }
    if (!wholeNumberRegex.test(rest.current)) {
      excerciseError[REST] = `${REST} is the wrong format`;
      hasError = true;
    }

    if (hasError) {
      setError(excerciseError);
      return false;
    }

    return true;
  };

  const createNewExcerciseHandler = () => {
    if (!editExcercise) return confirmSelectCustomModal();

    if (validatedExcecise()) {
      confirmModal(
        {
          title: title.current.trim(),
          cycles: cycles.current.trim(),
          rest: rest.current.trim(),
          rounds: rounds.current.trim(),
          id: isEditable && excercise ? excercise.id : Date.now(),
        },
        !!excercise
      );
    }
  };

  const TopLeft = () => {
    if ((!excercise && isEditable) || !isEditable) return null;
    return (
      excercise && (
        <View style={styles.deleteButton}>
          <TouchableOpacity testID="deleteButton" onPress={deleteButtonHandler}>
            <MaterialCommunityIcons
              name={'delete-outline'}
              color={theme.TEXT}
              size={31}
            />
          </TouchableOpacity>
        </View>
      )
    );
  };
  const TopRight = () => {
    if ((!excercise && isEditable) || !isEditable) return null;

    if (excercise && excercise.title !== title.current) {
      title.current = excercise.title;
    }

    return (
      excercise && (
        <View style={styles.editButton}>
          <TouchableOpacity testID="editButton" onPress={editButtonHandler}>
            <MaterialCommunityIcons
              name={'circle-edit-outline'}
              color={theme.TEXT}
              size={31}
            />
          </TouchableOpacity>
        </View>
      )
    );
  };

  const confirmDeleteHandler = () => {
    deleteCustomModal(excercise.id);
    setDeleteExcercise(false);
    cancelModal();
  };

  const excerciseTitleHandler = (text) => {
    title.current = text;
  };

  const ExcerciseTitle = () => {
    return (
      <TextInput
        testID={`textInput_${TITLE}`}
        editable={editExcercise}
        defaultValue={title.current}
        onChangeText={excerciseTitleHandler}
        placeholder={'Title'}
        placeholderTextColor={theme.DARK ? theme.DARK_GRAY : theme.BORDER}
        style={{
          ...styles.modalHeadingText,
          borderBottomColor: theme.BACKGROUND,
          color: theme.TEXT,
          ...(editExcercise
            ? { ...styles.textInput, borderBottomColor: theme.BORDER }
            : []),
          color: !editExcercise ? headingColour : theme.TEXT,
          ...(error[TITLE] ? { borderBottomColor: theme.ERROR } : []),
        }}
        maxLength={TITLE_LENGTH}
        selectionColor={theme.SECONDARY}
        numberOfLines={2}
        multiline
      />
    );
  };

  const textChangeHandler = (text, detail) => {
    switch (detail) {
      case CYCLES:
        return (cycles.current = text);
      case ROUNDS:
        return (rounds.current = text);
      case REST:
        return (rest.current = text);
      default:
        return;
    }
  };

  const ExcerciseValue = ({ detail, value }) => {
    let textValue = value.toString();

    return (
      <TextInput
        testID={`textInput_${detail}`}
        editable={editExcercise}
        defaultValue={textValue}
        style={{
          ...styles.contentText,
          color: theme.TEXT,
          borderBottomColor: theme.BACKGROUND,
          ...(editExcercise
            ? { ...styles.textInput, borderBottomColor: theme.BORDER }
            : []),
          ...(error[detail] ? { borderBottomColor: theme.ERROR } : []),
          width: '110%',
          opacity,
        }}
        onChangeText={(text) => textChangeHandler(text, detail)}
        keyboardType="number-pad"
        maxLength={detail === REST ? LENGTH_3 : LENGTH_2}
        selectionColor={theme.SECONDARY}
      />
    );
  };

  return (
    <View>
      <CustomModal
        cancelModal={deleteExcercise ? null : cancelModal}
        confirmModal={
          deleteExcercise
            ? null
            : isEditable
            ? createNewExcerciseHandler
            : confirmModal
        }
        headingColour={headingColour}
        cancelTitle={cancelTitle}
        confirmTitle={editExcercise ? 'Save' : confirmTitle}
        TopLeft={deleteExcercise ? null : TopLeft}
        TopRight={deleteExcercise ? null : TopRight}
        header={deleteExcercise ? 'Warning' : !isEditable && title.current}
      >
        {!deleteExcercise && (
          <View>
            {isEditable && (
              <View style={styles.headerContainer}>
                <ExcerciseTitle />
              </View>
            )}
            {contents.map(([detail, value], i) => {
              return (
                <View key={i} style={styles.contentContainer}>
                  <View style={styles.detailContainer}>
                    <Text
                      style={{
                        ...styles.contentText,
                        color: theme.TEXT,
                        borderBottomColor: theme.BACKGROUND,
                        opacity,
                      }}
                    >
                      {detail}
                    </Text>
                    {detail === REST && (
                      <Text
                        style={{
                          ...styles.contentText,
                          color: theme.TEXT,
                          borderBottomColor: theme.BACKGROUND,
                          ...styles.textSecondary,
                        }}
                      >
                        {'  '}
                        (seconds)
                      </Text>
                    )}
                  </View>
                  <View style={styles.valueContainer}>
                    <ExcerciseValue detail={detail} value={value} />
                  </View>
                </View>
              );
            })}
            {Object.keys(error).length > 0 && (
              <View style={styles.errorContainer}>
                <Text style={{ ...styles.errorText, color: theme.ERROR }}>
                  Invalid input
                </Text>
              </View>
            )}
          </View>
        )}
        {deleteExcercise && (
          <View style={styles.warningContainer}>
            <Text
              style={{
                ...styles.contentText,
                color: theme.TEXT,
                borderBottomColor: theme.BACKGROUND,
                textAlign: 'center',
              }}
            >
              Are you sure you want to delete this custom excercise?
            </Text>
            <View style={styles.buttonContainer}>
              <View style={{ width: '40%' }}>
                <CustomButton
                  testID="cancelDelete"
                  title={'No'}
                  onPress={() => setDeleteExcercise(false)}
                />
              </View>
              <View style={{ width: '40%' }}>
                <CustomButton
                  testID="confirmDelete"
                  title={'Yes'}
                  onPress={confirmDeleteHandler}
                />
              </View>
            </View>
          </View>
        )}
      </CustomModal>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    paddingTop: 10,
    flexDirection: 'row',
    width: '100%',
  },
  detailContainer: {
    width: '80%',
    textAlign: 'center',
    paddingLeft: 20,
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: -10,
  },
  modalHeadingText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'tit-regular',
    width: '78%',
    borderBottomWidth: 1,
  },
  valueContainer: { width: '20%', paddingRight: 20 },
  contentText: {
    fontSize: 17,
    fontFamily: 'tit-light',
    justifyContent: 'center',
    borderBottomWidth: 1,
  },
  deleteButton: {
    opacity: 0.63,
  },
  editButton: {
    opacity: 0.63,
  },
  textInput: {
    opacity: 0.7,
  },
  errorContainer: {
    paddingTop: 10,
    marginHorizontal: 20,
    width: '80%',
  },
  errorText: {
    fontFamily: 'tit-regular',
    fontSize: 17,
    opacity: 0.8,
  },
  textSecondary: {
    opacity: 0.6,
    fontSize: 17,
    borderBottomWidth: 1,
  },
  warningContainer: {
    paddingTop: 10,
    width: '100%',
  },
  buttonContainer: {
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default ModalExcercise;
