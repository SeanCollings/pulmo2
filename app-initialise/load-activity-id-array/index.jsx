import { getAsyncData } from '../../helpers/storage';
import { ACTIVITY_TAG } from '../../context/history-context';

const loadActivityIdArrayAsync = async () => {
  try {
    const activityIdArray = await getAsyncData(ACTIVITY_TAG);
    if (!activityIdArray) return Promise.resolve([]);

    const orderedActivityArray = activityIdArray.sort(
      (a, b) => new Date(b) - new Date(a)
    );
    return Promise.resolve(orderedActivityArray);
  } catch (err) {
    throw new Error(err);
  }
};

export default loadActivityIdArrayAsync;
