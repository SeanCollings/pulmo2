import React, { useState, createContext, useEffect, useContext } from 'react';

import { CustomExcerciseContext } from './custom-excercise-context';
import { getAsyncData, storeAsyncData } from '../helpers/storage';
import { DEFAULT_EXCERCISE, STRENGTH_KEY, CUSTOM_KEY } from '../data';

export const SELECTED_EXCERCISE = 'selected_Excercise';

export const ExcerciseContext = createContext({
  selectedExcercise: [],
  toggleExcercise: () => {},
});

export default (props) => {
  const { customExcercises } = useContext(CustomExcerciseContext);
  const [selectedExcercise, setSelectedExcercise] = useState([]);

  const toggleExcercise = (id, type) => {
    try {
      if (!id) {
        setSelectedExcercise([DEFAULT_EXCERCISE.id, STRENGTH_KEY]);
        storeAsyncData(SELECTED_EXCERCISE, [
          DEFAULT_EXCERCISE.id,
          STRENGTH_KEY,
        ]);
      } else {
        setSelectedExcercise([id, type]);
        storeAsyncData(SELECTED_EXCERCISE, [id, type]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getSelectedExcercise = async () => {
    try {
      const excercise = await getAsyncData(SELECTED_EXCERCISE);

      if (excercise) {
        const [id, type] = excercise;
        if (type === CUSTOM_KEY && !customExcercises.find((x) => x.id === id)) {
          setSelectedExcercise([DEFAULT_EXCERCISE.id, STRENGTH_KEY]);
        } else {
          setSelectedExcercise([id, type]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getSelectedExcercise();
  }, []);

  return (
    <ExcerciseContext.Provider value={{ selectedExcercise, toggleExcercise }}>
      {props.children}
    </ExcerciseContext.Provider>
  );
};
