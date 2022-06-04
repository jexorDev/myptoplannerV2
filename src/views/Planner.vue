<template>
  <div>
    <v-row>
      <v-col cols="9">
        <div v-show="viewType === 'calendar'">
          <PlannerCalendar
            :pto-dates="ptoDates"
            :holidays="holidays"
            :flex-days="flexDays"
            :pay-days="payDays"
            @delete-pto="deletePto"
            @focus-changed="calendarDateChanged"
          ></PlannerCalendar>
        </div>
        <div v-show="viewType === 'list'">
          <PlannerList @delete-pto="deletePto"> </PlannerList>
        </div>
      </v-col>
      <v-col>
        <div class="overline">View Type</div>
        <v-btn-toggle v-model="viewType" mandatory dense>
          <v-btn value="calendar"> Calendar </v-btn>
          <v-btn value="list"> List </v-btn>
        </v-btn-toggle>

        <v-divider class="mt-3"></v-divider>

        <div class="overline">Entry</div>

        <v-btn-toggle v-model="entryType" mandatory dense>
          <v-btn value="single"> Single Day </v-btn>
          <v-btn value="multiple"> Multiple Days </v-btn>
        </v-btn-toggle>

        <div v-if="entryType === 'multiple'">
          <div class="d-flex justify-start">
            <div class="mr-2 mt-3 mb-0" style="width: 110px">
              <DatePickerInMenu
                label="From"
                :selected-date.sync="groupEntryStartDate"
                :show-icon="false"
              ></DatePickerInMenu>
            </div>

            <div class="mr-2 mt-3" style="width: 110px">
              <DatePickerInMenu
                label="To"
                :selected-date.sync="groupEntryEndDate"
                :show-icon="false"
              ></DatePickerInMenu>
            </div>
          </div>
        </div>
        <div v-if="entryType === 'single'">
          <div class="d-flex justify-start">
            <div style="width: 110px" class="mt-3">
              <DatePickerInMenu
                label="Day"
                :selected-date.sync="singleEntryDate"
                :show-icon="false"
              ></DatePickerInMenu>
            </div>
          </div>
        </div>
        <div class="font-weight-light font-italic mt-7 d-inline">
          {{ totalHours }} total hours
        </div>
        <v-btn class="ml-5 d-inline" color="primary" @click="addPto"
          >Enter</v-btn
        >

        <v-divider class="mt-3"></v-divider>

        <div class="mt-3">
          <div class="overline">Status</div>
          <WidgetHoursRemaining></WidgetHoursRemaining>
        </div>
      </v-col>
    </v-row>
  </div>
</template>
<script>
import WidgetHoursRemaining from "@/components/widgets/WidgetHoursRemaining";
import PlannerList from "@/components/PtoPlanning/PlannerList";
import PlannerCalendar from "@/components/PtoPlanning/PlannerCalendar";
import DatePickerInMenu from "@/components/Inputs/DatePickerInMenu";
import { getIsoDateString } from "@/functions/dateHelpers";
import {
  getPtoDaysForRange,
  getPtoDayForSingle,
  getTotalPtoHours
} from "@/functions/ptoHoursCalculator";
import plannerMixin from "@/mixins/plannerMixin";
import moment from "moment";

export default {
  name: "Planner",
  components: {
    PlannerCalendar,
    PlannerList,
    DatePickerInMenu,
    WidgetHoursRemaining
  },
  mixins: [plannerMixin],
  data: () => ({
    viewType: "calendar",
    entryType: "single",
    groupEntryStartDate: getIsoDateString(moment()),
    groupEntryEndDate: getIsoDateString(moment()),
    singleEntryDate: getIsoDateString(moment()),
    singleEntryIsAllDay: true,
    singleEntryHours: 0,
    meridianList: ["AM", "PM", "None"],
    selectedMeridian: "AM"
  }),
  computed: {
    totalHours: function() {
      return this.entryType === "single"
        ? getTotalPtoHours(
            getPtoDayForSingle(
              this.singleEntryDate,
              this.$store.getters.selectedPlan.participatesInFlex,
              this.$store.getters.selectedPlan.flexScheduleType,
              this.singleEntryIsAllDay,
              parseFloat(this.singleEntryHours)
            )
          )
        : getTotalPtoHours(
            getPtoDaysForRange(
              this.groupEntryStartDate,
              this.groupEntryEndDate,
              this.$store.getters.selectedPlan.participatesInFlex,
              this.$store.getters.selectedPlan.flexScheduleType
            )
          );
    }
  },
  methods: {
    addPto() {
      let ptoDays = [];
      if (this.entryType === "single") {
        ptoDays = getPtoDayForSingle(
          this.singleEntryDate,
          this.$store.getters.selectedPlan.participatesInFlex,
          this.$store.getters.selectedPlan.flexScheduleType,
          this.singleEntryIsAllDay,
          parseFloat(this.singleEntryHours)
        );
      } else {
        ptoDays = getPtoDaysForRange(
          this.groupEntryStartDate,
          this.groupEntryEndDate,
          this.$store.getters.selectedPlan.participatesInFlex,
          this.$store.getters.selectedPlan.flexScheduleType
        );
      }

      this.$store.dispatch("addPtoDates", {
        planName: this.$store.getters.selectedPlanName,
        pto: ptoDays
      });
    },
    deletePto(date) {
      this.$store.dispatch("deletePtoDates", {
        planName: this.$store.getters.selectedPlanName,
        date: moment(date).format("YYYY-MM-DD")
      });
    },
    calendarDateChanged(date) {
      this.singleEntryDate = getIsoDateString(moment(date));
      this.groupEntryStartDate = getIsoDateString(moment(date));
      this.groupEntryEndDate = getIsoDateString(moment(date).add(1, "day"));
    }
  }
};
</script>