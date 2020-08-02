import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import FavouritesScreen, { favouritesScreenOptions } from '../FavouritesScreen';
import HistoryContextProvider from '../../../context/history-context';
import { getAsyncData, getMultiAsyncData } from '../../../helpers/storage';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../../../helpers/storage');

describe('FavouritesScreen - unit test', () => {
  let tree;
  const navigation = { goBack: () => {} };
  const activityIdArray = [
    '2020-07-26T15:15:43.411Z',
    '2020-06-12T15:15:43.411Z',
    '2020-07-25T15:15:43.411Z',
    '2020-02-22T15:15:43.411Z',
  ];
  const activities = [
    [
      '@Plumo2:2020-07-26T15:15:43.411Z',
      '{"date":"2020-07-26T15:15:43.411Z","excercise":{"cycles":"10","id":1,"rest":"5","rounds":"2","title":"Custom Excercise 1"},"favourite":true,"level":2,"results":[["01:38","00:05"],["00:32",""]],"type":"Custom"}',
    ],
    [
      '@Plumo2:2020-06-12T15:15:43.411Z',
      '{"date":"2020-06-12T15:15:43.411Z","excercise":{"cycles":"11","id":2,"rest":"4","rounds":"3","title":"Endurance Excercise 2"},"favourite":true,"level":3,"results":[["01:38","00:15"],["00:32","00:15"],["02:38","00:15"]],"type":"Endurance"}',
    ],
    ['@Plumo2:2020-02-22T15:15:43.411Z', null],
    [
      '@Plumo2:2020-07-25T15:15:43.411Z',
      '{"date":"2020-07-25T15:15:43.411Z","excercise":{"cycles":"12","id":3,"rest":"5","rounds":"4","title":"Strength Excercise 3"},"favourite":true,"level":4,"results":[["01:38","01:00"]],"type":"Strength"}',
    ],
  ];

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render empty screen when there are no favourited activity IDs', async () => {
    getAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      tree = create(
        <HistoryContextProvider favIdArray={[]}>
          <FavouritesScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should render empty screen when there are no favourited activities for the found activity IDs', async () => {
    getAsyncData.mockReturnValueOnce(activityIdArray);
    getMultiAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      tree = create(
        <HistoryContextProvider favIdArray={[]}>
          <FavouritesScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should render favourited activities when present', async () => {
    getAsyncData.mockReturnValueOnce(activityIdArray);
    getMultiAsyncData.mockReturnValueOnce(activities);

    await act(async () => {
      tree = create(
        <HistoryContextProvider favIdArray={[]}>
          <FavouritesScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should render an empty screen if there is an error in favourited activity load', async () => {
    getAsyncData.mockReturnValueOnce(Promise.reject());
    console.log = jest.fn();

    await act(async () => {
      tree = create(
        <HistoryContextProvider favIdArray={[]}>
          <FavouritesScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(console.log).toHaveBeenCalled();
    expect(tree).toMatchSnapshot();
  });

  describe('favouritesScreenOptions', () => {
    test('options', () => {
      const options = favouritesScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = favouritesScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
