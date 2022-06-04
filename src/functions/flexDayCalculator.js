import moment from "moment";

export function getFlexDaysFullScheduleType(flexDayReferenceDate, planYear) {
  if (!flexDayReferenceDate) return null;

  flexDayReferenceDate = moment(flexDayReferenceDate);
  if (!flexDayReferenceDate.isValid()) return null;

  const planYearInt = parseInt(planYear);

  let flexDays = [flexDayReferenceDate.year(planYearInt).format("YYYY-MM-DD")];

  const currentDateReverse = moment(flexDayReferenceDate)
    .year(planYearInt)
    .add(-2, "weeks");
  const currentDateForward = moment(flexDayReferenceDate)
    .year(planYearInt)
    .add(2, "weeks");

  while (currentDateReverse.year() === planYearInt) {
    flexDays.push(currentDateReverse.format("YYYY-MM-DD"));
    currentDateReverse.add(-2, "weeks");
  }
  while (currentDateForward.year() === planYearInt) {
    flexDays.push(currentDateForward.format("YYYY-MM-DD"));
    currentDateForward.add(2, "weeks");
  }

  return flexDays;
}

export function getFlexDaysHalfScheduleType(planYear) {
  const planYearInt = parseInt(planYear);
  let flexDays = [];

  for (let week = 0; week < 52; week++) {
    flexDays.push(
      moment()
        .year(planYearInt)
        .week(week)
        .day(5)
        .format("YYYY-MM-DD")
    );
  }

  console.log(flexDays);
  return flexDays;
}
