<template>
  <div>
    <v-row>
      <v-col cols="4">
        Date of hire
        <div class="font-weight-light">
          This is used to calculate how many hours of PTO you will receive
        </div>
      </v-col>
      <v-col>
        <DatePickerInMenu
          label="Date of Hire"
          :selectedDate.sync="dateOfHireSync"
        ></DatePickerInMenu>
      </v-col>
      <v-col></v-col>
    </v-row>

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
            :selectedDate.sync="flexDayReferenceDateSync"
          ></DatePickerInMenu>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import DatePickerInMenu from "@/components/Inputs/DatePickerInMenu";

export default {
  name: "SetupService",
  components: {
    DatePickerInMenu,
  },
  props: {
    dateOfHire: {
      type: String,
      required: true,
    },
    isDeveloper: {
      type: Boolean,
      required: true,
    },
    participatesInFlex: {
      type: Boolean,
      required: true,
    },
    flexScheduleType: {
      type: String,
      required: true,
    },
    flexDayReferenceDate: {
      type: String,
      required: true,
    },
  },
  computed: {
    dateOfHireSync: {
      get() {
        return this.dateOfHire;
      },
      set(value) {
        this.$emit("update:dateOfHire", value);
      },
    },
    isDeveloperSync: {
      get() {
        return this.isDeveloper;
      },
      set(value) {
        this.$emit("update:isDeveloper", value);
      },
    },
    participatesInFlexSync: {
      get() {
        return this.participatesInFlex;
      },
      set(value) {
        this.$emit("update:participatesInFlex", value);
      },
    },
    flexScheduleTypeSync: {
      get() {
        return this.flexScheduleType;
      },
      set(value) {
        this.$emit("update:flexScheduleType", value);
      },
    },
    flexDayReferenceDateSync: {
      get() {
        return this.flexDayReferenceDate;
      },
      set(value) {
        this.$emit("update:flexDayReferenceDate", value);
      },
    },
  },
};
</script>