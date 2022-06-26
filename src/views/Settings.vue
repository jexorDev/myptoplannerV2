<template>
  <div class="mx-auto">
    <div class="display-1 headline">Plan Information</div>
    <SetupPlan
      ref="setupPlan"
      :selected-plan-year.sync="planYear"
      :plan-name.sync="planName"
      :hours-to-plan.sync="hoursToPlan"
      :is-developer.sync="isDeveloper"
      :participates-in-flex.sync="participatesInFlex"
      :flex-schedule-type.sync="flexScheduleType"
      :flex-day-reference-date.sync="flexDayReferenceDate"
      :is-plan-year-disabled="true"
    ></SetupPlan>
    <v-row>
      <v-col>
        <v-btn color="red" text @click="deletePlan">Delete Plan</v-btn>
      </v-col>
      <v-col class="d-flex justify-end mr-5">
        <v-btn
          color="primary"
          :disabled="planButtonsDisabled"
          @click="savePlanInfoChanges"
          >Save</v-btn
        >
        <v-btn
          text
          :disabled="planButtonsDisabled"
          @click="cancelPlanInfoChanges"
          >Cancel</v-btn
        >
      </v-col>
    </v-row>

    <v-divider class="mt-3 mb-3"></v-divider>

    <v-dialog v-model="showUnsavedChangesDialog" persistent max-width="500">
      <v-card>
        <v-card-title class="headline"> You have unsaved changes </v-card-title>
        <v-card-text
          >Please save or cancel the changes before leaving this
          page</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="showUnsavedChangesDialog = false">
            OK
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
import SetupPlan from "@/components/setup/SetupPlan";

export default {
  name: "Settings",
  components: {
    SetupPlan
  },
  data: () => ({
    showUnsavedChangesDialog: false,
    isDeveloper: false,
    oldIsDeveloper: false,
    participatesInFlex: false,
    oldParticipatesInFlex: false,
    flexScheduleType: "full",
    oldFlexScheduleType: "full",
    flexDayReferenceDate: "",
    oldFlexDayReferenceDate: "",
    hoursToPlan: 0,
    oldhoursToPlan: 0,
    planName: "",
    oldPlanName: "",
    planYear: "",
    planCreated: ""
  }),
  computed: {
    planButtonsDisabled() {
      return (
        this.planName === this.oldPlanName &&
        this.hoursToPlan === this.oldhoursToPlan &&
        this.isDeveloper === this.oldIsDeveloper &&
        this.participatesInFlex === this.oldParticipatesInFlex &&
        this.flexScheduleType === this.oldFlexScheduleType &&
        this.flexDayReferenceDate === this.oldFlexDayReferenceDate
      );
    },
    selectedPlanName() {
      return this.$store.getters.selectedPlanName;
    }
  },
  watch: {
    selectedPlanName() {
      this.intiializeFields();
    }
  },
  mounted() {
    this.intiializeFields();
  },
  methods: {
    intiializeFields() {
      //plan info
      const plan = this.$store.getters.selectedPlan;

      if (plan) {
        this.planName = plan.name;
        this.oldPlanName = this.planName;
        this.hoursToPlan = plan.hoursToPlan;
        this.oldhoursToPlan = this.hoursToPlan;
        this.bankedHoursFromPriorYear = plan.hoursBankedPrior;
        this.oldBankedHoursFromPriorYear = this.bankedHoursFromPriorYear;
        this.planYear = plan.year;
        this.planCreated = plan.created;
        this.isDeveloper = plan.isDeveloper;
        this.oldIsDeveloper = this.isDeveloper;
        this.participatesInFlex = plan.participatesInFlex;
        this.oldParticipatesInFlex = this.participatesInFlex;
        this.flexScheduleType = plan.flexScheduleType;
        this.oldFlexScheduleType = this.flexScheduleType;
        this.flexDayReferenceDate = plan.flexDayReferenceDate;
        this.oldFlexDayReferenceDate = this.flexDayReferenceDate;
      }
    },
    savePlanInfoChanges() {

      if (!this.$refs.setupPlan.validate()) {
        console.log('validation failed. returning.')
        return;
      }

      this.$store.dispatch("updatePlan", {
        originalName: this.oldPlanName,
        updatedPlan: {
          name: this.planName,
          year: this.planYear,
          hoursToPlan: this.hoursToPlan,
          created: this.planCreated,
          isDeveloper: this.isDeveloper,
          participatesInFlex: this.participatesInFlex,
          flexScheduleType: this.flexScheduleType,
          flexDayReferenceDate: this.flexDayReferenceDate
        }
      });

      this.oldPlanName = this.planName;
      this.oldhoursToPlan = this.hoursToPlan;
      this.oldIsDeveloper = this.isDeveloper;
      this.oldParticipatesInFlex = this.participatesInFlex;
      this.oldFlexScheduleType = this.flexScheduleType;
      this.oldFlexDayReferenceDate = this.flexDayReferenceDate;

      this.$store.dispatch("setSelectedPlanName", this.planName);
    },
    cancelPlanInfoChanges() {
      this.planName = this.oldPlanName;
      this.hoursToPlan = this.oldhoursToPlan;
      this.bankedHoursFromPriorYear = this.oldBankedHoursFromPriorYear;
      this.isDeveloper = this.oldIsDeveloper;
      this.participatesInFlex = this.oldParticipatesInFlex;
      this.flexScheduleType = this.oldFlexScheduleType;
      this.flexDayReferenceDate = this.oldFlexDayReferenceDate;
    },
    deletePlan() {
      if (
        this.$store.state.plans.filter(plan => plan.name !== this.oldPlanName)
          .length > 0
      ) {
        this.$store.dispatch(
          "setSelectedPlanName",
          this.$store.state.plans.filter(
            plan => plan.name !== this.oldPlanName
          )[0].name
        );
        this.$store.dispatch("deletePlan", this.oldPlanName);
        this.intiializeFields();
      } else {
        this.$store.dispatch("deletePlan", this.oldPlanName);

        this.$router.push("/start");
      }
    },
    deleteAccount() {
      this.$store.dispatch("deleteAccount");
      this.$router.push({ route: "/start" });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (!this.planButtonsDisabled) {
      this.showUnsavedChangesDialog = true;
      return;
    }
    next();
  }
};
</script>
