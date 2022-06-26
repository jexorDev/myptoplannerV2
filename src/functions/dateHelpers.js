import moment from "moment";

export function formatDate(date) {
  if (!date) return null;

  const momentDate = moment(date);
  if (!momentDate.isValid()) return null;

  return momentDate.format("MM/DD/YYYY").toString();
}

export function getIsoDateString(date) {
  if (!date) return null;

  const momentDate = moment(date);
  if (!momentDate.isValid()) return null;

  return momentDate.toISOString().substring(0, 10);
}

export function isWeekendDay(date) {
  if (!date) return null;

  const momentDate = moment(date);
  if (!momentDate.isValid()) return null;

  return momentDate.day() === 0 || momentDate.day() === 6;
}

export function isMonday(date) {
  if (!date) return null;

  const momentDate = moment(date);
  if (!momentDate.isValid()) return null;

  return momentDate.day() === 1;
}

export function getNextBusinessDay(date, direction, specificWeekDay) {
  const momentDate = getMomentDate(date);
  if (!momentDate) return null;

  while (
    isWeekendDay(momentDate) ||
    (specificWeekDay && momentDate.day() !== specificWeekDay)
  ) {
    momentDate.add(direction === "previous" ? -1 : 1, "day");
  }

  return momentDate;
}

export function generateRange(startDate, endDate) {
  const momentStartDate = getMomentDate(startDate);
  const momentEndDate = getMomentDate(endDate);
  let currentDate = momentStartDate;
  let dateRange = [];

  while (currentDate.isSameOrBefore(momentEndDate)) {
    dateRange.push(currentDate.format("YYYY-MM-DD"));
    currentDate.add(1, "day");
  }

  return dateRange;
}

function getMomentDate(date) {
  if (!date) return null;

  const momentDate = moment(date);
  if (!momentDate.isValid()) return null;

  return momentDate;
}
