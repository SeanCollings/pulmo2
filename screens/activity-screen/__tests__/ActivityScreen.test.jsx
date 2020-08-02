import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup, fireEvent } from 'react-native-testing-library';
import ActivityScreen, { activityScreenOptions } from '../ActivityScreen';
import HistoryContextProvider from '../../../context/history-context';
import {
  getAsyncData,
  removeAsyncData,
  storeAsyncData,
} from '../../../helpers/storage';
import {
  OPTION_SELECT_A_REASON,
  OPTION_OUT_OF_BREATH,
} from '../../../constants/constants';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../../../helpers/storage');

describe('ActivityScreen - unit test', () => {
  let component;
  const navigation = { setOptions: () => {} };
  const route = {
    params: {
      item: {
        date: '2020-07-26T15:15:43.411Z',
        favourite: true,
      },
    },
  };

  const activity = {
    date: '2020-07-26T15:15:43.411Z',
    excercise: {
      cycles: '10',
      id: 1595776234187,
      rest: '5',
      rounds: '2',
      title: 'Custom Excercise',
    },
    favourite: false,
    level: 2,
    results: [
      ['01:38', '00:05'],
      ['00:32', ''],
    ],
    type: 'Custom',
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    getAsyncData.mockReturnValueOnce(activity);

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test(`should render default incomplete activity of ${OPTION_SELECT_A_REASON.value}`, async () => {
    getAsyncData.mockReturnValueOnce({
      ...activity,
      incomplete: [OPTION_SELECT_A_REASON.value],
    });

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test(`should render incomplete activity of reason ${OPTION_OUT_OF_BREATH.value}`, async () => {
    getAsyncData.mockReturnValueOnce({
      ...activity,
      incomplete: [OPTION_OUT_OF_BREATH.value],
    });

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test(`should not render an incomplete reason if option does not exist`, async () => {
    getAsyncData.mockReturnValueOnce({
      ...activity,
      incomplete: ['made_up'],
    });

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(component).toMatchSnapshot();
  });

  test('should call navigate to EditActivity', async () => {
    getAsyncData.mockReturnValueOnce(activity);

    const navigateAway = { ...navigation, navigate: jest.fn() };
    const expected = {
      editActivity: {
        date: '2020-07-26T15:15:43.411Z',
        level: 2,
        rating: undefined,
        reason: undefined,
        title: 'Custom Excercise',
      },
    };

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigateAway} />
        </HistoryContextProvider>
      );
    });

    const editButton = component.root.find(
      ({ props }) => props.title === 'Edit'
    );

    fireEvent.press(editButton);
    expect(navigateAway.navigate).toHaveBeenCalledWith(
      'EditActivity',
      expected
    );
  });

  test('should show the confirm delete modal', async () => {
    getAsyncData.mockReturnValueOnce(activity);
    const navigateAway = { ...navigation, navigate: jest.fn() };

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigateAway} />
        </HistoryContextProvider>
      );
    });

    const deleteButton = component.root.find(
      ({ props }) => props.title === 'delete'
    );

    fireEvent.press(deleteButton);
    expect(component).toMatchSnapshot();
  });

  test('should cancel the confirm delete modal', async () => {
    getAsyncData.mockReturnValueOnce(activity);
    const navigateAway = { ...navigation, navigate: jest.fn() };

    await act(async () => {
      component = create(
        <HistoryContextProvider>
          <ActivityScreen route={route} navigation={navigateAway} />
        </HistoryContextProvider>
      );
    });

    const deleteButton = component.root.find(
      ({ props }) => props.title === 'delete'
    );
    fireEvent.press(deleteButton);
    const cancelModal = component.root.find(
      ({ props }) => props.testID === 'cancelModal'
    );
    fireEvent.press(cancelModal);

    expect(component).toMatchSnapshot();
  });

  test('should delete an activity if confirm delete selected', async () => {
    getAsyncData.mockReturnValueOnce(activity);
    removeAsyncData.mockReturnValueOnce(Promise.resolve());
    storeAsyncData.mockReturnValueOnce(Promise.resolve());
    const navigateAway = { ...navigation, navigate: jest.fn() };

    await act(async () => {
      component = create(
        <HistoryContextProvider idArray={['2020-07-26T15:15:43.411Z']}>
          <ActivityScreen route={route} navigation={navigateAway} />
        </HistoryContextProvider>
      );
    });

    const deleteButton = component.root.find(
      ({ props }) => props.title === 'delete'
    );
    fireEvent.press(deleteButton);

    const confirmModalButton = component.root.find(
      ({ props }) => props.testID === 'confirmModal'
    );
    fireEvent.press(confirmModalButton);
  });

  describe('activityScreenOptions', () => {
    test('options', () => {
      const options = activityScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = activityScreenOptions().headerTitle();
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
