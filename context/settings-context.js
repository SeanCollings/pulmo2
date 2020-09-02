import React, { useState, createContext } from 'react';

import { storeAsyncData } from '../helpers/storage';
import { LIGHT_MODE } from '../constants/constants';

export const THEME = 'theme';
export const SETTINGS_KEYS = [THEME];

const DEFAULT_SETTINGS = {
  [THEME]: LIGHT_MODE,
};

export const SettingsContext = createContext({
  settingsContext: {},
  updateSettingsContext: () => {},
});

const setSettings = (settings) => {
  return {
    ...DEFAULT_SETTINGS,
    ...settings,
  };
};

export default ({ settings, children }) => {
  const [settingsContext, setSettingsContext] = useState(setSettings(settings));

  const updateSettingsContext = (key, value) => {
    try {
      setSettingsContext({ ...settingsContext, [key]: value });
      storeAsyncData(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SettingsContext.Provider
      value={{ settingsContext, updateSettingsContext }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
