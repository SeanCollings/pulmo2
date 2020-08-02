import { cleanup } from 'react-native-testing-library';
import fixtures from '../__fixtures__/index.fixtures';
import { getAsyncData } from '../../helpers/storage';
import loadActivityIdArrayAsync from '.';

jest.mock('../../helpers/storage');

const activityArrayResponse = [
  '2020-07-24T18:54:54.394Z',
  '2020-07-25T22:13:46.325Z',
  '2020-07-21T18:44:08.746Z',
  '2020-07-26T15:15:43.411Z',
  '2020-07-25T21:01:57.038Z',
  '2020-06-28T15:21:10.765Z',
  '2020-07-23T19:15:25.418Z',
  '2020-06-28T11:56:56.303Z',
  '2020-07-13T16:07:55.691Z',
];

describe('loadActivityIdArrayAsync - unit test', () => {
  afterEach(cleanup);

  test('should return user activities array in descending date order', async () => {
    getAsyncData.mockReturnValueOnce(activityArrayResponse);

    const result = await loadActivityIdArrayAsync();
    expect(result).toEqual(fixtures.activityIdArray);
  });

  test('should return an empty array if no activityIdArray saved', async () => {
    getAsyncData.mockReturnValueOnce(null);

    const result = await loadActivityIdArrayAsync();
    expect(result).toEqual([]);
  });

  describe('error', () => {
    test('should throw an error', async () => {
      try {
        getAsyncData.mockReturnValueOnce({ error: 'error' });
        await loadActivityIdArrayAsync();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
