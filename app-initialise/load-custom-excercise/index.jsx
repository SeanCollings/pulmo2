import { getAsyncData, getMultiAsyncData } from '../../helpers/storage';
import { CUSTOM_TAG } from '../../context/custom-excercise-context';

const loadCustomExcercisesAsync = async () => {
  try {
    const getCustomIdArray = await getAsyncData(CUSTOM_TAG);

    if (getCustomIdArray) {
      const savedCustomExcercises = await getMultiAsyncData(
        CUSTOM_TAG,
        getCustomIdArray
      );

      const formattedCustomExcercise = savedCustomExcercises.reduce(
        (acc, array) => {
          if (array[1]) return [...acc, JSON.parse(array[1])];
          else return acc;
        },
        []
      );

      return Promise.resolve(formattedCustomExcercise);
    }

    return [];
  } catch (err) {
    throw new Error(err);
  }
};

export default loadCustomExcercisesAsync;
