import { getMultiAsyncData } from '../../helpers/storage';
import {
  PROFILE_KEYS,
  STREAK,
  STREAK_LAST_ACTIVITY,
  STREAK_CURRENT,
} from '../../context/profile-context';
import { isDateToday, isDateYesterday } from '../../utils';
import { APP_ID } from '../../constants/constants';

const getCurrentStreak = (profile) => {
  if (profile[STREAK]) {
    const currentStreak = { ...profile[STREAK] };
    const lastActivity = currentStreak[STREAK_LAST_ACTIVITY];

    if (!isDateToday(lastActivity) && !isDateYesterday(lastActivity)) {
      currentStreak[STREAK_CURRENT] = 0;
    }

    return currentStreak;
  } else {
    return null;
  }
};

const loadProfileAsync = async () => {
  try {
    const profileValues = await getMultiAsyncData('', PROFILE_KEYS);
    const formattedProfile = profileValues.reduce((acc, array) => {
      const key = array[0];
      const value = array[1];

      if (key && key.includes(APP_ID) && value) {
        const formattedKey = key.split(APP_ID)[1];
        return { ...acc, [formattedKey]: JSON.parse(value) };
      } else return acc;
    }, {});

    const currentSteak = getCurrentStreak(formattedProfile);

    return Promise.resolve({
      ...formattedProfile,
      ...(currentSteak && { [STREAK]: currentSteak }),
    });
  } catch (err) {
    throw new Error(err);
  }
};

export default loadProfileAsync;
