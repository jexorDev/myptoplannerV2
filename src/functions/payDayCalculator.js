import moment from "moment";
import { getNextBusinessDay } from "./dateHelpers";

export function getPayDays(year, hireDate) {
    if (!year) return;
    year = parseInt(year);
    const momentHireDate = moment(hireDate);

    let payDays = [];

    for (let month = 0; month < 12; month++) {
        const midPayDay = getNextBusinessDay(moment({ month: month, date: 15, year: year }), 'previous');
        payDays.push(midPayDay.format("YYYY-MM-DD"));

        const monthEndPayDay = getNextBusinessDay(moment({ month: month, date: 1, year: year }).endOf("month"), 'previous');
        payDays.push(monthEndPayDay.format("YYYY-MM-DD"));

    }

    if (moment().year() === momentHireDate.year()) {
        //TODO: this can probably be the single return statement
        return payDays.filter(x => moment(x).isAfter(momentHireDate));
    } else {
        return payDays;
    }
}
