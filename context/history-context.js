import React, { createContext, useState } from 'react';

import {
  getAsyncData,
  storeAsyncData,
  getMultiAsyncData,
  removeAsyncData,
  mergeAsyncData,
} from '../helpers/storage';

export const ACTIVITY_TAG = 'activity';

export const HistoryContext = createContext({
  activities: [],
  addActivity: () => {},
  deleteActivity: () => {},
  getSavedActivites: () => {},
  favouriteActivity: () => {},
});

export default ({ idArray, children }) => {
  const [activityIdArray, setActivityIdArray] = useState(idArray);
  const [activities, setActivities] = useState([]);

  const addActivity = async (date, excercise, level, results, type) => {
    try {
      const newActivity = { date, excercise, level, results, type };
      setActivities((curr) => [...curr, newActivity]);
      let success = false;
      const getActivityIdArray = await getAsyncData(ACTIVITY_TAG);

      if (getActivityIdArray && !!getActivityIdArray.length) {
        const newIdArray = [...getActivityIdArray, date];
        success = await storeAsyncData(ACTIVITY_TAG, newIdArray);
      } else {
        success = await storeAsyncData(ACTIVITY_TAG, [date]);
      }

      if (success) storeAsyncData(date, newActivity);
    } catch (err) {
      console.log(err);
    }
  };

  const favouriteActivity = async (date) => {
    try {
      const updatedActivities = [...activities];
      const foundIndex = updatedActivities.findIndex(
        (activity) => activity.date === date
      );

      if (foundIndex >= 0) {
        const foundActivity = updatedActivities[foundIndex];
        updatedActivities[foundIndex] = {
          ...updatedActivities[foundIndex],
          favourite: !foundActivity.favourite,
        };

        setActivities(updatedActivities);
        await mergeAsyncData(date, { favourite: !foundActivity.favourite });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteActivity = (date) => {
    try {
      const updatedActivies = activities.filter(
        (activity) => activity.date !== date
      );

      setActivities(updatedActivies);
      removeAsyncData(date);
    } catch (err) {
      console.log(err);
    }
  };

  const getSavedActivites = async () => {
    try {
      let getActivityIdArray = activityIdArray;

      if (
        !getActivityIdArray ||
        (getActivityIdArray && !getActivityIdArray.length)
      ) {
        getActivityIdArray = await getAsyncData(ACTIVITY_TAG);
      }

      if (getActivityIdArray) {
        const savedActivities = await getMultiAsyncData('', getActivityIdArray);

        const formattedActivities = savedActivities.reduce((acc, array) => {
          if (array[1]) return [...acc, JSON.parse(array[1])];
          else return acc;
        }, []);

        const sortedActivites = formattedActivities.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );

        setActivities(sortedActivites);
        return Promise.resolve();
      }
    } catch (err) {
      console.log(err);
      return Promise.reject();
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        activities,
        getSavedActivites,
        addActivity,
        deleteActivity,
        setActivityIdArray,
        favouriteActivity,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
