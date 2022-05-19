<template>
  <div>
    <v-stepper v-model="step">
      <v-stepper-header>
        <v-stepper-step :complete="step > 1" step="1">
          Service Information
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 2" step="2">
          Plan Creation
        </v-stepper-step>
        <v-divider></v-divider>
        <v-stepper-step :complete="step > 3" step="3"> Review </v-stepper-step>
      </v-stepper-header>

      <v-stepper-items>
        <v-stepper-content step="1">
          <SetupService
            :dateOfHire.sync="dateOfHire"
            :isDeveloper.sync="isDeveloper"
            :participatesInFlex.sync="participatesInFlex"
            :flexScheduleType.sync="flexScheduleType"
            :flexDayReferenceDate.sync="flexDayReferenceDate"
          ></SetupService>
          <v-row class="mt-4">
            <v-col class="d-flex justify-end">

              <v-btn color="primary" @click="step++"
                >Next<v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="2">
          <SetupPlan
            :selectedPlanYear.sync="selectedPlanYear"
            :planName.sync="planName"
            :hoursToRollover.sync="hoursToRollover"
            :bankedHoursFromPriorYear.sync="bankedHoursFromPriorYear"
            :dateOfHire="dateOfHire"
          ></SetupPlan>

          <v-row class="mt-4">
            <v-col class="d-flex justify-space-between">
              <v-btn color="primary" @click="step--">
                <v-icon>mdi-chevron-left</v-icon>Previous</v-btn
              >
              <v-btn color="primary" @click="moveToReviewStep"
                >Next<v-icon>mdi-chevron-right</v-icon></v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-row>
            <v-col>
              <div class="headline">{{ planName }}</div>
              <div class="overline">Your plan summary</div>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <SetupSummary
                v-if="ptoBreakdown"
                :planYear="selectedPlanYear"
                :bankedHoursFromPriorYear="bankedHoursFromPriorYear"
                :hoursWillAccrueForPlanYear="hoursWillAccrueForPlanYear"
                :hoursToRollover="hoursToRollover"
                :ptoAccrualBreakdown="ptoBreakdown.breakdown"
              ></SetupSummary>
            </v-col>
          </v-row>
          <v-row class="mt-4">
            <v-col class="d-flex justify-space-between">
              <v-btn color="primary" @click="step--">
                <v-icon>mdi-chevron-left</v-icon>Previous</v-btn
              >
              <v-btn color="success" outlined @click="savePlan"
                ><v-icon class="mr-1">mdi-check-circle-outline</v-icon>Save and
                begin planning PTO</v-btn
              >
            </v-col>
          </v-row>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </div>
</template>

<script>
import SetupPlan from "@/components/setup/SetupPlan";
import SetupSummary from "@/components/setup/SetupSummary";
import SetupService from "@/components/setup/SetupService";
import { getPtoBreakdown } from "@/functions/employeeInfoCalculator";
import { getIsoDateString } from "@/functions/dateHelpers";
import moment from "moment";

export default {
  name: "SetupWizard",
  components: {
    SetupPlan,
    SetupSummary,
    SetupService,
  },
  data: () => ({
    step: 1,
    dateOfHire: moment({ month: 3, date: 18, year: 2015 })
      .toISOString()
      .substring(0, 10),
    isDeveloper: false,
    participatesInFlex: false,
    flexScheduleType: "full",
    flexDayReferenceDate: getIsoDateString(moment()),
    ptoBreakdown: null,
    planName: "",
    selectedPlanYear: "",
    hoursToRollover: 0,
    bankedHoursFromPriorYear: 0,
  }),
  mounted: function () {
    if (this.$store.getters.userInfo.dateOfHire !== "") {
      this.dateOfHire = this.$store.getters.userInfo.dateOfHire;
      this.isDeveloper = this.$store.getters.userInfo.isDeveloper;
      this.participatesInFlex = this.$store.getters.userInfo.participatesInFlex;
      this.flexScheduleType = this.$store.getters.userInfo.flexScheduleType;
      this.flexDayReferenceDate = this.$store.getters.userInfo.flexDayReferenceDate;
      this.step = 2;
    }
  },
  computed: {
    hoursWillAccrueForPlanYear() {
      return this.ptoBreakdown === null ? 0 : this.ptoBreakdown.totalHours;
    },
  },
  methods: {
    moveToReviewStep() {
      this.ptoBreakdown = getPtoBreakdown(
        this.dateOfHire,
        this.selectedPlanYear
      );
      this.step++;
    },
    savePlan() {
      this.$store.dispatch("setUserInfo", {
        dateOfHire: this.dateOfHire,
        isDeveloper: this.isDeveloper,
        participatesInFlex: this.participatesInFlex,
        flexScheduleType: this.flexScheduleType,
        flexDayReferenceDate: moment(this.flexDayReferenceDate).format(
          "YYYY-MM-DD"
        ),
      });
      this.$store.dispatch("addPlan", {
        name: this.planName,
        created: moment(),
        year: this.selectedPlanYear,
        hoursToRollover: this.hoursToRollover,
        hoursBankedPrior: this.bankedHoursFromPriorYear,
      });
      this.$store.dispatch("setSelectedPlanName", this.planName);
      this.$router.push({ path: "/" });
    },
  },
};
</script>
