import React, { useState, createContext } from 'react';

import { storeAsyncData } from '../helpers/storage';
import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';
import { isDateYesterday, datesSameDay } from '../utils';

export const SELECTED_LEVEL = 'selected_level';
export const STREAK = 'streak';
export const PROFILE_KEYS = [SELECTED_LEVEL, STREAK];

export const STREAK_CURRENT = 'current';
export const STREAK_LAST_ACTIVITY = 'lastActivity';
export const STREAK_DEFAULT = {
  [STREAK_CURRENT]: 0,
  [STREAK_LAST_ACTIVITY]: '',
};

const DEFAULT_PROFILE = {
  [SELECTED_LEVEL]: TOTAL_DIFFICULTY_LEVELS,
  [STREAK]: STREAK_DEFAULT,
};

export const ProfileContext = createContext({
  profileContext: {},
  updateProfileContext: () => {},
  updateCurrentStreak: () => {},
});

const setProfile = (profile) => {
  return { ...DEFAULT_PROFILE, ...profile };
};

export default ({ profile, children }) => {
  const [profileContext, setProfileContext] = useState(setProfile(profile));

  const updateCurrentStreak = (date) => {
    try {
      const updatedStreakObj = { ...profileContext[STREAK] };
      const currentStreak = updatedStreakObj[STREAK_CURRENT];
      const lastActivity = updatedStreakObj[STREAK_LAST_ACTIVITY];

      updatedStreakObj[STREAK_LAST_ACTIVITY] = date;

      if (currentStreak === 0) {
        updatedStreakObj[STREAK_CURRENT] = 1;
      } else if (!datesSameDay(lastActivity, date)) {
        if (isDateYesterday(lastActivity)) {
          updatedStreakObj[STREAK_CURRENT] = currentStreak + 1;
        } else {
          updatedStreakObj[STREAK_CURRENT] = 0;
        }
      }

      setProfileContext({ ...profileContext, [STREAK]: updatedStreakObj });
      storeAsyncData(STREAK, updatedStreakObj);
    } catch (err) {
      console.log(err);
    }
  };

  const updateProfileContext = (key, value) => {
    try {
      setProfileContext({ ...profileContext, [key]: value });
      storeAsyncData(key, value);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{ profileContext, updateProfileContext, updateCurrentStreak }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
