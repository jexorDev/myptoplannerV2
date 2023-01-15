import moment from "moment";

export function getAggregatedEventList(pto) {
  let eventList = [
    ...pto.map(pto => ({
      type: "usage",
      date: moment(pto.date).hour(12),
      hours: pto.hours,
      approved: pto.approved
    }))
  ];

  eventList = eventList.map(currentEvent => ({
    ...currentEvent,
    runningTotal: eventList
      .filter(allEvents => allEvents.date.isSameOrBefore(currentEvent.date))
      .reduce((acc, value) => {
        return acc + value.hours;
      }, 0)
  }));

  return eventList.sort((a, b) => {
    return moment(b.date).isSameOrBefore(moment(a.date)) ? 1 : -1;
  });
}
