import { AsyncStorage } from 'react-native';
import { APP_ID } from '../constants/constants';

export const clearAllAsyncStorage = () => {
  AsyncStorage.clear();
};

export const getAsyncData = async (id) => {
  try {
    const value = await AsyncStorage.getItem(`${APP_ID}${id}`);
    if (value !== null) {
      return JSON.parse(value);
    } else {
      return null;
    }
  } catch (error) {
    console.log('Failure retrieving ' + id + ' error: ' + error);
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
  } catch (err) {
    console.log('Failure retrieving from all keys with error ' + error);
  }
};

export const storeAsyncData = async (id, value) => {
  try {
    await AsyncStorage.setItem(`${APP_ID}${id}`, JSON.stringify(value));
    return true;
  } catch (error) {
    console.log('Failure saving: ' + error);
    return false;
  }
};

export const removeAsyncData = async (id) => {
  try {
    await AsyncStorage.removeItem(`${APP_ID}${id}`);
  } catch (err) {
    console.log('Failure removing: ' + error);
  }
};
