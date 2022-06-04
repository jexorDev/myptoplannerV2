import { getPtoHoursOnDay } from "./employeeInfoCalculator";

test("before anniversary", () => {
  expect(getPtoHoursOnDay("2021-03-16", "2015-04-18", "2021")).toBe(7);
});

test("after anniversary", () => {
  expect(getPtoHoursOnDay("2021-12-25", "2015-04-18", "2021")).toBe(8);
});

test("first year employee", () => {
  expect(getPtoHoursOnDay("2015-12-25", "2015-04-18", "2015")).toBe(5);
});
