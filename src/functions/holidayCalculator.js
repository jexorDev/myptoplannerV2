import moment from "moment";
import { getNextBusinessDay } from "./dateHelpers";

export function getHolidays(planYear) {
  let holidays = [];

  const newYears = getNextBusinessDay(moment(`${planYear}-01-01`), "next");
  holidays.push({
    description: "New Year's",
    date: newYears.format("YYYY-MM-DD")
  });

  const memorialDay = getNextBusinessDay(
    moment(`${planYear}-05-01`).endOf("month"),
    "previous",
    1
  );
  holidays.push({
    description: "Memorial Day",
    date: memorialDay.format("YYYY-MM-DD")
  });

  const independenceDay = getNextBusinessDay(
    moment(`${planYear}-07-04`),
    "next"
  );
  holidays.push({
    description: "Independence Day",
    date: independenceDay.format("YYYY-MM-DD")
  });

  const laborDay = getNextBusinessDay(moment(`${planYear}-09-01`), "next", 1);
  holidays.push({
    description: "Labor Day",
    date: laborDay.format("YYYY-MM-DD")
  });

  const thanksgivingDay = getNextBusinessDay(
    moment(`${planYear}-11-01`).endOf("month"),
    "previous",
    4
  );
  holidays.push({
    description: "Thanksgiving",
    date: thanksgivingDay.format("YYYY-MM-DD")
  });
  holidays.push({
    description: "Thanksgiving",
    date: thanksgivingDay.add(1, "day").format("YYYY-MM-DD")
  });

  const christmasEve = getNextBusinessDay(
    moment(`${planYear}-12-25`).add(-1, "day"),
    "previous"
  );
  holidays.push({
    description: "Christmas Eve",
    date: christmasEve.format("YYYY-MM-DD")
  });

  const christmasDay = getNextBusinessDay(moment(`${planYear}-12-25`), "next");
  holidays.push({
    description: "Christmas Day",
    date: christmasDay.format("YYYY-MM-DD")
  });

  const newYearsNextYear = getNextBusinessDay(
    moment(`${parseInt(planYear) + 1}-01-01`),
    "previous"
  );
  if (newYearsNextYear.year() === parseInt(planYear)) {
    //next year's new year's is on a weekend and moves company holiday to current plan year
    holidays.push({
      description: "New Year's",
      date: newYearsNextYear.format("YYYY-MM-DD")
    });
  }

  return holidays;
}
