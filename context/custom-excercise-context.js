import React, { useState, createContext } from 'react';

import {
  getAsyncData,
  storeAsyncData,
  removeAsyncData,
} from '../helpers/storage';

export const CUSTOM_TAG = `@Custom:`;

export const CustomExcerciseContext = createContext({
  customExcercises: [],
  addCustomExcercise: () => {},
  updateCustomExcercise: () => {},
  deleteCustomExcercise: () => {},
});

export default ({ excercises, children }) => {
  const [customExcercises, setCustomExcercise] = useState(excercises);

  const addCustomExcercise = async (excercise) => {
    try {
      setCustomExcercise((curr) => [...curr, excercise]);

      let success = false;
      const getCustomIdArray = await getAsyncData(CUSTOM_TAG);

      if (getCustomIdArray && !!getCustomIdArray.length) {
        const newIdArray = [...getCustomIdArray, excercise.id];
        success = await storeAsyncData(CUSTOM_TAG, newIdArray);
      } else {
        success = await storeAsyncData(CUSTOM_TAG, [excercise.id]);
      }

      if (success) storeAsyncData(`${CUSTOM_TAG}${excercise.id}`, excercise);
    } catch (err) {
      console.log(err);
    }
  };

  const updateCustomExcercise = async (excercise) => {
    const updatedExcercises = customExcercises.map((x) =>
      x.id === excercise.id ? excercise : x
    );
    setCustomExcercise(updatedExcercises);
    storeAsyncData(`${CUSTOM_TAG}${excercise.id}`, excercise);
  };

  const deleteCustomExcercise = async (id) => {
    const updatedExcercises = customExcercises.filter(
      (excercise) => excercise.id !== id
    );
    setCustomExcercise(updatedExcercises);
    removeAsyncData(`${CUSTOM_TAG}${id}`);
  };

  return (
    <CustomExcerciseContext.Provider
      value={{
        customExcercises,
        addCustomExcercise,
        updateCustomExcercise,
        deleteCustomExcercise,
      }}
    >
      {children}
    </CustomExcerciseContext.Provider>
  );
};
