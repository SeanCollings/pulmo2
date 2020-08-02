import {
  getAsyncData,
  getMultiAsyncData,
  storeAsyncData,
  mergeAsyncData,
  removeAsyncData,
} from '../storage';
import { cleanup } from 'react-native-testing-library';
import { AsyncStorage } from 'react-native';

jest.mock('react-native', () => ({
  AsyncStorage: {
    getItem: jest.fn(),
    multiGet: jest.fn(),
    removeItem: jest.fn(),
    setItem: jest.fn(),
    mergeItem: jest.fn(),
  },
}));

describe('storage', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  describe('getAsyncData', () => {
    test('should return JSON parsed value', async () => {
      AsyncStorage.getItem.mockImplementation(() =>
        JSON.stringify({ test: 'data' })
      );

      const expected = { test: 'data' };

      const result = await getAsyncData(1);
      expect(result).toEqual(expected);
    });

    test('should return null if nothing is found', async () => {
      AsyncStorage.getItem.mockImplementation(() => null);
      const result = await getAsyncData(1);
      expect(result).toEqual(null);
    });

    test('should handle errors', async () => {
      try {
        AsyncStorage.getItem.mockImplementation(() => 'error');
        await getAsyncData(1);
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });

  describe('getMultiAsyncData', () => {
    const expected = [
      [
        '@Plumo2:@Custom:1591534063257',
        '{"title":"Many rounds","cycles":"12","rest":"1","rounds":"14","id":1591534063257}',
      ],
      ['@Plumo2:@Custom:1591542339727', null],
      [
        '@Plumo2:@Custom:1595776234187',
        '{"title":"Test Excercise","cycles":"10","rest":"5","rounds":"2","id":1595776234187}',
      ],
    ];

    test('should return a value array', async () => {
      AsyncStorage.multiGet.mockImplementation(() => expected);
      const result = await getMultiAsyncData('@Custom', [
        '1591534063257',
        '1591542339727',
        '1595776234187',
      ]);

      expect(result).toEqual(expected);
    });

    test('should return null if nothing is found', async () => {
      AsyncStorage.multiGet.mockImplementation(() => null);
      const result = await getMultiAsyncData('@Custom', []);
      expect(result).toEqual(null);
    });

    test('should throw an error if keys is not an array', async () => {
      try {
        AsyncStorage.multiGet.mockImplementation(() => 'error');
        await getMultiAsyncData('', 'error');
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });

    test('should handle get async errors', async () => {
      try {
        AsyncStorage.multiGet.mockImplementation(() => 'error');
        await getMultiAsyncData('', []);
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });

  describe('storeAsyncData', () => {
    test('should return true if successful', async () => {
      AsyncStorage.setItem.mockImplementation(() => Promise.resolve());
      const result = await storeAsyncData();

      expect(result).toBeTruthy();
    });

    test('should handle errors', async () => {
      try {
        AsyncStorage.setItem.mockImplementation(() => Promise.reject());
        await storeAsyncData();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });

  describe('mergeAsyncData', () => {
    test('should return true if successful', async () => {
      AsyncStorage.mergeItem.mockImplementation(() => Promise.resolve());
      const result = await mergeAsyncData();

      expect(result).toBeTruthy();
    });

    test('should handle errors', async () => {
      try {
        AsyncStorage.mergeItem.mockImplementation(() => Promise.reject());
        await mergeAsyncData();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });

  describe('removeAsyncData', () => {
    test('should return true if successful', async () => {
      AsyncStorage.removeItem.mockImplementation(() => Promise.resolve());
      const result = await removeAsyncData();

      expect(result).toBeTruthy();
    });

    test('should handle errors', async () => {
      try {
        AsyncStorage.removeItem.mockImplementation(() => Promise.reject());
        await removeAsyncData();
      } catch (err) {
        expect(err.name).toEqual('Error');
      }
    });
  });
});
