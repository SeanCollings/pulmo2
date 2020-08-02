import { cleanup } from 'react-native-testing-library';
import fixtures from '../__fixtures__/index.fixtures';
import { getAsyncData } from '../../helpers/storage';
import loadFavActivityIdArrayAsync from '.';

jest.mock('../../helpers/storage');

const favActivityArrayResponse = [
  '2020-07-13T16:07:55.691Z',
  '2020-07-25T21:01:57.038Z',
];

describe('loadFavActivityIdArrayAsync - unit test', () => {
  afterEach(cleanup);

  test('should return user favourite activities array in descending date order', async () => {
    getAsyncData.mockReturnValueOnce(favActivityArrayResponse);

    const result = await loadFavActivityIdArrayAsync();
    expect(result).toEqual(fixtures.favActivityIdArray);
  });

  test('should return an empty array if no favActivityIdArray saved', async () => {
    getAsyncData.mockReturnValueOnce(null);

    const result = await loadFavActivityIdArrayAsync();
    expect(result).toEqual([]);
  });

  describe('error', () => {
    test('should throw an error', async () => {
      try {
        getAsyncData.mockReturnValueOnce({ error: 'error' });
        await loadFavActivityIdArrayAsync();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
