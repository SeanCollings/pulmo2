import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomModal from '.';
import { useTheme } from '../../hooks/useTheme';
import { getColour, getIcon } from '../../utils';

const ModalDayActivities = ({
  cancelModal,
  header,
  activities,
  navigation,
}) => {
  const theme = useTheme();

  const activitySelectedHandler = ({ date, favourite, title }) => {
    cancelModal();
    navigation.navigate('Activity', {
      item: { date, favourite, title },
    });
  };

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <CustomModal
      cancelModal={cancelModal}
      header={header}
      cancelTitle="Back"
      headingColour={theme.SECONDARY}
      animationType="none"
    >
      <View style={styles.container}>
        <ScrollView>
          {activities.map((activity) => {
            return (
              <TouchableOpacity
                key={activity.date}
                style={styles.contentContainer}
                onPress={() => activitySelectedHandler(activity)}
              >
                <View>
                  <View style={styles.rowContainer}>
                    <View style={styles.iconContainer}>
                      <MaterialCommunityIcons
                        name={getIcon(activity.type)}
                        color={getColour(activity.type, theme)}
                        size={20}
                      />
                    </View>
                    <Text
                      style={{
                        ...styles.contentText,
                        color: theme.TEXT,
                        opacity,
                      }}
                    >
                      {activity.title}
                    </Text>
                    <View style={{ ...styles.iconContainer, opacity }}>
                      <MaterialCommunityIcons
                        name="chevron-right"
                        color={theme.DARK ? theme.TEXT : theme.BORDER}
                        size={25}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </CustomModal>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    maxHeight: 260,
  },
  contentContainer: {
    paddingHorizontal: 10,
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  iconContainer: {
    justifyContent: 'center',
    width: '10%',
  },
  contentText: {
    paddingLeft: 10,
    textAlign: 'left',
    fontSize: 17,
    fontFamily: 'tit-light',
    width: '80%',
  },
});

export default ModalDayActivities;
