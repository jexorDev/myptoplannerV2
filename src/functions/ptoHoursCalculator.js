import moment from "moment";

function getPtoDays(
  fromDate,
  toDate,
  participatesInFlex,
  flexScheduleType,
  holidays,
  flexDays
) {
  const momentFromDate = moment(fromDate);
  const momentToDate = moment(toDate);
  let ptoDays = [];

  for (
    let currentDate = moment(momentFromDate);
    currentDate.isSameOrBefore(momentToDate);
    currentDate.add(1, "day")
  ) {
    if (currentDate.day() === 0 || currentDate.day() === 6) continue;
    if (holidays.filter(x => x === currentDate.format("YYYY-MM-DD")).length > 0)
      continue;
    if (flexDays.filter(x => x === currentDate.format("YYYY-MM-DD")).length > 0)
      continue;

    ptoDays.push({
      date: currentDate.format("YYYY-MM-DD"),
      hours: getFullDayPtoHours(
        currentDate,
        participatesInFlex,
        flexScheduleType
      ),
      status: 0
    });
  }

  return ptoDays;
}

function getFullDayPtoHours(day, participatesInFlex, flexScheduleType) {
  if (participatesInFlex) {
    if (moment(day).day() === 5) {
      if (flexScheduleType === "full") {
        return 8;
      } else {
        return 4;
      }
    } else {
      return 9;
    }
  } else {
    return 8;
  }
}

export function getTotalPtoHours(ptoDays) {
  if (!ptoDays) return 0;

  let totalPtoHours = 0;

  for (let ptoDay of ptoDays) {
    totalPtoHours += ptoDay.hours;
  }

  return totalPtoHours;
}

export function getPtoDaysForRange(
  fromDate,
  toDate,
  participatesInFlex,
  flexScheduleType
) {
  return getPtoDays(
    fromDate,
    toDate,
    participatesInFlex,
    flexScheduleType,
    [],
    []
  );
}

export function getPtoDayForSingle(
  date,
  participatesInFlex,
  flexScheduleType,
  isAllDay,
  customHourEntry
) {
  if (!isAllDay) {
    return [
      {
        date: moment(date).format("YYYY-MM-DD"),
        hours: customHourEntry,
        status: 0
      }
    ];
  } else {
    return getPtoDays(date, date, participatesInFlex, flexScheduleType, [], []);
  }
}
