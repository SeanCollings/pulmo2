import { cleanup } from 'react-native-testing-library';
import {
  formatNumber,
  convertMilliToSeconds,
  getRemainingTime,
  formatMilliToSeconds,
  getRangeArray,
  convertToSeconds,
  getAmPmTime,
  convertDate,
  convertDateDetail,
  getTimeFromDate,
  isLeapYear,
  getDay,
  getTotalResultTime,
  getIcon,
  getColour,
  getColourCache,
  getExcerciseById,
  datesSameDay,
  isDateYesterday,
  isDateToday,
  getWorkAverageDeviation,
  getTotalWorkRounds,
} from '..';

describe('utils - unit tests', () => {
  afterEach(() => {
    cleanup();
    jest.clearAllMocks();
  });

  test('formatNumber', () => {
    const expected = '02';
    const result = formatNumber(2);
    expect(result).toEqual(expected);
  });

  test('convertMilliToSeconds', () => {
    const expected = 5;
    const result = convertMilliToSeconds(5000);
    expect(result).toEqual(expected);
  });

  describe('getRemainingTime', () => {
    test('getRemainingTime', () => {
      const expected = '00:02';
      const result = getRemainingTime(2);
      expect(result).toEqual(expected);
    });
  });

  test('formatMilliToSeconds', () => {
    const expected = '00:15';
    const result = formatMilliToSeconds(15000);
    expect(result).toEqual(expected);
  });

  describe('getRangeArray', () => {
    test('getRangeArray', () => {
      const expected = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5];
      const result = getRangeArray(0, 5, 0.5);
      expect(result).toEqual(expected);
    });

    test('defaults to a step of 1 if not entered', () => {
      const expected = [0, 1, 2, 3, 4, 5];
      const result = getRangeArray(0, 5);
      expect(result).toEqual(expected);
    });
  });

  describe('convertToSeconds', () => {
    test('convertToSeconds', () => {
      const expected = 132;
      const result = convertToSeconds('02:12');
      expect(result).toEqual(expected);
    });

    test('should return nothing if time is null', () => {
      const result = convertToSeconds();
      expect(result).toBeUndefined();
    });
  });

  test('getAmPmTime', () => {
    const expectedMorning = '09:26 am';
    const expectedNoon = '12:26 pm';
    const expectedAfternoon = '02:26 pm';

    const resultMorning = getAmPmTime(9, 26);
    const resultNoon = getAmPmTime(12, 26);
    const resultAfternoon = getAmPmTime(14, 26);
    expect(resultMorning).toEqual(expectedMorning);
    expect(resultNoon).toEqual(expectedNoon);
    expect(resultAfternoon).toEqual(expectedAfternoon);
  });

  test('convertDate', () => {
    const expected = '06/12/2020 16:15';
    const result = convertDate('2020-12-06T14:15:00.015Z');
    expect(result).toEqual(expected);
  });

  test('convertDateDetail', () => {
    const expected = 'Sun Dec  06 @16:15';
    const result = convertDateDetail('2020-12-06T14:15:00.015Z');
    expect(result).toEqual(expected);
  });

  test('getTimeFromDate', () => {
    const expected = '16:15';
    const result = getTimeFromDate('2020-12-06T14:15:00.015Z');
    expect(result).toEqual(expected);
  });

  test('getDay', () => {
    const expected = 'Sun';
    const result = getDay('2020-12-06T14:15:00.015Z');
    expect(result).toEqual(expected);
  });

  describe('isLeapYear', () => {
    test('should return 1 if month February and a leap year', () => {
      const expected = 1;
      const result = isLeapYear(1, 2000);
      expect(result).toEqual(expected);
    });

    test('should return 0 Febraury and not a leap year', () => {
      const expected = 0;
      const result = isLeapYear(1, 2001);
      expect(result).toEqual(expected);
    });

    test('should return 0 for month not February', () => {
      const expected = 0;
      const result = isLeapYear(5, 2000);
      expect(result).toEqual(expected);
    });
  });

  test('getTotalResultTime', () => {
    const resultsInput = [
      ['00:32', '00:30'],
      ['00:42', '00:30'],
      ['00:23', '00:30'],
      ['01:25'],
      [''],
    ];
    const expected = 272;
    const result = getTotalResultTime(resultsInput);
    expect(result).toEqual(expected);
  });

  describe('getIcon', () => {
    test('should return icon: dumbbell for type: Strength', () => {
      const expected = 'dumbbell';
      const result = getIcon('Strength');
      expect(result).toEqual(expected);
    });

    test('should return icon: clock for type: Endurance', () => {
      const expected = 'clock';
      const result = getIcon('Endurance');
      expect(result).toEqual(expected);
    });

    test('should return icon: wrench for any other type', () => {
      const expected = 'wrench';
      const result = getIcon('');
      expect(result).toEqual(expected);
    });
  });

  describe('getColour', () => {
    const theme = {
      SECONDARY: '#002f56',
      TERTIARY: '#00b8bb',
      QUATERNARY: '#5bacf3',
    };

    test('should return TERTIARY for type: Strength', () => {
      const expected = theme.TERTIARY;
      const result = getColour('Strength', theme);
      expect(result).toEqual(expected);
    });

    test('should return SECONDARY for type: Endurance', () => {
      const expected = theme.SECONDARY;
      const result = getColour('Endurance', theme);
      expect(result).toEqual(expected);
    });

    test('should return QUATERNARY for type: Custom', () => {
      const expected = theme.QUATERNARY;
      const result = getColour('Custom', theme);
      expect(result).toEqual(expected);
    });

    test('should return TERTIARY for any other type', () => {
      const expected = theme.TERTIARY;
      const result = getColour('', theme);
      expect(result).toEqual(expected);
    });
  });

  test('getColourCache', () => {
    const theme = {
      SECONDARY: '#002f56',
      TERTIARY: '#00b8bb',
      QUATERNARY: '#5bacf3',
    };
    const expected = {
      Custom: '#5bacf3',
      Endurance: '#002f56',
      Strength: '#00b8bb',
    };

    const result = getColourCache(theme);
    expect(result).toEqual(expected);
  });

  describe('getExcerciseById', () => {
    const customExcerciseArray = [
      {
        id: 1234,
        title: 'Custom Excercise',
        cycles: 10,
        rest: 60,
        rounds: 4,
      },
    ];

    test('Strength', () => {
      const result = getExcerciseById(11, 'Strength');
      expect(result).toMatchSnapshot();
    });

    test('Endurance', () => {
      const result = getExcerciseById(21, 'Endurance');
      expect(result).toMatchSnapshot();
    });

    test('Custom', () => {
      const result = getExcerciseById(1234, 'Custom', customExcerciseArray);
      expect(result).toMatchSnapshot();
    });

    test('should return the default excercise if the Custom excercise doesnt exisit', () => {
      const result = getExcerciseById(100, 'Custom', customExcerciseArray);
      expect(result).toMatchSnapshot();
    });

    test('should return the default excercise if there is no id', () => {
      const result = getExcerciseById();
      expect(result).toMatchSnapshot();
    });

    test('should return the default excercise if there is no type', () => {
      const result = getExcerciseById(11);
      expect(result).toMatchSnapshot();
    });
  });

  describe('datesSameDay', () => {
    test('should be truthy if the dates are the same day', () => {
      const result = datesSameDay(
        '2020-06-27T16:41:49.156Z',
        '2020-06-27T16:41:49.156Z'
      );
      expect(result).toBeTruthy();
    });

    test('should be falsy if dates are not the same day', () => {
      const result = datesSameDay(
        '2020-06-27T16:41:49.156Z',
        '2020-06-26T16:41:49.156Z'
      );
      expect(result).toBeFalsy();
    });
  });

  describe('isDateYesterday', () => {
    let dateNowSpy;

    beforeAll(() => {
      dateNowSpy = jest
        .spyOn(Date, 'now')
        .mockImplementation(() => 1593216000000); // '2020-06-27'
    });

    afterAll(() => {
      dateNowSpy.mockRestore();
    });

    test('should be truthy if the date is yesterday', () => {
      const result = isDateYesterday('2020-06-26T16:41:49.156Z');
      expect(result).toBeTruthy();
    });

    test('should be falsy if the date is not yesterday', () => {
      const result = isDateYesterday('2020-06-20T16:41:49.156Z');
      expect(result).toBeFalsy();
    });
  });

  describe('isDateToday', () => {
    let dateNowSpy;

    beforeAll(() => {
      dateNowSpy = jest
        .spyOn(Date, 'now')
        .mockImplementation(() => 1593216000000); // '2020-06-27'
    });

    test('should be truthy if the date is today', () => {
      const result = isDateToday('2020-06-27T16:41:49.156Z');
      expect(result).toBeTruthy();
    });

    test('should be falsy if the date is not today', () => {
      const result = isDateToday('2020-06-20T16:41:49.156Z');
      expect(result).toBeFalsy();
    });
  });

  describe('getWorkAverageDeviation', () => {
    test('should return work average deviation', () => {
      const result = getWorkAverageDeviation([
        ['00:98', '00:05'],
        ['00:32', '00:05'],
        [],
      ]);

      expect(result).toEqual('50.77');
    });

    test('should return 0 if results length is 0', () => {
      const result = getWorkAverageDeviation([]);
      expect(result).toEqual(0);
    });

    test('should return 0 if the only result in results is empty', () => {
      const result = getWorkAverageDeviation([[]]);
      expect(result).toEqual(0);
    });

    test('should return 0 if the mean is 0', () => {
      const result = getWorkAverageDeviation([['00:00', '00:05']]);
      expect(result).toEqual(0);
    });
  });

  describe('getTotalWorkRounds ', () => {
    test('should get the total non-empty work rounds', () => {
      const result = getTotalWorkRounds([['00:01', '00:02'], ['00:03'], []]);
      expect(result).toEqual(2);
    });

    test('should return 0 for empty array', () => {
      const result = getTotalWorkRounds([]);
      expect(result).toEqual(0);
    });
  });
});
