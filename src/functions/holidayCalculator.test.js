import { getHolidays } from "./holidayCalculator";

test('New years 2021', () => {
  expect(getHolidays("2021")).toContainEqual({description: "New Year's", date: "2021-01-01"});
});

test('Memorial day 2021', () => {
  expect(getHolidays("2021")).toContainEqual({description: "Memorial Day", date: "2021-05-31"});
});

test('Independence day 2021', () => {
  expect(getHolidays("2021")).toContainEqual({description: "Independence Day", date: "2021-07-05"});
});

test('Labor day 2021', () => {
  expect(getHolidays("2021")).toContainEqual({description: "Labor Day", date: "2021-09-06"});
});

test('Thanksgiving day 2021', () => {
  expect(getHolidays("2021")).toContainEqual({description: "Thanksgiving", date: "2021-11-25"});
});

test('Thanksgiving day after 2021', () => {
  expect(getHolidays("2021")).toContainEqual({description: "Thanksgiving", date: "2021-11-26"});
});