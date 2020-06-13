import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import {
  ExcerciseContext,
  SELECTED_EXCERCISE,
} from '../../context/excercise-context';
import { ProfileContext, SELECTED_LEVEL } from '../../context/profile-context';
import { CustomExcerciseContext } from '../../context/custom-excercise-context';
import options from './options';
import { TOTAL_DIFFICULTY_LEVELS } from '../../constants/constants';
import Slides from '../../components/Slides';
import { EXCERCISE_DATA } from '../../data/excercises';
import { CUSTOM_KEY, STRENGTH_KEY, ENDURANCE_KEY } from '../../data';
import CustomSwitch from '../../components/Switch';
import ModalExcercise from '../../components/modals/ModalExcercise';
import CustomButton from '../../components/CustomButton';
import { storeAsyncData } from '../../helpers/storage';
import { useTheme } from '../../hooks/useTheme';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const excercisesScreenOptions = options;

const getColour = (title, theme) => {
  switch (title) {
    case STRENGTH_KEY:
      return theme.TERTIARY;
    case ENDURANCE_KEY:
      return theme.SECONDARY;
    case CUSTOM_KEY:
      return theme.QUATERNARY;
    default:
      return theme.TERTIARY;
  }
};

const updateSelectedExercise = (toggleExcercise, content, type) => (
  selected
) => {
  const excerciseId = selected && content && content.id;

  toggleExcercise(excerciseId, type);
  storeAsyncData(SELECTED_EXCERCISE, [excerciseId, type]);
};

const SlideContent = ({
  contents,
  colour,
  setModalContent,
  excerciseContext,
  type,
  theme,
}) => {
  const { toggleExcercise, selectedExcercise } = excerciseContext;

  return contents.map((content, i) => (
    <View
      key={content.id}
      style={{
        ...styles.slideContentContainer,
        borderBottomColor: theme.DARK ? theme.DARK_GRAY : theme.BORDER,
        borderBottomWidth: i === contents.length - 1 ? 0 : 1,
      }}
    >
      <TouchableOpacity
        style={styles.slideContentTitle}
        onPress={() => setModalContent([content, colour, type])}
      >
        <Text
          style={{
            ...styles.slideContentText,
            color: theme.TEXT,
            opacity: theme.DARK ? 0.87 : 1,
          }}
        >
          {content.title}
        </Text>
      </TouchableOpacity>
      <View style={styles.slideContentToggle}>
        <CustomSwitch
          trackColor={colour}
          state={selectedExcercise[0] === content.id}
          onChange={updateSelectedExercise(toggleExcercise, content, type)}
        />
      </View>
    </View>
  ));
};

const IndividualSlide = ({
  data,
  setModalContent,
  setCreateNewModalContent,
  excerciseContext,
  createNewHandler,
  customExcerciseContext,
  theme,
}) =>
  data.map((slide, i) => {
    const custom = slide.title === CUSTOM_KEY;
    const colour = getColour(slide.title, theme);

    return (
      <View
        key={`slide-${i}`}
        style={{ ...styles.slideStyle, backgroundColor: theme.BACKGROUND }}
      >
        <View style={styles.slideContent}>
          <View style={styles.topContainer}>
            <View style={styles.leftChevron}>
              {i !== 0 && (
                <MaterialCommunityIcons
                  name={'chevron-left'}
                  color={theme.BORDER}
                  size={20}
                />
              )}
            </View>
            <View
              style={{
                ...styles.headingContainer,
                backgroundColor: theme.DARK ? theme.BACKGROUND : colour,
                borderColor: colour,
                borderWidth: theme.DARK ? 1 : 0,
              }}
            >
              <MaterialCommunityIcons
                name={slide.icon}
                color={theme.DARK ? colour : theme.BACKGROUND}
                size={30}
              />
              <Text
                style={{
                  ...styles.slideHeading,
                  color: theme.DARK ? colour : theme.BACKGROUND,
                }}
              >
                {slide.title}
              </Text>
            </View>
            <View style={styles.rightChevron}>
              {i !== data.length - 1 && (
                <MaterialCommunityIcons
                  name={'chevron-right'}
                  color={theme.BORDER}
                  size={20}
                  style={{ textAlign: 'right' }}
                />
              )}
            </View>
          </View>
          <View style={styles.promptContainer}>
            {!custom && (
              <Text
                style={{
                  ...styles.promptText,
                  color: theme.TEXT,
                  opacity: theme.DARK ? 0.87 : 1,
                }}
              >
                Select an excercise
              </Text>
            )}
            {custom && (
              <CustomButton
                title="Create new excercise"
                onPress={() => createNewHandler(colour)}
                bgColour={theme.DARK ? theme.PRIMARY : theme.BACKGROUND}
              />
            )}
          </View>
          <ScrollView
            contentContainerStyle={{ width: '100%', alignItems: 'center' }}
          >
            <SlideContent
              setModalContent={
                custom ? setCreateNewModalContent : setModalContent
              }
              colour={colour}
              contents={
                custom
                  ? customExcerciseContext.customExcercises
                  : slide.contents
              }
              excerciseContext={excerciseContext}
              type={slide.id}
              theme={theme}
            />
          </ScrollView>
        </View>
      </View>
    );
  });

