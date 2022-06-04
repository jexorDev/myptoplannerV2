<template>
  <div>
    <SetupPlan
      :selected-plan-year.sync="selectedPlanYear"
      :plan-name.sync="planName"
      :hours-to-plan.sync="hoursToPlan"
      :is-developer.sync="isDeveloper"
      :participates-in-flex.sync="participatesInFlex"
      :flex-schedule-type.sync="flexScheduleType"
      :flex-day-reference-date.sync="flexDayReferenceDate"
    ></SetupPlan>

    <v-btn color="success" outlined @click="savePlan"
      ><v-icon class="mr-1">mdi-check-circle-outline</v-icon>Save and begin
      planning PTO</v-btn
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
    hoursToPlan: 200,
    isDeveloper: false
  }),
  methods: {
    savePlan() {
      // this.$store.dispatch("setUserInfo", {
      //   dateOfHire: this.dateOfHire,
      //   isDeveloper: this.isDeveloper,
      //   participatesInFlex: this.participatesInFlex,
      //   flexScheduleType: this.flexScheduleType,
      //   flexDayReferenceDate: moment(this.flexDayReferenceDate).format(
      //     "YYYY-MM-DD"
      //   ),
      // });
      if (this.planName === "") {
        alert("Please enter a plan name");
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
