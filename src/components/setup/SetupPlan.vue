<template>
  <div>
    <div class="display-1 headline">Plan Information</div>
    <v-row>
      <v-col cols="4">
        <div>What year are you planning your PTO for?</div>
      </v-col>
      <v-col cols="1">
        <v-select
          v-model="selectedPlanYearSync"
          :items="planYears"
          label="Plan Year"
          :disabled="isPlanYearDisabled"
        ></v-select>
      </v-col>
      <v-col></v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <div>
          How many hours would you like to plan?
        </div>
        <div class="font-weight-light mb-2">
          You are required to take a minimum of 10 days of FTO
        </div>
      </v-col>
      <v-col cols="5">
        <v-text-field
          v-model="hoursToPlanSync"
          class="mt-0 pt-0"
          type="number"
          style="width: 60px"
          label="Hours"
        ></v-text-field>
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
          :placeholder="
            `ex: My ${selectedPlanYearSync} plan with trips to Gulf Shores and Orlando!`
          "
          :error-messages="planNameErrors"
        ></v-text-field>
      </v-col>
    </v-row>

    <div class="display-1 headline">User Information</div>
    <v-row no-gutters>
      <v-col cols="4">
        <v-checkbox
          v-model="isDeveloperSync"
          label="I'm a developer"
        ></v-checkbox>
      </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row v-show="isDeveloperSync" no-gutters>
      <v-col>
        <v-checkbox
          v-model="participatesInFlexSync"
          label="I participate in flex scheduling"
        ></v-checkbox>
      </v-col>
      <v-col> </v-col>
    </v-row>
    <v-row v-show="isDeveloperSync && participatesInFlexSync" no-gutters>
      <v-col>
        <v-radio-group
          v-model="flexScheduleTypeSync"
          label="Flex Schedule Type"
        >
          <v-radio label="Every other Friday" value="full"></v-radio>
          <v-radio label="Half day each Friday" value="half"></v-radio>
        </v-radio-group>
      </v-col>
    </v-row>
    <v-row
      v-show="
        isDeveloperSync &&
          participatesInFlexSync &&
          flexScheduleTypeSync === 'full'
      "
      no-gutters
    >
      <v-col cols="4">
        <div>
          <div class="font-weight-light">
            Please enter a date that one of your flex days will land on.
          </div>
        </div>
      </v-col>
      <v-col>
        <div>
          <DatePickerInMenu
            label="Flex Day"
            :selected-date.sync="flexDayReferenceDateSync"
          ></DatePickerInMenu>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import moment from "moment";
import DatePickerInMenu from "@/components/Inputs/DatePickerInMenu";

export default {
  name: "SetupPlan",
  components: { DatePickerInMenu },
  props: {
    selectedPlanYear: {
      type: String,
      required: true
    },
    planName: {
      type: String,
      required: true
    },
    hoursToPlan: {
      type: Number,
      required: true
    },
    isDeveloper: {
      type: Boolean,
      required: true
    },
    participatesInFlex: {
      type: Boolean,
      required: true
    },
    flexScheduleType: {
      type: String,
      required: true
    },
    flexDayReferenceDate: {
      type: String,
      required: true
    },
    isPlanYearDisabled: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data: () => ({
    planYears: [
      moment()
        .year()
        .toString(),
      (moment().year() + 1).toString()
    ],
    maxHoursCanRollover: 0,
    planNameErrors: []
  }),
  computed: {
    selectedPlanYearSync: {
      get() {
        return this.selectedPlanYear;
      },
      set(value) {
        this.$emit("update:selectedPlanYear", value);
      }
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
      }
    },
    hoursToPlanSync: {
      get() {
        return this.hoursToPlan;
      },
      set(value) {
        this.$emit("update:hoursToPlan", parseFloat(value));
      }
    },
    isDeveloperSync: {
      get() {
        return this.isDeveloper;
      },
      set(value) {
        this.$emit("update:isDeveloper", value);
      }
    },
    participatesInFlexSync: {
      get() {
        return this.participatesInFlex;
      },
      set(value) {
        this.$emit("update:participatesInFlex", value);
      }
    },
    flexScheduleTypeSync: {
      get() {
        return this.flexScheduleType;
      },
      set(value) {
        this.$emit("update:flexScheduleType", value);
      }
    },
    flexDayReferenceDateSync: {
      get() {
        return this.flexDayReferenceDate;
      },
      set(value) {
        this.$emit("update:flexDayReferenceDate", value);
      }
    }
  },
  mounted() {
    this.selectedPlanYearSync = moment()
      .year()
      .toString();
  },
  methods: {
    validate() {
      if (this.planNameSync === "") {
        this.planNameErrors.push("Please enter a Plan Name.");
        return false;
      } else {
        this.planNameErrors = [];
      }

      return true;
    }
  }
};
</script>
