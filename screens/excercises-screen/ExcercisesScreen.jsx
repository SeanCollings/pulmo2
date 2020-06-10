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
import { COLORS, TOTAL_DIFFICULTY_LEVELS } from '../../constants/constants';
import Slides from '../../components/Slides';
import { EXCERCISE_DATA } from '../../data/excercises';
import { CUSTOM_KEY } from '../../data';
import CustomSwitch from '../../components/Switch';
import ModalExcercise from '../../components/modals/ModalExcercise';
import CustomButton from '../../components/CustomButton';
import { storeAsyncData } from '../../helpers/storage';

const SCREEN_WIDTH = Dimensions.get('window').width;

export const excercisesScreenOptions = options;

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
}) => {
  const { toggleExcercise, selectedExcercise } = excerciseContext;

  return contents.map((content, i) => (
    <View
      key={content.id}
      style={{
        ...styles.slideContentContainer,
        borderBottomWidth: i === contents.length - 1 ? 0 : 1,
      }}
    >
      <TouchableOpacity
        style={styles.slideContentTitle}
        onPress={() => setModalContent([content, colour, type])}
      >
        <Text style={styles.slideContentText}>{content.title}</Text>
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
}) =>
  data.map((slide, i) => {
    const custom = slide.title === CUSTOM_KEY;

    return (
      <View key={`slide-${i}`} style={{ ...styles.slideStyle }}>
        <View style={styles.slideContent}>
          <View style={styles.topContainer}>
            <View style={styles.leftChevron}>
              {i !== 0 && (
                <MaterialCommunityIcons
                  name={'chevron-left'}
                  color={COLORS.BORDER}
                  size={20}
                />
              )}
            </View>
            <View
              style={{
                ...styles.headingContainer,
                backgroundColor: slide.colour,
              }}
            >
              <MaterialCommunityIcons
                name={slide.icon}
                color={COLORS.SECONDARY_TEXT}
                size={30}
              />
              <Text style={styles.slideHeading}>{slide.title}</Text>
            </View>
            <View style={styles.rightChevron}>
              {i !== data.length - 1 && (
                <MaterialCommunityIcons
                  name={'chevron-right'}
                  color={COLORS.BORDER}
                  size={20}
                  style={{ textAlign: 'right' }}
                />
              )}
            </View>
          </View>
          <View style={styles.promptContainer}>
            {!custom && (
              <Text style={styles.promptText}>Select an excercise</Text>
            )}
            {custom && (
              <CustomButton
                title="Create new excercise"
                onPress={() => createNewHandler(slide.colour)}
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
              colour={slide.colour}
              contents={
                custom
                  ? customExcerciseContext.customExcercises
                  : slide.contents
              }
              excerciseContext={excerciseContext}
              type={slide.id}
            />
          </ScrollView>
        </View>
      </View>
    );
  });

const ExcercisesScreen = (props) => {
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
    backgroundColor: COLORS.BACKGROUND,
    paddingBottom: 5,
  },
  slideContent: {
    flex: 1,
    width: '95%',
    padding: 20,
    alignItems: 'center',
  },
  topContainer: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
  },
  leftChevron: {
    width: '10%',
  },
  rightChevron: {
    width: '10%',
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
    color: COLORS.SECONDARY_TEXT,
    fontFamily: 'tit-regular',
    paddingTop: 10,
  },
  promptContainer: {
    padding: 20,
  },
  promptText: { fontSize: 20, fontFamily: 'tit-regular', color: COLORS.TEXT },
  slideContentContainer: {
    flexDirection: 'row',
    width: '90%',
    borderBottomColor: COLORS.BORDER,

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
    color: COLORS.TEXT,
  },
  slideContentToggle: {
    justifyContent: 'center',
    paddingRight: 10,
  },
});

export default ExcercisesScreen;
