import React, { useContext, useState } from 'react';
import { StyleSheet, View, ScrollView, Text } from 'react-native';

import options from './options';
import optionsEntry from './optionsEntry';
import { useTheme } from '../../hooks/useTheme';
import {
  DISCLAIMER_SHOW,
  DISCLAIMER_DONT_SHOW_AGAIN,
  ProfileContext,
  DISCLAIMER,
} from '../../context/profile-context';
import Checkbox from '../../components/Checkbox';
import CustomButton from '../../components/CustomButton';

export const disclaimerScreenOptions = options;
export const disclaimerScreenOptionsEntry = optionsEntry;

const DisclaimerScreen = ({ route }) => {
  const theme = useTheme();
  const { updateProfileContext } = useContext(ProfileContext);
  const [disclaimerChecked, setDisclaimerChecked] = useState(false);

  const { readOnly } = route.params;

  const opacity = theme.DARK ? 0.87 : 1;
  const textContentStyle = { ...styles.textStyle, color: theme.TEXT, opacity };

  const onAgreeHandler = () => {
    const updatedDisclaimer = {
      [DISCLAIMER_SHOW]: false,
      [DISCLAIMER_DONT_SHOW_AGAIN]: disclaimerChecked,
    };
    updateProfileContext(DISCLAIMER, updatedDisclaimer);
  };

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <ScrollView
        style={styles.scrollviewContainer}
        contentContainerStyle={{ alignSelf: 'center' }}
      >
        <View style={styles.contentContainer}>
          <Text style={textContentStyle}>
            The use of this application is not intended to be a substitute for
            professional medical advice, diagnosis, or treatment. Always seek
            the advice of your physician or other qualified health provider with
            any questions or queries you may have.
          </Text>
          <Text style={textContentStyle} />
          <Text style={textContentStyle}>
            Rinse your Luft&trade; thoroughly with warm water and a mild
            detergent after each use. Be sure to flush both ends of the device
            and any attachments that you may have used with clear water. Shake
            out any excess water and allow to air dry. DO NOT BOIL or HEAT.
            After allowing the device to dry completely, store the Luft&trade;
            for your next session.
          </Text>
          <Text style={textContentStyle} />
          <Text style={textContentStyle}>Note:</Text>
          <Text style={textContentStyle}>
            For asthmatics, do not exhale using the Luft&trade; in the first
            week, rather breathe out normally. During the second week, exhale
            using the Luft&trade;.
          </Text>
          <Text style={textContentStyle} />
          {!readOnly && (
            <View style={styles.selectionContainer}>
              <View style={styles.checkboxContainer}>
                <Checkbox
                  state={disclaimerChecked}
                  onChange={() => setDisclaimerChecked((curr) => !curr)}
                  label="Don't show me again"
                />
              </View>
              <View style={styles.buttonContainer}>
                <CustomButton
                  title="Agree"
                  onPress={onAgreeHandler}
                  style={{ width: 100 }}
                />
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  scrollviewContainer: {
    width: '100%',
  },
  contentContainer: { alignItems: 'center', width: '80%', paddingTop: 20 },
  upperContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
  },
  textStyle: {
    fontFamily: 'tit-regular',
    fontSize: 16,
    textAlign: 'center',
  },
  selectionContainer: { alignItems: 'center' },
  checkboxContainer: {
    paddingTop: 10,
  },
  buttonContainer: {
    paddingTop: 10,
    paddingBottom: 30,
  },
});

export default DisclaimerScreen;
