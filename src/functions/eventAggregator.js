import moment from "moment";

export function getAggregatedEventList(pto, currentYear) {
  let usageBurndownData = [...pto.map(x => ({date: moment(x.date), hours: x.hours}))];

  for (let i = 0; i < 12; i++) {
    let totalMonthUsage = 0;

    for (const usage of pto) {
      if (moment(usage.date).month() === i) {
        totalMonthUsage += usage.hours;
      }
    }

    if (totalMonthUsage === 0)
    {
      usageBurndownData.push({date: moment().year(currentYear).month(i).date(1), hours: 0 })
    }

  }


  usageBurndownData = usageBurndownData.map(currentEvent => ({
    ...currentEvent,
    runningTotal: usageBurndownData
      .filter(allEvents => allEvents.date.isSameOrBefore(currentEvent.date))
      .reduce((acc, value) => {
        return acc + value.hours
      }, 0)
  }));

  //eventList.forEach(x => x.runningTotal = totalHoursToPlan - x.runningTotal)

  return usageBurndownData.sort((a, b) => {
    return moment(b.date).isSameOrBefore(moment(a.date)) ? 1 : -1;
  });
}

export function getTrendLine(currentYear, hoursToPlan) {
  const trendLineData = [];

  for (let i = 0; i < 12; i++) {
    const hours = (hoursToPlan / 12) * i
    trendLineData.push({x: moment().month(i).year(currentYear).date(1), y: hours});
  }

  return trendLineData;
}