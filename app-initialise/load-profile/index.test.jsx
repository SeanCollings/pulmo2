import { cleanup } from 'react-native-testing-library';
import fixtures from '../__fixtures__/index.fixtures';
import { getMultiAsyncData } from '../../helpers/storage';
import loadProfileAsync from '.';
import { isDateToday } from '../../utils';

jest.mock('../../helpers/storage');
jest.mock('../../utils');

const lastActivityDate = '2020-07-26T15:15:43.411Z';
const profileResponse = [
  ['@Plumo2:selected_level', '2'],
  ['@Plumo2:streak', `{"current":0,"lastActivity":"${lastActivityDate}"}`],
  ['@Plumo2:disclaimer', null],
];
const profileResponseSameDay = [
  ['@Plumo2:selected_level', '2'],
  ['@Plumo2:streak', `{"current":2,"lastActivity":"${lastActivityDate}"}`],
  ['@Plumo2:disclaimer', null],
];
const profileResponseMissing = [
  ['@Plumo2:selected_level', '2'],
  ['@Plumo2:streak', `{"current":0,"lastActivity":"${lastActivityDate}"}`],
  ['@Plumo2:disclaimer', null],
  ['', ''],
  ['missing_value', ''],
  ['', 'missing_key'],
];
const profileNoStreakResponse = [
  ['@Plumo2:selected_level', '2'],
  ['@Plumo2:disclaimer', null],
];

describe('loadProfileAsync - unit test', () => {
  afterEach(cleanup);

  test('should return user profile', async () => {
    getMultiAsyncData.mockReturnValueOnce(profileResponse);

    const result = await loadProfileAsync();
    expect(result).toEqual(fixtures.profile);
  });

  test('should remove profiles without a key or value', async () => {
    getMultiAsyncData.mockReturnValueOnce(profileResponseMissing);

    const result = await loadProfileAsync();
    expect(result).toEqual(fixtures.profile);
  });

  test('should not set streak to 0 if last activity date is same day', async () => {
    getMultiAsyncData.mockReturnValueOnce(profileResponseSameDay);
    isDateToday.mockReturnValueOnce(true);

    const result = await loadProfileAsync();
    expect(result).toMatchSnapshot();
  });

  test('should return null for profile streak if it is not defined', async () => {
    getMultiAsyncData.mockReturnValueOnce(profileNoStreakResponse);

    const result = await loadProfileAsync();
    expect(result).toMatchSnapshot();
  });

  describe('error', () => {
    test('should throw an error', async () => {
      try {
        getMultiAsyncData.mockReturnValueOnce({ error: 'error' });
        await loadProfileAsync();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
