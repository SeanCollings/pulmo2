import React, { useEffect, useState, useContext } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
// import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { HistoryContext } from '../../context/history-context';
import options from './options';
import { COLORS } from '../../constants/constants';
import { getTotalResultTime, getRemainingTime, convertDate } from '../../utils';
import Table from '../../components/Table';
// import HeaderButton from '../../components/HeaderButton';
import CustomButton from '../../components/CustomButton';
import ConfirmModal from '../../components/modals/ConfirmModal';

export const activityScreenOptions = options;

const DetailContainer = ({ type, detail, style }) => {
  return (
    <View style={{ ...styles.detailContainer, ...style }}>
      <Text style={styles.detailText}>{detail}</Text>
      <View style={{ justifyContent: 'center', height: 40 }}>
        <Text style={styles.detailTypeText}>{type}</Text>
      </View>
    </View>
  );
};

const ActivityScreen = ({ route, navigation }) => {
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ alignItems: 'center' }}>
          <View style={styles.topContainer}>
            <Text style={styles.headingStyle}>{type}</Text>
            <Text style={styles.textStyle}>{convertDate(date)}</Text>
          </View>
          <View style={styles.verticalLine}></View>
          <View style={styles.levelContainer}>
            <Text style={styles.textStyle}>
              total time: {getRemainingTime(totalTime)}
            </Text>
            <Text style={styles.textStyle}>level: {level}</Text>
          </View>
          <View style={styles.allDetailContainer}>
            <DetailContainer
              type={`inhale & exhale`}
              detail={excercise.cycles}
            />
            <DetailContainer
              type="rest"
              detail={getRemainingTime(excercise.rest)}
              style={{ backgroundColor: COLORS.SECONDARY }}
            />
            <DetailContainer type="rounds" detail={excercise.rounds} />
          </View>
          <View style={styles.resultsContainer}>
            <Text style={styles.headingStyle}>results</Text>
            <Table headerContent={['Workout', 'Rest']} rowContents={results} />
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
    backgroundColor: COLORS.BACKGROUND,
  },
  verticalLine: {
    width: '80%',
    borderTopColor: COLORS.BORDER,
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
    color: COLORS.TEXT,
  },
  headingStyle: {
    fontFamily: 'tit-regular',
    fontSize: 18,
    color: COLORS.SECONDARY,
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
    backgroundColor: COLORS.QUARTERNARY,
    paddingHorizontal: 10,
    paddingVertical: 10,
    width: '32%',
    borderRadius: 20,
    alignItems: 'center',
  },
  detailText: {
    fontFamily: 'tit-regular',
    color: COLORS.BACKGROUND,
    fontSize: 24,
    paddingBottom: 5,
  },
  detailTypeText: {
    fontFamily: 'tit-regular',
    textAlign: 'center',
    color: COLORS.BACKGROUND,
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
