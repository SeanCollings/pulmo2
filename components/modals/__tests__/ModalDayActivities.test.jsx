import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ModalDayActivities from '../ModalDayActivities';

jest.useFakeTimers();

describe('ModalDayActivities - unit test', () => {
  let component;
  const cancelModal = jest.fn();
  const navigation = { navigate: jest.fn() };
  const activities = [
    {
      date: '2020-07-26T15:15:43.411Z',
      type: 'Strength',
      title: 'Excercise Title',
      favourite: false,
    },
    {
      date: '2020-07-26T16:16:43.411Z',
      type: 'Strength',
      title: 'Excercise Title 2',
      favourite: true,
    },
  ];
  const header = 'ModalDayActivities';

  afterEach(() => {
    cleanup();
  });

  test('should render with custom props', async () => {
    await act(async () => {
      component = create(
        <ModalDayActivities
          cancelModal={cancelModal}
          header={header}
          navigation={navigation}
          activities={activities}
        />
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should allow the selection of an activity', async () => {
    await act(async () => {
      component = create(
        <ModalDayActivities
          cancelModal={cancelModal}
          header={header}
          navigation={navigation}
          activities={activities}
        />
      );
    });

    const activitySelectButton = component.root.find(
      ({ props }) => props.testID === `activity_select_${activities[0].date}`
    );

    fireEvent.press(activitySelectButton);
    expect(navigation.navigate).toHaveBeenCalled();
    expect(cancelModal).toHaveBeenCalled();
  });
});
