<template>
  <div>
       <v-row>
      <v-col cols="9">
        <div v-show="viewType === 'calendar'">
          <PlannerCalendar
            :ptoDates="ptoDates"
            :holidays="holidays"
            :flexDays="flexDays"
            :payDays="payDays"
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

        <div class="overline">Entry Type</div>

          <v-btn-toggle v-model="entryType" mandatory dense>
            <v-btn value="single"> Single Day </v-btn>
            <v-btn value="multiple"> Multiple Days </v-btn>
          </v-btn-toggle>

            <div v-if="entryType === 'multiple'">
          <div class="d-flex justify-start">
            <div class="mr-2 mt-3 mb-0" style="width: 110px">
              <DatePickerInMenu
                label="From"
                :selectedDate.sync="groupEntryStartDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>

            <div class="mr-2 mt-3" style="width: 110px">
              <DatePickerInMenu
                label="To"
                :selectedDate.sync="groupEntryEndDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>
          </div>
        </div>
        <div v-if="entryType === 'single'">
          <div class="d-flex justify-start">
            <div style="width: 110px" class="mt-3">
              <DatePickerInMenu
                label="Day"
                :selectedDate.sync="singleEntryDate"
                :showIcon="false"
              ></DatePickerInMenu>
            </div>
            <div class="mt-3 ml-2">
              <v-checkbox
                v-model="singleEntryIsAllDay"
                label="All Day"
              ></v-checkbox>
            </div>
            <div class="mt-3 ml-2 d-flex" v-if="!singleEntryIsAllDay">
              <v-text-field
                v-model="singleEntryHours"
                type="number"
                label="Hours"
                style="width: 60px"
              ></v-text-field>
              <v-select
                :items="meridianList"
                v-model="selectedMeridian"
                class="ml-2"
                label="During"
                style="width: 70px"
              ></v-select>
            </div>
          </div>
        </div>
        <div class="font-weight-light font-italic mt-7 d-inline">
          {{ totalHours }} total hours
        </div>
        <v-btn class="mt-5 d-inline" color="primary" @click="addPto"
          >Enter</v-btn
        >

<v-divider class="mt-3"></v-divider>

        <div class="mt-3">
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
  getTotalPtoHours,
} from "@/functions/ptoHoursCalculator";
import plannerMixin from "@/mixins/plannerMixin";
import moment from "moment";

export default {
  name: "Planner",
  mixins: [plannerMixin],
  components: {
    PlannerCalendar,
    PlannerList,
    DatePickerInMenu,
    WidgetHoursRemaining,
  },
  data: () => ({
    viewType: "calendar",
    entryType: "single",
    groupEntryStartDate: getIsoDateString(moment()),
    groupEntryEndDate: getIsoDateString(moment()),
    singleEntryDate: getIsoDateString(moment()),
    singleEntryIsAllDay: true,
    singleEntryHours: 0,
    meridianList: ["AM", "PM", "None"],
    selectedMeridian: "AM",
  }),
  computed: {
    totalHours: function () {
      return this.entryType === "single"
        ? getTotalPtoHours(
            getPtoDayForSingle(
              this.singleEntryDate,
              this.$store.getters.userInfo.participatesInFlex,
              this.$store.getters.userInfo.flexScheduleType,
              this.singleEntryIsAllDay,
              parseFloat(this.singleEntryHours)
            )
          )
        : getTotalPtoHours(
            getPtoDaysForRange(
              this.groupEntryStartDate,
              this.groupEntryEndDate,
              this.$store.getters.userInfo.participatesInFlex,
              this.$store.getters.userInfo.flexScheduleType
            )
          );
    },
  },
  methods: {
    addPto() {
      let ptoDays = [];
      if (this.entryType === "single") {
        ptoDays = getPtoDayForSingle(
          this.singleEntryDate,
          this.$store.getters.userInfo.participatesInFlex,
          this.$store.getters.userInfo.flexScheduleType,
          this.singleEntryIsAllDay,
          parseFloat(this.singleEntryHours)
        );
      } else {
        ptoDays = getPtoDaysForRange(
          this.groupEntryStartDate,
          this.groupEntryEndDate,
          this.$store.getters.userInfo.participatesInFlex,
          this.$store.getters.userInfo.flexScheduleType
        );
      }

      this.$store.dispatch("addPtoDates", {
        planName: this.$store.getters.selectedPlanName,
        pto: ptoDays,
      });
    },
    deletePto(date) {
      this.$store.dispatch("deletePtoDates", {
        planName: this.$store.getters.selectedPlanName,
        date: moment(date).format("YYYY-MM-DD"),
      });
    },
    calendarDateChanged(date) {
      this.singleEntryDate = getIsoDateString(moment(date));
      this.groupEntryStartDate = getIsoDateString(moment(date));
      this.groupEntryEndDate = getIsoDateString(moment(date).add(1, "day"));
    },
  },
};
</script>