import { cleanup } from 'react-native-testing-library';
import fixtures from '../__fixtures__/index.fixtures';
import { getAsyncData, getMultiAsyncData } from '../../helpers/storage';
import loadCustomExcercisesAsync from '.';

jest.mock('../../helpers/storage');

const customIdArrayResponse = [12345, 2345];
const savedCustomExcercisesResponse = [
  [
    '@Plumo2:@Custom:12345',
    '{"title":"My Custom Workout","cycles":"12","rest":"5","rounds":"2","id":12345}',
  ],
  [
    '@Plumo2:@Custom:2345',
    '{"title":"My bestercise","cycles":"30","rest":"2","rounds":"5","id":2345}',
  ],
];
const customExcercisesMissing = [
  [
    '@Plumo2:@Custom:12345',
    '{"title":"My Custom Workout","cycles":"12","rest":"5","rounds":"2","id":12345}',
  ],
  ['@Plumo2:@Custom:1591542339727', null],
  [
    '@Plumo2:@Custom:2345',
    '{"title":"My bestercise","cycles":"30","rest":"2","rounds":"5","id":2345}',
  ],
  ['@Plumo2:@Custom:1591467070266', null],
];

describe('loadCustomExcercisesAsync - unit test', () => {
  afterEach(cleanup);

  test('should return user activities array in descending date order', async () => {
    getAsyncData.mockReturnValueOnce(customIdArrayResponse);
    getMultiAsyncData.mockReturnValueOnce(savedCustomExcercisesResponse);

    const result = await loadCustomExcercisesAsync();
    expect(result).toEqual(fixtures.customExcercise);
  });

  test('should remove custom exercises without a value', async () => {
    getAsyncData.mockReturnValueOnce(customIdArrayResponse);
    getMultiAsyncData.mockReturnValueOnce(customExcercisesMissing);

    const result = await loadCustomExcercisesAsync();
    expect(result).toEqual(fixtures.customExcercise);
  });

  test('should return an empty array if customIdArray is saved', async () => {
    getAsyncData.mockReturnValueOnce(null);

    const result = await loadCustomExcercisesAsync();
    expect(result).toEqual([]);
  });

  describe('error', () => {
    test('should throw an error', async () => {
      try {
        getAsyncData.mockReturnValueOnce({ error: 'error' });
        await loadCustomExcercisesAsync();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
