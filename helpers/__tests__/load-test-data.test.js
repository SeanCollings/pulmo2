import { cleanup } from 'react-native-testing-library';

import loadTestData, {
  MESSAGE_UNKNOWN,
  MESSAGE_PRE_SAVED,
  MESSAGE_DONE,
} from '../load-test-data';
import { getAsyncData, storeAsyncData } from '../storage';

jest.mock('../storage');

describe('Load test data - unit test', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test(`should return ${MESSAGE_UNKNOWN} if no title is passed through`, async () => {
    const result = await loadTestData();
    expect(result).toEqual(MESSAGE_UNKNOWN);
  });

  test(`should return ${MESSAGE_UNKNOWN} if a title that cant be found is passed through`, async () => {
    const result = await loadTestData('unknown');
    expect(result).toEqual(MESSAGE_UNKNOWN);
  });

  test(`should return ${MESSAGE_PRE_SAVED} if data already saved and it has single data entry`, async () => {
    getAsyncData.mockReturnValueOnce(2);

    const result = await loadTestData('Profile');
    expect(result).toEqual(MESSAGE_PRE_SAVED);
  });

  test(`should return ${MESSAGE_DONE} if data successfully saved and it has single data entry`, async () => {
    console.log = jest.fn();
    getAsyncData.mockReturnValue(null);
    storeAsyncData.mockReturnValueOnce();

    const result = await loadTestData('Profile');
    expect(result).toEqual(MESSAGE_DONE);
  });

  test(`should return ${MESSAGE_PRE_SAVED} if data already saved and it has mutliple data entries`, async () => {
    getAsyncData.mockReturnValue({});

    const result = await loadTestData('Custom Excercises');
    expect(result).toEqual(MESSAGE_PRE_SAVED);
  });

  test(`should return a success message if data successfully saved and it has mutliple data entries`, async () => {
    console.log = jest.fn();
    getAsyncData.mockReturnValue(null);
    storeAsyncData.mockReturnValue();

    const result = await loadTestData('Custom Excercises');
    expect(result).toEqual(`${MESSAGE_DONE} [2]`);
  });

  describe('error', () => {
    test('should throw an error', async () => {
      try {
        getAsyncData.mockReturnValueOnce(Promise.reject(new Error()));
        await loadTestData('Profile');
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
