import React, { useState, createContext, useEffect } from 'react';

import { storeAsyncData } from '../helpers/storage';
import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';

export const SELECTED_LEVEL = 'selected_level';
export const PROFILE_KEYS = [SELECTED_LEVEL];

const DEFAULT_PROFILE = {
  [SELECTED_LEVEL]: TOTAL_DIFFICULTY_LEVELS,
};

export const ProfileContext = createContext({
  profileContext: {},
  updateProfileContext: () => {},
});

export default ({ profile, children }) => {
  const [profileContext, setProfileContext] = useState(profile);

  const updateProfileContext = (key, value) => {
    try {
      setProfileContext({ ...profileContext, [key]: value });
      storeAsyncData(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getDefaultOrSavedProfile = { ...DEFAULT_PROFILE, ...profileContext };
    setProfileContext(getDefaultOrSavedProfile);
  }, []);

  return (
    <ProfileContext.Provider value={{ profileContext, updateProfileContext }}>
      {children}
    </ProfileContext.Provider>
  );
};
