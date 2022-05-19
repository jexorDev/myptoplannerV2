import moment from "moment";

export function getUsageByMonth(pto) {

    let balances = [];

    for (let i = 0; i < 12; i++) {
        balances.push({
            month: moment({month: i}).format("MMM"),
            totalPto: pto.filter(x => moment(x.date).month() === i).reduce((acc, value) => { return acc + value.hours }, 0)
        });
    }

    return balances;
}

