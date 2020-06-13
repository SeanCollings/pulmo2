import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HistoryContext } from '../../context/history-context';
import options from './options';
import { getTotalResultTime, getRemainingTime, convertDate } from '../../utils';
import Table from '../../components/Table';
// import HeaderButton from '../../components/HeaderButton';
import CustomButton from '../../components/CustomButton';
import ConfirmModal from '../../components/modals/ConfirmModal';
import { useTheme } from '../../hooks/useTheme';

export const activityScreenOptions = options;

const DetailContainer = ({ type, detail, colour, theme }) => {
  return (
    <View
      style={{
        ...styles.detailContainer,
        backgroundColor: theme.DARK ? theme.BACKGROUND : colour,
        borderColor: colour,
        borderWidth: theme.DARK ? 2 : 0,
      }}
    >
      <Text
        style={{
          ...styles.detailText,
          color: theme.DARK ? colour : theme.BACKGROUND,
        }}
      >
        {detail}
      </Text>
      <View style={{ justifyContent: 'center', height: 40 }}>
        <Text
          style={{
            ...styles.detailTypeText,
            color: theme.DARK ? colour : theme.BACKGROUND,
          }}
        >
          {type}
        </Text>
      </View>
    </View>
  );
};

const ActivityScreen = ({ route, navigation }) => {
  const theme = useTheme();
  const { deleteActivity } = useContext(HistoryContext);
  const [showModal, setShowModal] = useState(false);

  const { date, excercise, level, results, type } = route.params.item;
  const totalTime = getTotalResultTime(results);

  // const openMenuHandler = () => {
  //   console.log(excercise.title);
  // };

  useEffect(() => {
    // navigation.setOptions({
    //   headerRight: () => (
    //     <HeaderButtons HeaderButtonComponent={HeaderButton}>
    //       <Item
    //         title="help"
    //         iconName={'dots-vertical'}
    //         onPress={openMenuHandler}
    //       />
    //     </HeaderButtons>
    //   ),
    // });
  }, []);

  const showModalHandler = () => {
    setShowModal(true);
  };

  const deleteActivityHandler = () => {
    navigation.goBack();
    setShowModal(false);
    deleteActivity(date);
  };

  const opacity = theme.DARK ? 0.87 : 1;

  return (
    <View style={{ ...styles.container, backgroundColor: theme.BACKGROUND }}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.topContainer}>
            <Text
              style={{ ...styles.headingStyle, color: theme.TEXT, opacity }}
            >
              {type}
            </Text>
            <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
              {convertDate(date)}
            </Text>
          </View>
          <View
            style={{ ...styles.verticalLine, borderTopColor: theme.BORDER }}
          ></View>
          <View style={styles.levelContainer}>
            <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
              total time: {getRemainingTime(totalTime)}
            </Text>
            <Text style={{ ...styles.textStyle, color: theme.TEXT, opacity }}>
              level: {level}
            </Text>
          </View>
          <View style={styles.allDetailContainer}>
            <DetailContainer
              type={`inhale & exhale`}
              detail={excercise.cycles}
              theme={theme}
              colour={theme.QUARTERNARY}
            />
            <DetailContainer
              type="rest"
              detail={getRemainingTime(excercise.rest)}
              colour={theme.SECONDARY}
              theme={theme}
            />
            <DetailContainer
              type="rounds"
              detail={excercise.rounds}
              theme={theme}
              colour={theme.QUARTERNARY}
            />
          </View>
          <View style={styles.resultsContainer}>
            <Text
              style={{
                ...styles.headingStyle,
                paddingBottom: 5,
                color: theme.SECONDARY,
              }}
            >
              results
            </Text>
            <Table
              headerContent={['Workout', 'Rest']}
              rowContents={results}
              headerColour={theme.DARK ? theme.TEXT : theme.TERTIARY}
            />
          </View>
        </View>
        {showModal && (
          <ConfirmModal
            cancelModel={() => setShowModal(false)}
            confirmModal={deleteActivityHandler}
            message="Are you sure you want to delete this activity permanently? "
          />
        )}
      </ScrollView>
      <View style={styles.buttonContainer}>
        <CustomButton title="delete" onPress={showModalHandler} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  verticalLine: {
    width: '80%',
    borderTopWidth: 1,
    opacity: 0.6,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    paddingVertical: 15,
  },
  textStyle: {
    fontFamily: 'tit-light',
    fontSize: 18,
  },
  headingStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
  },
  levelContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  allDetailContainer: {
    width: '90%',
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  detailContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '32%',
    borderRadius: 20,
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'tit-regular',
    fontSize: 24,
    paddingBottom: 5,
  },
  detailTypeText: {
    fontFamily: 'tit-regular',
    textAlign: 'center',
  },
  resultsContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    paddingVertical: 10,
    alignItems: 'center',
  },
});

export default ActivityScreen;
