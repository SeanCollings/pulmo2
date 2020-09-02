import { THEME } from '../context/settings-context';
import { DARK_MODE } from '../constants/constants';
import { SELECTED_LEVEL } from '../context/profile-context';
import { CUSTOM_TAG } from '../context/custom-excercise-context';
import { ACTIVITY_TAG, FAV_ACTIVITY_TAG } from '../context/history-context';
import { SELECTED_EXCERCISE } from '../context/excercise-context';

export const TEST_ALL_ACTIVITIES = 'test_all_activities';
export const TEST_KEY = 'test_key';
export const TEST_DATA = 'test_data';
export const TEST_TITLE = 'test_title';
export const TEST_MUTLIPLE = 'test_multiple';
export const TEST_MUTLIPLE_ID = 'test_multiple_id';
export const TEST_PRE_ID = 'test_pre_id';

//#region Custom Excercise ID Array
const test_customExcerciseIdArray = {
  [TEST_TITLE]: 'Custom Excercise IDs',
  [TEST_KEY]: CUSTOM_TAG,
  [TEST_DATA]: [1597490106660, 1597490120213],
};
//#endregion Custom Excercises ID Array

//#region Custom Excercises
const test_customExcercises = {
  [TEST_TITLE]: 'Custom Excercises',
  [TEST_MUTLIPLE_ID]: 'id',
  [TEST_PRE_ID]: CUSTOM_TAG,
  [TEST_DATA]: [
    {
      cycles: '12',
      id: 1597490106660,
      rest: '3',
      rounds: '4',
      title: 'Custom Excercise',
    },
    {
      cycles: '10',
      id: 1597490120213,
      rest: '1',
      rounds: '10',
      title: 'Many Rounds',
    },
  ],
};
//#endregion Custom Excercises

//#region Selected Excercise
const test_selected_excercise = {
  [TEST_TITLE]: 'Selected Excercise',
  [TEST_KEY]: SELECTED_EXCERCISE,
  [TEST_DATA]: [1597490106660, 'Custom'],
};
//#endregion Selected Excercise

//#region Activity ID Array
const test_activityIdArray = {
  [TEST_TITLE]: 'Activity IDs',
  [TEST_KEY]: ACTIVITY_TAG,
  [TEST_DATA]: [
    '2020-09-01T12:50:14.562Z',
    '2020-08-25T10:12:47.005Z',
    '2020-08-20T13:24:38.330Z',
    '2020-08-20T10:53:57.797Z',
    '2020-08-19T15:14:17.865Z',
    '2020-08-15T12:52:43.310Z',
    '2020-08-12T12:12:12.100Z',
    '2020-08-10T09:51:44.609Z',
    '2020-08-09T12:50:58.499Z',
    '2020-08-08T11:36:50.680Z',
    '2020-08-07T12:55:11.988Z',
    '2020-08-05T12:44:47.027Z',
    '2020-08-01T12:42:37.786Z',
    '2020-07-18T16:41:15.186Z',
    '2020-07-17T12:40:54.141Z',
    '2020-07-15T12:38:25.328Z',
    '2020-07-12T10:47:28.181Z',
    '2020-07-09T12:36:46.328Z',
    '2020-07-09T10:26:11.702Z',
    '2020-06-10T12:35:09.722Z',
    '2020-06-10T11:19:55.838Z',
  ],
};
//#endregion Activity ID Array

//#region Fav Activity ID Array
const test_favActivityIdArray = {
  [TEST_TITLE]: 'Favourite Activity IDs',
  [TEST_KEY]: FAV_ACTIVITY_TAG,
  [TEST_DATA]: [
    '2020-08-20T13:24:38.330Z',
    '2020-08-19T15:14:17.865Z',
    '2020-08-10T09:51:44.609Z',
    '2020-08-09T12:50:58.499Z',
    '2020-08-05T12:44:47.027Z',
    '2020-07-18T16:41:15.186Z',
    '2020-07-17T12:40:54.141Z',
    '2020-07-09T12:36:46.328Z',
    '2020-06-10T11:19:55.838Z',
  ],
};
//#endregion Fav Activity ID Array

//#region Profile
const test_profile_selected_level = {
  [TEST_TITLE]: 'Profile',
  [TEST_KEY]: SELECTED_LEVEL,
  [TEST_DATA]: 2,
};
//#endregion Profile

//#region Settings
const test_settings_theme = {
  [TEST_TITLE]: 'Settings',
  [TEST_KEY]: THEME,
  [TEST_DATA]: DARK_MODE,
};
//#endregion Settings

