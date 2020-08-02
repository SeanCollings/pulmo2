import React, { createContext, useState, useContext } from 'react';

import {
  getAsyncData,
  storeAsyncData,
  getMultiAsyncData,
  removeAsyncData,
  mergeAsyncData,
} from '../helpers/storage';
import { ProfileContext } from './profile-context';

export const LOAD_ACTIVITIES = 20;

export const ACTIVITY_TAG = 'activity';
export const FAV_ACTIVITY_TAG = 'fav_activity';
export const ACTIVITY_UPDATE = 'activity_update';
export const ACTIVITY_DELETE = 'activity_delete';
export const ACTIVITY_NEW = 'activity_new';
export const ACTIVITY_UNFAVOURITE = 'activity_unfavourite';

export const HistoryContext = createContext({
  addActivity: () => {},
  deleteActivity: () => {},
  favouriteActivity: () => {},
  getActivitiesByMonth: () => {},
  getActivityByDate: () => {},
  updateActivity: () => {},
  getFavActiviesBySlice: () => {},
  getSavedActivitiesBySlice: () => {},
  updatedActivity: null,
});

export default ({ idArray, favIdArray, children }) => {
  const { updateCurrentStreak } = useContext(ProfileContext);
  const [activityIdArray, setActivityIdArray] = useState(idArray);
  const [favActivityIdArray, setFavActivityIdArray] = useState(favIdArray);
  const [updatedActivity, setUpdatedActivity] = useState(null);

  const addActivity = async ({
    date,
    excercise,
    level,
    results,
    type,
    incomplete,
  }) => {
    try {
      let success = false;
      let newActivity = { date, excercise, level, results, type };

      if (incomplete) {
        newActivity = { ...newActivity, incomplete };
      }

      if (activityIdArray && !!activityIdArray.length) {
        const newIdArray = [date, ...activityIdArray];
        success = await storeAsyncData(ACTIVITY_TAG, newIdArray);
        setActivityIdArray(newIdArray);
      } else {
        success = await storeAsyncData(ACTIVITY_TAG, [date]);
        setActivityIdArray([date]);
      }

      if (success) {
        storeAsyncData(date, newActivity);
        updateCurrentStreak(date);
        setUpdatedActivity({
          type: ACTIVITY_NEW,
          activity: newActivity,
          date,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const updateActivity = async ({
    date,
    newRating,
    newLevel,
    newTitle,
    newReason,
  }) => {
    try {
      const savedActivity = await getAsyncData(date);
      const updatedActivity = {
        level: newLevel,
        incomplete: newReason,
        rating: newRating,
        excercise: { ...savedActivity.excercise, title: newTitle },
      };
      const newUpdatedActivity = {
        ...savedActivity,
        ...updatedActivity,
      };

      await mergeAsyncData(date, updatedActivity);
      setUpdatedActivity({
        type: ACTIVITY_UPDATE,
        activity: newUpdatedActivity,
        date,
      });

      return true;
    } catch (err) {
      return false;
    }
  };

  const favouriteActivity = async (date, activity) => {
    try {
      let newFavActivityIdArray = [...favActivityIdArray];

      const index = newFavActivityIdArray.indexOf(date);
      if (index > -1) {
        newFavActivityIdArray.splice(index, 1);
      } else {
        newFavActivityIdArray.push(date);
      }

      const updatedActivity = {
        ...activity,
        favourite: !activity.favourite,
      };

      await Promise.all([
        storeAsyncData(FAV_ACTIVITY_TAG, newFavActivityIdArray),
        mergeAsyncData(date, updatedActivity),
      ]);

      setFavActivityIdArray(newFavActivityIdArray);
      setUpdatedActivity({
        type: ACTIVITY_UNFAVOURITE,
        date,
        activity: updatedActivity,
      });

      return true;
    } catch (err) {
      console.log(err);
    }
  };

  const getActivitiesByMonth = async (month) => {
    try {
      const activitiesToLoadByMonth = activityIdArray.filter((activity) =>
        activity.includes(month)
      );

      if (!activitiesToLoadByMonth.length) return [];

      const savedActivities = await getMultiAsyncData(
        '',
        activitiesToLoadByMonth
      );

      if (!savedActivities) return [];

      const formattedActivities = savedActivities
        .reduce((acc, array) => {
          if (array[1]) return [...acc, JSON.parse(array[1])];
          else return acc;
        }, [])
        .map((activity) => ({
          date: activity.date,
          type: activity.type,
          day: new Date(activity.date).getDate(),
          title: activity.excercise.title,
          favourite: activity.favourite,
        }));

      return formattedActivities;
    } catch (err) {
      console.log(err);
    }
  };

  const getActivityByDate = async (date) => {
    try {
      const activity = await getAsyncData(date);
      return activity || {};
    } catch (err) {
      console.log(err);
      return {};
    }
  };

  const deleteActivity = async (date) => {
    try {
      const updatedIdArray = activityIdArray.filter((id) => id !== date);

      setActivityIdArray(updatedIdArray);
      removeAsyncData(date);
      storeAsyncData(ACTIVITY_TAG, updatedIdArray);
      setUpdatedActivity({
        type: ACTIVITY_DELETE,
        date,
      });

      return true;
    } catch (err) {
      console.log(err);
      return false;
    }
  };

  const getFavActiviesBySlice = async (slice) => {
    try {
      let getFavActivityIdArray = [...favActivityIdArray];
      if (
        !getFavActivityIdArray ||
        (getFavActivityIdArray && !getFavActivityIdArray.length)
      ) {
        getFavActivityIdArray = await getAsyncData(FAV_ACTIVITY_TAG);
      }

      if (getFavActivityIdArray && !!getFavActivityIdArray.length) {
        const sortedFavouritedActivites = getFavActivityIdArray.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        const toLoadActivities = sortedFavouritedActivites.slice(
          slice * LOAD_ACTIVITIES,
          (slice + 1) * LOAD_ACTIVITIES
        );

        const favActivities = await getMultiAsyncData('', toLoadActivities);
        if (!favActivities) return [];

        const formattedActivities = favActivities.reduce((acc, array) => {
          if (array[1]) return [...acc, JSON.parse(array[1])];
          else return acc;
        }, []);

        const sortedActivites = formattedActivities.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        return sortedActivites;
      }

      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  const getSavedActivitiesBySlice = async (slice) => {
    try {
      let getActivityIdArray = [...activityIdArray];
      if (
        !getActivityIdArray ||
        (getActivityIdArray && !getActivityIdArray.length)
      ) {
        getActivityIdArray = await getAsyncData(ACTIVITY_TAG);
      }

      if (getActivityIdArray) {
        const toLoadActivities = getActivityIdArray.slice(
          slice * LOAD_ACTIVITIES,
          (slice + 1) * LOAD_ACTIVITIES
        );

        const savedActivities = await getMultiAsyncData('', toLoadActivities);
        if (!savedActivities) return [];

        const formattedActivities = savedActivities.reduce((acc, array) => {
          if (array[1]) return [...acc, JSON.parse(array[1])];
          else return acc;
        }, []);

        const sortedActivites = formattedActivities.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        return sortedActivites;
      }

      return [];
    } catch (err) {
      console.log(err);
      return [];
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        addActivity,
        deleteActivity,
        favouriteActivity,
        getActivitiesByMonth,
        getActivityByDate,
        updateActivity,
        getSavedActivitiesBySlice,
        getFavActiviesBySlice,
        updatedActivity,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
