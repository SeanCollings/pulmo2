import React, { createContext, useState, useEffect } from 'react';

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
  getActivitiesByMonth: () => {},
  activitiesUpdated: null,
  getActivityByDate: () => {},
});

export default ({ idArray, children }) => {
  const [activityIdArray, setActivityIdArray] = useState(idArray);
  const [activities, setActivities] = useState([]);
  const [activitiesUpdated, setActivitiesUpdated] = useState(Date.now());

  const addActivity = async ({
    date,
    excercise,
    level,
    results,
    type,
    incomplete,
  }) => {
    try {
      let newActivity = { date, excercise, level, results, type };

      if (incomplete) {
        newActivity = { ...newActivity, incomplete };
      }

      if (activityIdArray && !!activityIdArray.length) {
        const newIdArray = [...activityIdArray, date];
        setActivityIdArray(newIdArray);
        storeAsyncData(ACTIVITY_TAG, newIdArray);
      } else {
        setActivityIdArray([date]);
        storeAsyncData(ACTIVITY_TAG, [date]);
      }

      storeAsyncData(date, newActivity);
      setActivities((curr) => [...curr, newActivity]);
      setActivitiesUpdated(Date.now());
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

        setActivitiesUpdated(Date.now());
        setActivities(updatedActivities);
        await mergeAsyncData(date, { favourite: !foundActivity.favourite });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getActivitiesByMonth = (month) => {
    const activitiesByMonth = activities
      .filter((activity) => activity.date.includes(month))
      .map((activity) => ({
        date: activity.date,
        type: activity.type,
        day: new Date(activity.date).getDate(),
        title: activity.excercise.title,
        favourite: activity.favourite,
      }));

    return activitiesByMonth;
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

  const deleteActivity = (date) => {
    try {
      const updatedIdArray = activityIdArray.filter((id) => id !== date);
      const updatedActivies = activities.filter(
        (activity) => activity.date !== date
      );

      removeAsyncData(date);
      storeAsyncData(ACTIVITY_TAG, updatedIdArray);
      setActivityIdArray(updatedIdArray);
      setActivities(updatedActivies);
      setActivitiesUpdated(Date.now());
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

  useEffect(() => {
    getSavedActivites();
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        activities,
        getSavedActivites,
        addActivity,
        deleteActivity,
        setActivityIdArray,
        favouriteActivity,
        getActivitiesByMonth,
        activitiesUpdated,
        getActivityByDate,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};