const ExcercisesScreen = (props) => {
  const theme = useTheme();
  const data = EXCERCISE_DATA;
  const excerciseContext = useContext(ExcerciseContext);
  const { profileContext } = useContext(ProfileContext);
  const customExcerciseContext = useContext(CustomExcerciseContext);
  const [modalContent, setModalContent] = useState(null);
  const [createNewModalContent, setCreateNewModalContent] = useState(null);

  const selectedLevel =
    (profileContext && profileContext[SELECTED_LEVEL]) ||
    TOTAL_DIFFICULTY_LEVELS;

  const cancelModalHandler = () => {
    setModalContent(null);
  };

  const confirmModalHandler = () => {
    const [excercise, _, type] = modalContent;
    excerciseContext.toggleExcercise(excercise.id, type);
    setModalContent(null);
  };

  const confirmCustomModalHandler = () => {
    const content = createNewModalContent[0];
    excerciseContext.toggleExcercise(content);
    setCreateNewModalContent(null);
  };

  const createNewHandler = (color) => {
    setCreateNewModalContent([null, color]);
  };

  const cancelCreateNewModalHandler = () => {
    setCreateNewModalContent(null);
  };

  const saveNewExcerciseHandler = (newExcercise, update) => {
    setCreateNewModalContent(null);
    if (update) {
      customExcerciseContext.updateCustomExcercise(newExcercise);
    } else {
      customExcerciseContext.addCustomExcercise(newExcercise);
    }
  };

  return (
    <View style={styles.scrollView}>
      <Slides
        data={data}
        totalSlides={data.length}
        IndividualSlide={IndividualSlide}
      >
        <IndividualSlide
          data={data}
          setModalContent={setModalContent}
          setCreateNewModalContent={setCreateNewModalContent}
          excerciseContext={excerciseContext}
          createNewHandler={createNewHandler}
          customExcerciseContext={customExcerciseContext}
          theme={theme}
        />
      </Slides>
      {modalContent && (
        <ModalExcercise
          excercise={modalContent[0]}
          headingColour={modalContent[1]}
          cancelModel={cancelModalHandler}
          confirmModal={confirmModalHandler}
          selectedLevel={selectedLevel}
          cancelTitle="Back"
          confirmTitle="Select"
        />
      )}
      {createNewModalContent && (
        <ModalExcercise
          excercise={createNewModalContent[0]}
          headingColour={createNewModalContent[1]}
          cancelModel={cancelCreateNewModalHandler}
          confirmModal={saveNewExcerciseHandler}
          confirmSelectCustomModal={confirmCustomModalHandler}
          deleteCustomModal={customExcerciseContext.deleteCustomExcercise}
          selectedLevel={selectedLevel}
          cancelTitle="Back"
          confirmTitle="Select"
          isEditable
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  scrollView: { flex: 1 },
  slideStyle: {
    flex: 1,
    alignItems: 'center',
    width: SCREEN_WIDTH,
    paddingBottom: 5,
  },
  slideContent: {
    flex: 1,
    width: '90%',
    paddingVertical: 20,
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  leftChevron: {
    width: '10%',
    alignItems: 'center',
  },
  rightChevron: {
    width: '10%',
    alignItems: 'center',
  },
  headingContainer: {
    padding: 20,
    alignItems: 'center',
    width: '80%',
    borderRadius: 12,
    elevation: 8,
  },
  slideHeading: {
    fontSize: 24,
    fontFamily: 'tit-regular',
    paddingTop: 10,
  },
  promptContainer: {
    padding: 20,
  },
  promptText: { fontSize: 20, fontFamily: 'tit-regular' },
  slideContentContainer: {
    flexDirection: 'row',
    width: '90%',
    height: 50,
  },
  slideContentTitle: {
    flex: 1,
    justifyContent: 'center',
  },
  slideContentText: {
    fontFamily: 'tit-regular',
    fontSize: 16,
    padding: 10,
  },
  slideContentToggle: {
    justifyContent: 'center',
    paddingRight: 10,
  },
});

export default ExcercisesScreen;
