<template>
  <div>
    <v-row>
      <v-col cols="4">
        <div>What year are you planning your PTO for?</div>
      </v-col>
      <v-col cols="1">
        <v-select
          :items="planYears"
          v-model="selectedPlanYearSync"
          label="Plan Year"
          :disabled="isPlanYearDisabled"
        ></v-select>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <div>How many hours did you enter {{ selectedPlanYearSync }} with?</div>
        <div class="font-weight-light">
          This can be found on any of your {{ selectedPlanYearSync }} pay stubs
          as "Banked PTO Hrs"
        </div>
      </v-col>
      <v-col cols="1">
        <v-text-field
          v-model="bankedHoursFromPriorYearSync"
          type="number"
          label="Banked PTO"
        ></v-text-field>
      </v-col>
      <v-col></v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <div>
          How many hours would you like to rollover to
          {{ planYearNumeric + 1 }}?
        </div>
        <div class="font-weight-light mb-2">
          You may rollover a maximum of 40 hours to {{ planYearNumeric + 1 }}
        </div>
      </v-col>
      <v-col cols="5">
        <v-slider
          v-model="hoursToRolloverSync"
          :max="40"
          :min="0"
          :thumb-label="true"
          :step="0.25"
          inverse-label
        >
          <template v-slot:append>
            <v-text-field
              v-model="hoursToRolloverSync"
              class="mt-0 pt-0"
              type="number"
              style="width: 60px"
              readonly
            ></v-text-field>
          </template>
        </v-slider>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <div>
          Give your plan a name
          <div class="font-weight-light">
            You may have multiple plans for the same year. This helps to
            distinguish those.
          </div>
        </div>
      </v-col>
      <v-col>
        <v-text-field
          v-model="planNameSync"
          label="Plan Name"
          hide-details="auto"
          :prefix="`${selectedPlanYearSync} - `"
          :placeholder="`ex: My ${selectedPlanYearSync} plan with trips to Gulf Shores and Orlando!`"
        ></v-text-field>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from "moment";

export default {
  name: "SetupPlan",
  data: () => ({
    planYears: [moment().year().toString(), (moment().year() + 1).toString()],
    maxHoursCanRollover: 0,
  }),
  props: {
    selectedPlanYear: {
      type: String,
      required: true,
    },
    planName: {
      type: String,
      required: true,
    },
    hoursToRollover: {
      type: Number,
      required: true,
    },
    bankedHoursFromPriorYear: {
      type: Number,
      required: true,
    },
    dateOfHire: {
      type: String,
      required: true,
    },
    isPlanYearDisabled: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  mounted() {
    this.selectedPlanYearSync = moment().year().toString();
  },
  computed: {
    selectedPlanYearSync: {
      get() {
        return this.selectedPlanYear;
      },
      set(value) {
        this.$emit("update:selectedPlanYear", value);
      },
    },
    planYearNumeric() {
      return parseInt(this.selectedPlanYearSync);
    },
    planNameSync: {
      get() {
        return this.planName.replace(`${this.selectedPlanYear} - `, "");
      },
      set(value) {
        this.$emit("update:planName", `${this.selectedPlanYear} - ${value}`);
      },
    },
    hoursToRolloverSync: {
      get() {
        return this.hoursToRollover;
      },
      set(value) {
        this.$emit("update:hoursToRollover", parseFloat(value));
      },
    },
    bankedHoursFromPriorYearSync: {
      get() {
        return this.bankedHoursFromPriorYear;
      },
      set(value) {
        this.$emit("update:bankedHoursFromPriorYear", parseFloat(value));
      },
    },
  },
};
</script>