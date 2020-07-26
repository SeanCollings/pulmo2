import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView, ActivityIndicator } from 'react-native';

import options from './options';
import { useTheme } from '../../hooks/useTheme';
import CustomButton from '../../components/CustomButton';
import RatingScale from '../../components/RatingScale';
import LevelSelector from '../../components/LevelSelector';
import OptionsPicker from '../../components/OptionsPicker';
import {
  OPTIONS_END_ACTIVITY_EARLY,
  OPTION_SELECT_A_REASON,
} from '../../constants/constants';
import Input from '../../components/Input';
import { HistoryContext } from '../../context/history-context';
import CategoryContainer from '../../components/CategoryContainer';

export const editActivityScreenOptions = options;

const EditActivityScreen = ({ route, navigation }) => {
  const { date, level, rating, reason, title } = route.params.editActivity;

  const theme = useTheme();
  const { updateActivity } = useContext(HistoryContext);
  const [isSaving, setIsSaving] = useState(false);
  const [newRating, setNewRating] = useState(rating);
  const [newLevel, setNewLevel] = useState(level);
  const [newTitle, setNewTitle] = useState(title);
  const [newReason, setNewReason] = useState(reason);

  const opacity = theme.DARK ? 0.87 : 1;
  const isSavingOpacity = isSaving ? 0.36 : 1;

  useEffect(() => {
    if (isSaving) {
      updateActivity({
        date,
        newRating,
        newLevel,
        newTitle: newTitle.trim(),
        newReason,
      }).then(() => {
        navigation.goBack();
      });
    }
  }, [isSaving]);

  const cancelEditHandler = () => {
    navigation.goBack();
  };

  const saveActivityHandler = () => {
    setIsSaving(true);
  };

  return (
    <View
      style={{
        ...styles.container,
        backgroundColor: theme.BACKGROUND,
      }}
    >
      {isSaving && (
        <View style={styles.spinner}>
          <ActivityIndicator size="large" color={theme.SECONDARY} />
        </View>
      )}
      <ScrollView>
        <View style={{ alignItems: 'center', opacity: isSavingOpacity }}>
          <CategoryContainer header="Title">
            <Input value={newTitle} onChangeText={setNewTitle} maxLength={25} />
          </CategoryContainer>
          <CategoryContainer header="Level">
            <LevelSelector selectedLevel={newLevel} onChange={setNewLevel} />
          </CategoryContainer>
          <CategoryContainer header="How did you feel?">
            <RatingScale
              selectedRating={newRating}
              onPress={setNewRating}
              showLine={!isSaving}
            />
          </CategoryContainer>
          {newReason && !!newReason.length && (
            <CategoryContainer header="How did you feel?">
              <OptionsPicker
                selectedOption={newReason[0]}
                options={OPTIONS_END_ACTIVITY_EARLY}
                onChange={(updatedReason) => setNewReason([updatedReason])}
                style={{
                  opacity:
                    newReason[0] === OPTION_SELECT_A_REASON.value
                      ? 0.36
                      : opacity,
                }}
              />
            </CategoryContainer>
          )}
        </View>
      </ScrollView>
      <View style={{ ...styles.buttonContainer, opacity: isSavingOpacity }}>
        <CustomButton
          title="cancel"
          onPress={cancelEditHandler}
          disabled={isSaving}
          style={{ width: 100 }}
        />
        <CustomButton
          title="save"
          onPress={saveActivityHandler}
          disabled={isSaving}
          style={{ width: 100 }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
  },
  spinner: {
    flex: 1,
    position: 'absolute',
    alignSelf: 'center',
    top: '50%',
    zIndex: 1,
  },
  buttonContainer: {
    paddingVertical: 10,
    alignItems: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-evenly',
  },
});

export default EditActivityScreen;
