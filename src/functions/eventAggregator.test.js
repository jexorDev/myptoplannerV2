import { getAggregatedEventList } from "./eventAggregator";

test('simple', () => {
    const pto = [{
        date: "2021-07-15",
        hours: 9
    },
    {
        date: "2021-07-31",
        hours: 2
    }];
    const pay = [
        "2021-01-15", "2021-01-31", "2021-07-31"
    ]

  expect(getAggregatedEventList(pto, [], [], pay, "2015-04-18", "2021")).toContain("");
});
