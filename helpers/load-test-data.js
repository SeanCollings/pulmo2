import testData, {
  TEST_KEY,
  TEST_TITLE,
  TEST_MUTLIPLE_ID,
  TEST_DATA,
  TEST_PRE_ID,
} from '../data/test-data';
import { getAsyncData, storeAsyncData } from './storage';

export const MESSAGE_UNKNOWN = 'unknown';
export const MESSAGE_PRE_SAVED = 'pre-saved';
export const MESSAGE_DONE = 'done';

export default async (title) => {
  try {
    const selectedData = Object.values(testData).find(
      (data) => data[TEST_TITLE] === title
    );

    if (!selectedData) return MESSAGE_UNKNOWN;

    if (!selectedData[TEST_MUTLIPLE_ID]) {
      const savedData = await getAsyncData(selectedData[TEST_KEY]);

      if (!savedData) {
        console.log('Saving data for:', selectedData[TEST_KEY]);
        await storeAsyncData(selectedData[TEST_KEY], selectedData[TEST_DATA]);
        return MESSAGE_DONE;
      } else {
        return MESSAGE_PRE_SAVED;
      }
    } else {
      const updatedSaves = await selectedData[TEST_DATA].reduce(
        async (acc, data) => {
          const newAcc = await acc;
          const id = selectedData[TEST_MUTLIPLE_ID];
          const preId = selectedData[TEST_PRE_ID] || '';
          const savedData = await getAsyncData(`${preId}${data[id]}`);

          if (!savedData) {
            console.log('Saving data for:', `${preId}${data[id]}`);
            newAcc.push(data[id]);
            await storeAsyncData(`${preId}${data[id]}`, data);
          }
          return newAcc;
        },
        []
      );

      if (!updatedSaves.length) return MESSAGE_PRE_SAVED;

      return `${MESSAGE_DONE} [${updatedSaves.length}]`;
    }
  } catch (err) {
    throw new Error(err);
  }
};
