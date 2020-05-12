import { getStringFromDate } from '../date';

describe('date utils', () => {
  test('It returns null if non date instance is passed', () => {
    expect(getStringFromDate('undefined')).toBe(null);
    expect(getStringFromDate(undefined)).toBe(null);
    expect(getStringFromDate([1, 2, 3])).toBe(null);
  });

  test('It returns the correct data with a date instance is passed', () => {
    expect(getStringFromDate(new Date(2020, 5, 6))).toBe('06/06/2020');
    expect(getStringFromDate(new Date(2020, 1, 6))).toBe('06/02/2020');
    expect(getStringFromDate(new Date(1993, 11, 1))).toBe('01/12/1993');
    expect(getStringFromDate(new Date(1993, 15, 1))).toBe('01/04/1994');
  });
});
