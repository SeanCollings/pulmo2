import { getMultiAsyncData } from '../../helpers/storage';
import { SETTINGS_KEYS } from '../../context/settings-context';
import { APP_ID } from '../../constants/constants';

const loadSettingsAsync = async () => {
  try {
    const settingsValues = await getMultiAsyncData('', SETTINGS_KEYS);

    const formattedSettings = settingsValues.reduce((acc, array) => {
      const key = array[0];
      const value = array[1];

      if (key && key.includes(APP_ID) && value) {
        const formattedKey = key.split(APP_ID)[1];
        return { ...acc, [formattedKey]: JSON.parse(value) };
      } else return acc;
    }, {});

    return Promise.resolve(formattedSettings);
  } catch (err) {
    throw new Error(err);
  }
};

export default loadSettingsAsync;
