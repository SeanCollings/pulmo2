import {
  STRENGTH_KEY,
  ENDURANCE_KEY,
  CUSTOM_KEY,
  DEFAULT_EXCERCISE,
  DATA,
} from '../data';
import { EXCERCISE_DATA } from '../data/excercises';

export const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x);

/**
 * Converts single digit to 2
 * @param {number} number
 */
export const formatNumber = (number) => `0${number}`.slice(-2);

/**
 * Converts milliseconds to seconds
 * @param {number} millis eg: 1234 milliseconds
 */
export const convertMilliToSeconds = (millis) => millis / 1000;

/**
 * Gets time in min:sec format
 * @param {number} time eg: 2 seconds
 */
export const getRemainingTime = (time) => {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time - mins * 60);
  return `${formatNumber(mins)}:${formatNumber(secs)}`;
};

/**
 * Converts milliseconds to min:sec format
 */
export const formatMilliToSeconds = compose(
  getRemainingTime,
  convertMilliToSeconds
);

/**
 * Returns an array start and end inclusive of given step values between
 * @param {number} start eg: 0
 * @param {number} end eg: 5
 * @param {number} step eg: 0.5
 */
export const getRangeArray = (start, end, step = 1) => {
  const len = Math.floor((end - start) / step) + 1;
  return Array(len)
    .fill()
    .map((_, idx) => start + idx * step);
};

/**
 * Converts a string in min:sec format to seconds
 * @param {string} time eg '02:12'
 */
export const convertToSeconds = (time) => {
  if (!time) return;
  const [min, sec] = time.split(':');
  const minToSec = +min * 60;
  return minToSec + +sec;
};

const appendZero = (input) => (input.length === 1 ? `0${input}` : input);

export const getAmPmTime = (hours, mins) => {
  const ampm = hours < 12 || hours === 24 ? 'am' : 'pm';
  const hour = (hours % 12 || 12).toString();
  const ampPmTime = `${appendZero(hour)}:${mins} ${ampm}`;
  return ampPmTime;
};

/**
 * Converts to dd/mm/yyyy hh:mm format
 * @param {date} date eg 2020-12-06T14:15:00.015Z
 */
export const convertDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString();
  const month = appendZero((newDate.getMonth() + 1).toString());
  const day = appendZero(newDate.getDate().toString());
  const hours = appendZero(newDate.getHours().toString());
  const mins = appendZero(newDate.getMinutes().toString());

  return `${day}/${month}/${year} ${hours}:${mins}`;
};

/**
 * Converts to DD MM dd @hh:mm
 * @param {date} date eg 2020-12-06T14:15:00.015Z
 */
export const convertDateDetail = (date) => {
  const newDate = new Date(date);

  const dayMonth = newDate.toDateString().substr(0, 8);
  const day = appendZero(newDate.getDate().toString());
  const hours = appendZero(newDate.getHours().toString());
  const mins = appendZero(newDate.getMinutes().toString());

  return `${dayMonth} ${day} @${hours}:${mins}`;
};

export const getTimeFromDate = (date) => {
  const newDate = new Date(date);

  const hours = appendZero(newDate.getHours().toString());
  const mins = appendZero(newDate.getMinutes().toString());

  return `${hours}:${mins}`;
};

export const getDay = (date) => {
  const newDate = new Date(date);
  const dayMonth = newDate.toDateString().substr(0, 3);
  return dayMonth;
};

export const isLeapYear = (month, year) => {
  if (month === 1) {
    if ((year % 4 === 0 && year % 100 != 0) || year % 400 === 0) {
      return 1;
    }
  }
  return 0;
};

/**
 * Converts array of result arrays into a seconds eg 5
 * @param {array} results eg [['00:01', '00:02'], ['00:03]]
 */
export const getTotalResultTime = (results) =>
  results.reduce((acc, result) => {
    const roundTime = result.reduce((accRound, round) => {
      if (!round) return accRound;
      return accRound + convertToSeconds(round);
    }, 0);
    return acc + roundTime;
  }, 0);

export const getIcon = (type) => {
  if (type === STRENGTH_KEY) {
    return 'dumbbell';
  } else if (type === ENDURANCE_KEY) {
    return 'clock';
  } else {
    return 'wrench';
  }
};

export const getColour = (type, theme) => {
  switch (type) {
    case STRENGTH_KEY:
      return theme.TERTIARY;
    case ENDURANCE_KEY:
      return theme.SECONDARY;
    case CUSTOM_KEY:
      return theme.QUATERNARY;
    default:
      return theme.TERTIARY;
  }
};

export const getColourCache = (theme) =>
  EXCERCISE_DATA.reduce((acc, arr) => {
    return { ...acc, [arr.title]: getColour(arr.title, theme) };
  }, {});

export const getExcerciseById = (id, type, customExcercises) => {
  if (!id) {
    return DEFAULT_EXCERCISE;
  }

  switch (type) {
    case STRENGTH_KEY:
      return DATA[STRENGTH_KEY].find((x) => x.id === id);
    case ENDURANCE_KEY:
      return DATA[ENDURANCE_KEY].find((x) => x.id === id);
    case CUSTOM_KEY:
      const custom = customExcercises.find((x) => x.id === id);
      if (!custom) return DEFAULT_EXCERCISE;
      return custom;
    default:
      DEFAULT_EXCERCISE;
  }
};

/**
 * Checks if two dates are from the same day
 * @param {string} date1 eg. 2020-06-27T16:41:49.156Z
 * @param {string} date2 eg. 2020-06-27T18:41:49.156Z
 */
export const datesSameDay = (date1, date2) =>
  new Date(date1).toDateString() === new Date(date2).toDateString();

/**
 * Checks if date is yesterday
 * @param {string} date eg. 2020-06-27T18:41:49.156Z
 */
export const isDateYesterday = (date) => {
  let yesterday = new Date(Date.now());
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday = yesterday.toDateString();

  const newDate = new Date(date).toDateString();

  return newDate === yesterday;
};

/**
 * Checks if date is today
 * @param {date} date eg. 2020-06-27T18:41:49.156Z
 */
export const isDateToday = (date) => {
  const today = new Date(Date.now());
  return new Date(today).toDateString() === new Date(date).toDateString();
};

/**
 * Converts work portion of an array of result into a work average deviation
 * @param {array} results eg [['00:01', '00:02'], ['00:03]]
 */
export const getWorkAverageDeviation = (results) => {
  let totalTime = 0;

  if (!results.length) return 0;

  const allWorkTimes = results.reduce((acc, result) => {
    if (!!result.length) {
      const time = convertToSeconds(result[0]);
      acc.push(time);
      totalTime += time;
    }
    return acc;
  }, []);

  if (!allWorkTimes.length) return 0;

  const mean = totalTime / allWorkTimes.length;

  if (!mean) return 0;

  const totalDistance = allWorkTimes.reduce((acc, time) => {
    return (acc += Math.abs(mean - time));
  }, 0);

  const meanDeviation = totalDistance / allWorkTimes.length;
  const workAverageDeviation = ((meanDeviation / mean) * 100).toFixed(2);

  return workAverageDeviation;
};

/**
 * Returns the total, non-empty rounds in a result array
 * @param {array} results eg [['00:01', '00:02'], ['00:03'], []]
 */
export const getTotalWorkRounds = (results) =>
  results.reduce((acc, round) => {
    if (!!round.length) acc++;
    return acc;
  }, 0);
