import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import CalendarScreen, { calendarScreenOptions } from '../CalendarScreen';
import HistoryContextProvider from '../../../context/history-context';
import fixtures from '../__fixtures__/index.fixtures';
import { getMultiAsyncData } from '../../../helpers/storage';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');
jest.mock('../../../helpers/storage');

describe('CalendarScreen - unit test', () => {
  let tree;
  const navigation = {};

  beforeAll(() => {
    dateNowSpy = jest
      .spyOn(Date, 'now')
      .mockImplementation(() => 1593216000000); // '2020-06-27'
  });

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render an empty month if there are no activity IDs for the month', async () => {
    await act(async () => {
      tree = create(
        <HistoryContextProvider idArray={[]}>
          <CalendarScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should render an empty month if there are no activities saved for the found IDs for the month', async () => {
    getMultiAsyncData.mockReturnValueOnce(null);

    await act(async () => {
      tree = create(
        <HistoryContextProvider idArray={fixtures.activityIdArray}>
          <CalendarScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should render all activities found in a month if present', async () => {
    getMultiAsyncData.mockReturnValueOnce(fixtures.activities);

    await act(async () => {
      tree = create(
        <HistoryContextProvider idArray={fixtures.activityIdArray}>
          <CalendarScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  test('should show a maximum amount of activities per day', async () => {
    getMultiAsyncData.mockReturnValueOnce(fixtures.multipleActivitiesOneDay);

    await act(async () => {
      tree = create(
        <HistoryContextProvider idArray={fixtures.activityIdArray}>
          <CalendarScreen navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  describe('calendarScreenOptions', () => {
    test('options', () => {
      const options = calendarScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = calendarScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
