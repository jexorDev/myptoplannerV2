import { getFlexDays } from "./flexDayCalculator";

test('simple', () => {
  expect(getFlexDays("2020-12-25")).toContain("2020-12-11");
});