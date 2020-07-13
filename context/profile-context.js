import React, { useState, createContext } from 'react';

import { storeAsyncData } from '../helpers/storage';
import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';
import { isDateYesterday, datesSameDay } from '../utils';

export const SELECTED_LEVEL = 'selected_level';
export const STREAK = 'streak';
export const DISCLAIMER = 'disclaimer';
export const PROFILE_KEYS = [SELECTED_LEVEL, STREAK, DISCLAIMER];

export const STREAK_CURRENT = 'current';
export const STREAK_LAST_ACTIVITY = 'lastActivity';
export const STREAK_SHOW = 'streak_show';
export const STREAK_DEFAULT = {
  [STREAK_CURRENT]: 0,
  [STREAK_LAST_ACTIVITY]: '',
  [STREAK_SHOW]: true,
};

export const DISCLAIMER_SHOW = 'disclaimer_show';
export const DISCLAIMER_DONT_SHOW_AGAIN = 'dont_show_again';
export const DISCLAIMER_DEFAULT = {
  [DISCLAIMER_SHOW]: false,
  [DISCLAIMER_DONT_SHOW_AGAIN]: true,
};

const DEFAULT_PROFILE = {
  [SELECTED_LEVEL]: TOTAL_DIFFICULTY_LEVELS,
  [STREAK]: STREAK_DEFAULT,
  [DISCLAIMER]: DISCLAIMER_DEFAULT,
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
