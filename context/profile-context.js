import React, { useState, createContext, useEffect } from 'react';

import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';
import { getAsyncData, storeAsyncData } from '../helpers/storage';

export const SELECTED_LEVEL = 'selected_level';

export const ProfileContext = createContext({
  profileContext: {},
  updateProfileContext: () => {},
});

export default (props) => {
  const [profileContext, setProfileContext] = useState({
    [SELECTED_LEVEL]: TOTAL_DIFFICULTY_LEVELS,
  });

  const updateProfileContext = (key, value) => {
    try {
      setProfileContext({ ...profileContext, [key]: value });
      storeAsyncData(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedLevel = async () => {
    const savedSelectedLevel = await getAsyncData(SELECTED_LEVEL);
    if (savedSelectedLevel) {
      updateProfileContext(SELECTED_LEVEL, savedSelectedLevel);
    }
  };

  useEffect(() => {
    getSelectedLevel();
  }, []);

  return (
    <ProfileContext.Provider value={{ profileContext, updateProfileContext }}>
      {props.children}
    </ProfileContext.Provider>
  );
};
