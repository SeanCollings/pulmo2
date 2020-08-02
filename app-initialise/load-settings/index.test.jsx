import { cleanup } from 'react-native-testing-library';
import fixtures from '../__fixtures__/index.fixtures';
import { getMultiAsyncData } from '../../helpers/storage';
import loadSettingsAsync from '.';

jest.mock('../../helpers/storage');

const settingsResponse = [['@Plumo2:theme', '"dark_mode"']];
const settingsResponseMissing = [
  ['@Plumo2:theme', '"dark_mode"'],
  ['', 'missing_key'],
  ['missing_value', ''],
  ['', ''],
];

describe('loadSettingsAsync - unit test', () => {
  afterEach(cleanup);

  test('should return user settings', async () => {
    getMultiAsyncData.mockReturnValueOnce(settingsResponse);

    const result = await loadSettingsAsync();
    expect(result).toEqual(fixtures.settings);
  });

  test('should remove settings without a key or value', async () => {
    getMultiAsyncData.mockReturnValueOnce(settingsResponseMissing);

    const result = await loadSettingsAsync();
    expect(result).toEqual(fixtures.settings);
  });

  describe('error', () => {
    test('should throw an error', async () => {
      try {
        getMultiAsyncData.mockReturnValueOnce({ error: 'error' });
        await loadSettingsAsync();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
