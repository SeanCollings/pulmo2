import { getAsyncData } from '../../helpers/storage';
import { FAV_ACTIVITY_TAG } from '../../context/history-context';

const loadFavActivityIdArrayAsync = async () => {
  try {
    const favActivityIdArray = await getAsyncData(FAV_ACTIVITY_TAG);
    if (!favActivityIdArray) return Promise.resolve([]);

    const orderedActivityArray = favActivityIdArray.sort(
      (a, b) => new Date(b) - new Date(a)
    );
    return Promise.resolve(orderedActivityArray);
  } catch (err) {
    throw new Error(err);
  }
};

export default loadFavActivityIdArrayAsync;