//#region All Activities
const test_all_activities = {
  [TEST_TITLE]: 'All Activities',
  [TEST_MUTLIPLE_ID]: 'date',
  [TEST_KEY]: TEST_ALL_ACTIVITIES,
  [TEST_DATA]: [
    {
      date: '2020-09-01T12:50:14.562Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise Here',
      },
      favourite: false,
      level: 2,
      results: [
        ['00:02', '00:03'],
        ['00:01', '00:03'],
        ['00:02', '00:03'],
        ['00:03', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-25T10:12:47.005Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      level: 2,
      results: [
        ['00:03', '00:03'],
        ['00:03', '00:03'],
        ['00:03', '00:03'],
        ['00:03', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-20T13:24:38.330Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise 1',
      },
      favourite: true,
      level: 2,
      rating: 4,
      results: [
        ['00:07', '00:03'],
        ['00:02', '00:03'],
        ['00:07', '00:03'],
        ['00:04', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-20T10:53:57.797Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      level: 2,
      results: [
        ['00:04', '00:03'],
        ['00:07', '00:03'],
        ['00:03', '00:03'],
        ['00:08', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-19T15:14:17.865Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      favourite: true,
      level: 2,
      results: [
        ['00:02', '00:03'],
        ['00:01', '00:03'],
        ['00:02', '00:03'],
        ['00:02', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-15T12:52:43.310Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds',
      },
      incomplete: ['placeholder'],
      level: 2.5,
      results: [['00:09', '00:01'], ['00:09', '00:01'], ['00:09', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-08-12T12:12:12.100Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds',
      },
      incomplete: ['placeholder'],
      level: 2.5,
      results: [['00:02', '00:01'], ['00:02', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-08-10T09:51:44.609Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds',
      },
      favourite: true,
      incomplete: ['feeling_lazy'],
      level: 2.5,
      results: [['00:02', '00:01'], ['00:02', '00:01'], ['00:02', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-08-09T12:50:58.499Z',
      excercise: {
        cycles: 12,
        id: 13,
        rest: 50,
        rounds: 5,
        title: 'Strength Level III',
      },
      favourite: true,
      level: 2.5,
      results: [
        ['00:05', '00:50'],
        ['00:05', '00:50'],
        ['00:06', '00:50'],
        ['00:06', '00:50'],
        ['00:04', ''],
      ],
      type: 'Strength',
    },
    {
      date: '2020-08-08T11:36:50.680Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      level: 2.5,
      results: [
        ['00:02', '00:03'],
        ['00:02', '00:03'],
        ['00:02', '00:03'],
        ['00:02', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-07T12:55:11.988Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      level: 3,
      results: [
        ['00:02', '00:03'],
        ['00:02', '00:03'],
        ['00:01', '00:03'],
        ['00:02', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-08-05T12:44:47.027Z',
      excercise: {
        cycles: 12,
        id: 22,
        rest: 20,
        rounds: 5,
        title: 'Endurance Level II',
      },
      favourite: true,
      level: 3,
      results: [
        ['00:03', '00:20'],
        ['00:04', '00:20'],
        ['00:08', '00:20'],
        ['00:05', '00:20'],
        ['00:05', ''],
      ],
      type: 'Endurance',
    },
    {
      date: '2020-08-01T12:42:37.786Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      level: 3,
      results: [
        ['00:04', '00:03'],
        ['00:02', '00:03'],
        ['00:02', '00:03'],
        ['00:02', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-07-18T16:41:15.186Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Custom Many Rounds',
      },
      favourite: true,
      incomplete: ['out_of_breath'],
      level: 2.5,
      rating: 3,
      results: [['00:01', '00:01'], ['00:02', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-07-17T12:40:54.141Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds',
      },
      favourite: true,
      incomplete: ['other'],
      level: 3,
      results: [['00:08', '00:01'], ['00:05', '00:01'], ['00:05', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-07-15T12:38:25.328Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds 2',
      },
      level: 3,
      results: [
        ['00:02', '00:30'],
        ['00:02', '00:30'],
        ['00:03', '00:30'],
        ['00:03', '00:30'],
        ['00:04', '00:30'],
        ['00:04', '00:30'],
        ['00:03', '00:30'],
        ['00:02', '00:30'],
        ['00:03', '00:30'],
        ['00:03', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-07-12T10:47:28.181Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds',
      },
      incomplete: ['placeholder'],
      level: 3,
      results: [['00:03', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-07-09T12:36:46.328Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds Edited',
      },
      favourite: true,
      incomplete: ['placeholder'],
      level: 2.5,
      rating: 2,
      results: [
        ['00:03', '00:50'],
        ['00:04', '00:50'],
        ['00:05', '00:50'],
        ['00:02', '00:50'],
        [],
      ],
      type: 'Custom',
    },
    {
      date: '2020-07-09T10:26:11.702Z',
      excercise: {
        cycles: '10',
        id: 1597490120213,
        rest: '1',
        rounds: '10',
        title: 'Many Rounds',
      },
      incomplete: ['feeling_lazy'],
      level: 3.5,
      results: [['00:02', '00:01'], ['00:04', '00:01'], ['00:02', '00:01'], []],
      type: 'Custom',
    },
    {
      date: '2020-06-10T12:35:09.722Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      level: 3.5,
      results: [
        ['00:01', '00:03'],
        ['00:01', '00:03'],
        ['00:02', '00:03'],
        ['00:02', ''],
      ],
      type: 'Custom',
    },
    {
      date: '2020-06-10T11:19:55.838Z',
      excercise: {
        cycles: '12',
        id: 1597490106660,
        rest: '3',
        rounds: '4',
        title: 'Custom Excercise',
      },
      favourite: true,
      level: 3.5,
      results: [
        ['00:02', '00:03'],
        ['00:02', '00:03'],
        ['00:03', '00:03'],
        ['00:02', ''],
      ],
      type: 'Custom',
    },
  ],
};
//#endregion All Activities

export default {
  test_customExcerciseIdArray,
  test_customExcercises,
  test_selected_excercise,
  test_activityIdArray,
  test_favActivityIdArray,
  test_profile_selected_level,
  test_settings_theme,
  test_all_activities,
};
