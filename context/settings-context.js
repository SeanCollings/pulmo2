import React, { useState, createContext, useEffect } from 'react';

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

export default ({ settings, children }) => {
  const [settingsContext, setSettingsContext] = useState(settings);

  const updateSettingsContext = (key, value) => {
    try {
      setSettingsContext({ ...settingsContext, [key]: value });
      storeAsyncData(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getDefaultOrSavedSettings = {
      ...DEFAULT_SETTINGS,
      ...settingsContext,
    };

    setSettingsContext(getDefaultOrSavedSettings);
  }, []);

  return (
    <SettingsContext.Provider
      value={{ settingsContext, updateSettingsContext }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
