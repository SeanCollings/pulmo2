import { AsyncStorage } from 'react-native';
import { APP_ID } from '../constants/constants';

export const getAsyncData = async (id) => {
  try {
    const value = await AsyncStorage.getItem(`${APP_ID}${id}`);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Failure retrieving ${id} with error: ${error}`);
  }
};

export const getMultiAsyncData = async (id, keys) => {
  try {
    const formattedKeys = keys.map((key) => `${APP_ID}${id}${key}`);
    const values = await AsyncStorage.multiGet(formattedKeys);

    if (values && !!values.length) return values;
    else {
      return null;
    }
  } catch (error) {
    throw new Error(`Failure retrieving from all keys with error: ${error}`);
  }
};

export const storeAsyncData = async (id, value) => {
  try {
    await AsyncStorage.setItem(`${APP_ID}${id}`, JSON.stringify(value));
    return true;
  } catch (error) {
    throw new Error('Failure saving: ' + error);
  }
};

export const mergeAsyncData = async (id, value) => {
  try {
    await AsyncStorage.mergeItem(`${APP_ID}${id}`, JSON.stringify(value));
    return true;
  } catch (error) {
    throw new Error('Failure merging: ' + error);
  }
};

export const removeAsyncData = async (id) => {
  try {
    await AsyncStorage.removeItem(`${APP_ID}${id}`);
    return true;
  } catch (error) {
    throw new Error('Failure removing: ' + error);
  }
};
