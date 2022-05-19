import { getPtoHoursOnDay } from "./employeeInfoCalculator";
import moment from "moment";

export function getAggregatedEventList(pto, payday, hireDate, planYear, beginningBalance, totalPtoAccrualHours) {
    let eventList = [
        ...pto.map(pto => ({
            type: "usage",
            date: moment(pto.date).hour(12),
            hours: pto.hours * -1
        })),
        ...payday.map(payday => ({
            type: "add",
            date: moment(payday).hour(0).minute(0),
            hours: getPtoHoursOnDay(payday, hireDate, planYear)
        }))
    ];

    eventList.push({
        type: "beginning",
        date: moment({ month: 0, date: 1, year: planYear }),
        hours: beginningBalance
    });

    const remainingPlannedUsage = totalPtoAccrualHours - pto.reduce((acc, value) => { return acc + value.hours }, 0);
    if (remainingPlannedUsage > 40) {
        eventList.push({
            type: "forfeited",
            date: moment({ month: 11, date: 31, year: planYear, hour: 23, minute: 59 }),
            hours: -1 * (remainingPlannedUsage - 40),
        });
    }

        eventList.push({
        type: "beginning_next_year",
        date: moment({ month: 0, date: 1, year: (parseInt(planYear) + 1) }),
        hours: null,
    });

    eventList = eventList.map(currentEvent => ({
        ...currentEvent,
        runningTotal: eventList.filter(allEvents => allEvents.date.isSameOrBefore(currentEvent.date)).reduce((acc, value) => { return acc + value.hours }, 0)
    }));

    return eventList.sort((a, b) => { return moment(b.date).isSameOrBefore(moment(a.date)) ? 1 : -1 })
}
