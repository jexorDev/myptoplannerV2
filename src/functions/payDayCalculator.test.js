import { getPayDays } from "./payDayCalculator";

test("simple", () => {
  expect(getPayDays("2020")).toContain("2020-12-31");
});
