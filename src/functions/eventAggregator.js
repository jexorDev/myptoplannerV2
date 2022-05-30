import moment from "moment";

export function getAggregatedEventList(pto) {
    let eventList = [
        ...pto.map(pto => ({
            type: "usage",
            date: moment(pto.date).hour(12),
            hours: pto.hours * -1
        }))
    ];

    return eventList.sort((a, b) => { return moment(b.date).isSameOrBefore(moment(a.date)) ? 1 : -1 })
}
