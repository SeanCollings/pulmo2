import React, { useState, createContext } from 'react';

import { storeAsyncData } from '../helpers/storage';
import { TOTAL_DIFFICULTY_LEVELS } from '../constants/constants';
import {
  isDateYesterday,
  datesSameDay,
  getWorkAverageDeviation,
  getTotalWorkRounds,
} from '../utils';

export const SELECTED_LEVEL = 'selected_level';
export const STREAK = 'streak';
export const DISCLAIMER = 'disclaimer';
export const WORK_AVERAGE_DEVIATION = 'work_average_deviation';
export const PROFILE_KEYS = [
  SELECTED_LEVEL,
  STREAK,
  DISCLAIMER,
  WORK_AVERAGE_DEVIATION,
];

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
  [DISCLAIMER_SHOW]: true,
  [DISCLAIMER_DONT_SHOW_AGAIN]: false,
};

export const WORK_AVE_DEV_CURRENT = 'current';
export const WORK_AVE_DEV_TOTAL_ACTIVITIES = 'total_activities';
export const WORK_AVE_DEV_IMPROVEMENT = 'improvement';
export const WORK_AVE_DEV_SAME = 'same';
export const WORK_AVE_DEV_UP = 'up';
export const WORK_AVE_DEV_DOWN = 'down';
export const WORK_AVE_DEV_DEFAULT = {
  [WORK_AVE_DEV_CURRENT]: 0,
  [WORK_AVE_DEV_TOTAL_ACTIVITIES]: 0,
  [WORK_AVE_DEV_IMPROVEMENT]: WORK_AVE_DEV_SAME,
};

const DEFAULT_PROFILE = {
  [SELECTED_LEVEL]: TOTAL_DIFFICULTY_LEVELS,
  [STREAK]: STREAK_DEFAULT,
  [DISCLAIMER]: DISCLAIMER_DEFAULT,
  [WORK_AVERAGE_DEVIATION]: WORK_AVE_DEV_DEFAULT,
};

export const ProfileContext = createContext({
  profileContext: {},
  updateProfileContext: () => {},
  updateCurrentStreak: () => {},
  updateWorkAverageDeviation: () => {},
});

const setProfile = (profile) => {
  return { ...DEFAULT_PROFILE, ...profile };
};

export default ({ profile, children }) => {
  const [profileContext, setProfileContext] = useState(setProfile(profile));

  const updateProfileContext = async (key, value) => {
    try {
      setProfileContext((curr) => ({ ...curr, [key]: value }));
      await storeAsyncData(key, value);
    } catch (err) {
      console.log(err);
    }
  };

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

      updateProfileContext(STREAK, updatedStreakObj);
    } catch (err) {
      console.log(err);
    }
  };

  const updateWorkAverageDeviation = (results, remove) => {
    try {
      if (getTotalWorkRounds(results) > 1) {
        const {
          [WORK_AVE_DEV_CURRENT]: currentWorkAverageDeviation,
          [WORK_AVE_DEV_TOTAL_ACTIVITIES]: currentTotalActivities,
        } = profileContext[WORK_AVERAGE_DEVIATION];

        const workAverageDeviationResults = +getWorkAverageDeviation(results);

        if (remove) {
          if (currentTotalActivities > 1) {
            const newTotalActivities = currentTotalActivities - 1;

            const newWorkAverageDeviation =
              (currentWorkAverageDeviation * currentTotalActivities -
                workAverageDeviationResults) /
              newTotalActivities;

            const updatedWorkAverageDeviation = {
              [WORK_AVE_DEV_CURRENT]: newWorkAverageDeviation,
              [WORK_AVE_DEV_TOTAL_ACTIVITIES]: newTotalActivities,
              [WORK_AVE_DEV_IMPROVEMENT]: WORK_AVE_DEV_SAME,
            };

            updateProfileContext(
              WORK_AVERAGE_DEVIATION,
              updatedWorkAverageDeviation
            );
          } else {
            updateProfileContext(WORK_AVERAGE_DEVIATION, WORK_AVE_DEV_DEFAULT);
          }
        } else {
          let improvement = WORK_AVE_DEV_SAME;
          const newTotalActivities = currentTotalActivities + 1;

          if (currentWorkAverageDeviation > workAverageDeviationResults)
            improvement = WORK_AVE_DEV_DOWN;
          else if (currentWorkAverageDeviation < workAverageDeviationResults)
            improvement = WORK_AVE_DEV_UP;

          const newWorkAverageDeviation =
            (currentWorkAverageDeviation * currentTotalActivities +
              workAverageDeviationResults) /
            newTotalActivities;

          const updatedWorkAverageDeviation = {
            [WORK_AVE_DEV_CURRENT]: newWorkAverageDeviation,
            [WORK_AVE_DEV_TOTAL_ACTIVITIES]: newTotalActivities,
            [WORK_AVE_DEV_IMPROVEMENT]: improvement,
          };

          updateProfileContext(
            WORK_AVERAGE_DEVIATION,
            updatedWorkAverageDeviation
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ProfileContext.Provider
      value={{
        profileContext,
        updateProfileContext,
        updateCurrentStreak,
        updateWorkAverageDeviation,
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
