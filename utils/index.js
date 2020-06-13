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

const getAmPmTime = (hours, mins) => {
  const ampm = hours < 12 || hours === 24 ? 'am' : 'pm';
  const hour = (hours % 12 || 12).toString();
  const ampPmTime = `${appendZero(hour)}:${mins} ${ampm}`;
  return ampPmTime;
};

/**
 * Converts to yyyy/mm/dd hh:mm format
 * @param {date} date eg 2020-12-06T14:15:00.015Z
 */
export const convertDate = (date) => {
  const newDate = new Date(date);
  const year = newDate.getFullYear().toString();
  const month = appendZero((newDate.getMonth() + 1).toString());
  const day = appendZero(newDate.getDate().toString());
  const hours = appendZero(newDate.getHours().toString());
  const mins = appendZero(newDate.getMinutes().toString());

  return `${year}/${month}/${day} ${hours}:${mins}`;
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

export const getDay = (date) => {
  const newDate = new Date(date);
  const dayMonth = newDate.toDateString().substr(0, 3);
  return dayMonth;
};

export const getTotalResultTime = (results) =>
  results.reduce((acc, result) => {
    const roundTime = result.reduce((accRound, round) => {
      if (!round) return accRound;
      return accRound + convertToSeconds(round);
    }, 0);
    return acc + roundTime;
  }, 0);
