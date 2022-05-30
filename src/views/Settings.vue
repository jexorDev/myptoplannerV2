<template>
  <div class="mx-auto">
    <div class="display-1 headline">User Information</div>
    <SetupService
      :dateOfHire.sync="dateOfHire"
      :isDeveloper.sync="isDeveloper"
      :participatesInFlex.sync="participatesInFlex"
      :flexScheduleType.sync="flexScheduleType"
      :flexDayReferenceDate.sync="flexDayReferenceDate"
    ></SetupService>
    <v-row>
      <v-col>
        <v-btn color="red" text @click="deleteAccount">Delete Account</v-btn>
      </v-col>
      <v-col class="d-flex justify-end mr-5">
        <v-btn
          color="primary"
          @click="saveServiceInfoChanges"
          :disabled="serviceButtonsDisabled"
          >Save</v-btn
        >
        <v-btn
          text
          @click="cancelServiceInfoChanges"
          :disabled="serviceButtonsDisabled"
          >Cancel</v-btn
        >
      </v-col>
    </v-row>

    <v-divider class="mt-3 mb-3"></v-divider>
    <div class="display-1 headline">Plan Information</div>
    <SetupPlan
      :selectedPlanYear="planYear"
      :planName.sync="planName"
      :hoursToPlan.sync="hoursToPlan"
      :bankedHoursFromPriorYear.sync="bankedHoursFromPriorYear"
      :dateOfHire="dateOfHire"
      :isPlanYearDisabled="true"
    ></SetupPlan>
    <v-row>
      <v-col>
        <v-btn color="red" text @click="deletePlan">Delete Plan</v-btn>
      </v-col>
      <v-col class="d-flex justify-end mr-5">
        <v-btn
          color="primary"
          @click="savePlanInfoChanges"
          :disabled="planButtonsDisabled"
          >Save</v-btn
        >
        <v-btn
          text
          @click="cancelPlanInfoChanges"
          :disabled="planButtonsDisabled"
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
import SetupService from "@/components/setup/SetupService";
import SetupPlan from "@/components/setup/SetupPlan";

export default {
  name: "Settings",

  components: {
    SetupService,
    SetupPlan,
  },
  data: () => ({
    showUnsavedChangesDialog: false,
    dateOfHire: "",
    oldDateOfHire: "",
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
    bankedHoursFromPriorYear: 0,
    oldBankedHoursFromPriorYear: 0,
    planName: "",
    oldPlanName: "",
    planYear: "",
    planCreated: "",
  }),
  mounted() {
    this.intiializeFields();
  },
  methods: {
    intiializeFields() {
      //service info
      this.dateOfHire = this.$store.getters.userInfo.dateOfHire;
      this.oldDateOfHire = this.dateOfHire;
      this.isDeveloper = this.$store.getters.userInfo.isDeveloper;
      this.oldIsDeveloper = this.isDeveloper;
      this.participatesInFlex = this.$store.getters.userInfo.participatesInFlex;
      this.oldParticipatesInFlex = this.participatesInFlex;
      this.flexScheduleType = this.$store.getters.userInfo.flexScheduleType;
      this.oldFlexScheduleType = this.flexScheduleType;
      this.flexDayReferenceDate = this.$store.getters.userInfo.flexDayReferenceDate;
      this.oldFlexDayReferenceDate = this.flexDayReferenceDate;

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
      }
    },
    saveServiceInfoChanges() {
      this.$store.dispatch("setUserInfo", {
        dateOfHire: this.dateOfHire,
        isDeveloper: this.isDeveloper,
        participatesInFlex: this.participatesInFlex,
        flexScheduleType: this.flexScheduleType,
        flexDayReferenceDate: this.flexDayReferenceDate,
      });

      this.oldDateOfHire = this.dateOfHire;
      this.oldIsDeveloper = this.isDeveloper;
      this.oldParticipatesInFlex = this.participatesInFlex;
      this.oldFlexScheduleType = this.flexScheduleType;
      this.oldFlexDayReferenceDate = this.flexDayReferenceDate;
    },
    cancelServiceInfoChanges() {
      this.dateOfHire = this.oldDateOfHire;
      this.isDeveloper = this.oldIsDeveloper;
      this.participatesInFlex = this.oldParticipatesInFlex;
      this.flexScheduleType = this.oldFlexScheduleType;
      this.flexDayReferenceDate = this.oldFlexDayReferenceDate;
    },
    savePlanInfoChanges() {
      this.$store.dispatch("updatePlan", {
        originalName: this.oldPlanName,
        updatedPlan: {
          name: this.planName,
          year: this.planYear,
          hoursToPlan: this.hoursToPlan,
          hoursBankedPrior: this.bankedHoursFromPriorYear,
          created: this.planCreated,
        },
      });

      this.oldPlanName = this.planName;
      this.oldhoursToPlan = this.hoursToPlan;
      this.oldBankedHoursFromPriorYear = this.bankedHoursFromPriorYear;

      this.$store.dispatch("setSelectedPlanName", this.planName);
    },
    cancelPlanInfoChanges() {
      this.planName = this.oldPlanName;
      this.hoursToPlan = this.oldhoursToPlan;
      this.bankedHoursFromPriorYear = this.oldBankedHoursFromPriorYear;
    },
    deletePlan() {
      if (
        this.$store.state.plans.filter((plan) => plan.name !== this.oldPlanName)
          .length > 0
      ) {
        this.$store.dispatch(
          "setSelectedPlanName",
          this.$store.state.plans.filter(
            (plan) => plan.name !== this.oldPlanName
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
    },
  },
  computed: {
    serviceButtonsDisabled() {
      return (
        this.dateOfHire === this.oldDateOfHire &&
        this.isDeveloper === this.oldIsDeveloper &&
        this.participatesInFlex === this.oldParticipatesInFlex &&
        this.flexScheduleType === this.oldFlexScheduleType &&
        this.flexDayReferenceDate === this.oldFlexDayReferenceDate
      );
    },
    planButtonsDisabled() {
      return (
        this.planName === this.oldPlanName &&
        this.bankedHoursFromPriorYear === this.oldBankedHoursFromPriorYear &&
        this.hoursToPlan === this.oldhoursToPlan
      );
    },
    selectedPlanName() {
      return this.$store.getters.selectedPlanName;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.serviceButtonsDisabled || !this.planButtonsDisabled) {
      this.showUnsavedChangesDialog = true;
      return;
    }
    next();
  },
  watch: {
    selectedPlanName() {
      this.intiializeFields();
    },
  },
};
</script>