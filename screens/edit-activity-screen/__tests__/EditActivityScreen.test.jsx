import React from 'react';
import { act, create } from 'react-test-renderer';
import { cleanup } from 'react-native-testing-library';
import EditActivityScreen, {
  editActivityScreenOptions,
} from '../EditActivityScreen';
import HistoryContextProvider from '../../../context/history-context';
import { OPTION_OUT_OF_BREATH } from '../../../constants/constants';

jest.useFakeTimers();
jest.mock('react-native/Libraries/Animated/src/NativeAnimatedHelper');

describe('EditActivityScreen - unit test', () => {
  let tree;
  const navigation = { goBack: () => {} };
  const route = {
    params: {
      editActivity: {
        date: '2020-07-26T15:15:43.411Z',
        level: 4,
        rating: 2,
        reason: [OPTION_OUT_OF_BREATH.value],
        title: 'Custom Excercise',
      },
    },
  };

  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('should render', async () => {
    await act(async () => {
      tree = create(
        <HistoryContextProvider>
          <EditActivityScreen route={route} navigation={navigation} />
        </HistoryContextProvider>
      );
    });

    expect(tree).toMatchSnapshot();
  });

  describe('editActivityScreenOptions', () => {
    test('options', () => {
      const options = editActivityScreenOptions();
      expect(options).toMatchSnapshot();
    });

    test('headerTitle', () => {
      const headerTitle = editActivityScreenOptions().headerTitle({
        tintColor: 'white',
      });
      expect(headerTitle).toMatchSnapshot();
    });
  });
});
