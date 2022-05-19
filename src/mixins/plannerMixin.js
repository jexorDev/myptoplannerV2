import { getFlexDaysFullScheduleType, getFlexDaysHalfScheduleType } from "@/functions/flexDayCalculator";
import { getPayDays } from "@/functions/payDayCalculator";
import { getPtoBreakdown } from "@/functions/employeeInfoCalculator";
import { getHolidays } from "@/functions/holidayCalculator";

export default {
    name: "plannerMixin",
    computed: {
        ptoDates: function () {
            return this.$store.getters.ptoDates;
        },
        flexDays() {
            return this.$store.getters.userInfo.participatesInFlex
                ? this.$store.getters.userInfo.flexScheduleType === "full"
                    ? getFlexDaysFullScheduleType(this.$store.getters.userInfo.flexDayReferenceDate, this.$store.getters.selectedPlan.year)
                    : getFlexDaysHalfScheduleType(this.$store.getters.selectedPlan.year)
                : [];
        },
        holidays() {
            return getHolidays(this.$store.getters.selectedPlan.year);
        },
        payDays() {
            return getPayDays(
                this.$store.getters.selectedPlan.year,
                this.$store.getters.userInfo.dateOfHire
            );
        },
        totalPtoPlanned() {
            return this.$store.getters.ptoDates
                    .reduce((acc, val) => {
                        return acc + val.hours;
                    }, 0);
        },
        totalPtoAccrualHours() {
            return getPtoBreakdown(
                this.$store.getters.userInfo.dateOfHire,
                this.$store.getters.selectedPlan.year,
            ).totalHours;
        }
    }
}