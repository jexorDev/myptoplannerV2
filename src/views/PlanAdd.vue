<template>
  <div>
    <SetupPlan
      ref="setupPlan"
      :selected-plan-year.sync="selectedPlanYear"
      :plan-name.sync="planName"
      :hours-to-plan.sync="hoursToPlan"
      :is-developer.sync="isDeveloper"
      :participates-in-flex.sync="participatesInFlex"
      :flex-schedule-type.sync="flexScheduleType"
      :flex-day-reference-date.sync="flexDayReferenceDate"
    ></SetupPlan>

    <v-btn color="primary" outlined @click="savePlan"
      >Save and begin planning PTO</v-btn
    >
  </div>
</template>

<script>
import SetupPlan from "@/components/setup/SetupPlan";
import { getIsoDateString } from "@/functions/dateHelpers";
import moment from "moment";

export default {
  name: "PlanAdd",
  components: {
    SetupPlan
  },
  data: () => ({
    participatesInFlex: false,
    flexScheduleType: "full",
    flexDayReferenceDate: getIsoDateString(moment()),
    planName: "",
    selectedPlanYear: "",
    hoursToPlan: 80,
    isDeveloper: false
  }),
  methods: {
    savePlan() {
      if (!this.$refs.setupPlan.validate()) {
        return;
      }

      this.$store.dispatch("addPlan", {
        name: this.planName,
        created: moment(),
        year: this.selectedPlanYear,
        hoursToPlan: this.hoursToPlan,
        isDeveloper: this.isDeveloper,
        participatesInFlex: this.participatesInFlex,
        flexScheduleType: this.flexScheduleType,
        flexDayReferenceDate: moment(this.flexDayReferenceDate).format(
          "YYYY-MM-DD"
        )
      });
      this.$store.dispatch("setSelectedPlanName", this.planName);
      this.$router.push({ path: "/" });
    }
  }
};
</script>
