<template>
  <div>
    <v-row>
      <v-col cols="9">
        <div v-show="viewType === 'calendar'">
          <PlannerCalendar
            :events="events"
            :focus.sync="calendarSelectedDate"
            @delete-pto="deletePto"
            @update-status="updateStatus"
          ></PlannerCalendar>
        </div>
        <div v-show="viewType === 'list'">
          <PlannerList @delete-pto="deletePto" @update-status="updateStatus">
          </PlannerList>
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
                :events="events"
              ></DatePickerInMenu>
            </div>

            <div class="mr-2 mt-3" style="width: 110px">
              <DatePickerInMenu
                label="To"
                :selected-date.sync="groupEntryEndDate"
                :show-icon="false"
                :events="events"
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
                :events="events"
              ></DatePickerInMenu>
            </div>
            <div class="mt-3 ml-2">
              <v-checkbox
                v-model="singleEntryIsAllDay"
                label="All Day"
              ></v-checkbox>
            </div>
            <div v-if="!singleEntryIsAllDay" class="mt-3 ml-2 d-flex">
              <v-text-field
                v-model="singleEntryHours"
                type="number"
                label="Hours"
                style="width: 60px"
              ></v-text-field>
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
import { getIsoDateString, generateRange } from "@/functions/dateHelpers";
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
    groupEntryEndDate: "",
    groupEntryStartDateSelected: false,
    groupEntryEndDateSelected: false,
    singleEntryDate: getIsoDateString(moment()),
    singleEntryIsAllDay: true,
    singleEntryHours: 0,
    calendarSelectedDate: getIsoDateString(moment())
  }),
  computed: {
    events: function() {
      return [
        ...this.ptoDates.map(ptoDate => ({
          name: `${ptoDate.hours} hrs | ${this.getStatusText(ptoDate.status)}`,
          start: ptoDate.date,
          color: "purple",
          timed: false,
          type: "pto",
          status: ptoDate.status,
          hours: ptoDate.hours
        })),
        ...this.holidays.map(holiday => ({
          name: holiday.description,
          start: holiday.date,
          color: "pink",
          timed: false,
          type: "holiday"
        })),
        ...this.flexDays.map(flexDay => ({
          name: "Flex Day",
          start: flexDay,
          color: "blue",
          timed: false,
          type: "flex"
        })),
        ...this.groupEntryRange.map(day => ({
          name: "New Usage",
          start: day,
          color: "purple lighten-2",
          timed: false,
          type: "pto"
        }))
      ];
    },
    groupEntryRange: function() {
      if (this.groupEntryStartDateSelected && this.groupEntryEndDateSelected) {
        return generateRange(this.groupEntryStartDate, this.groupEntryEndDate);
      } else {
        return [];
      }
    },
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
    },
    planYear: function() {
      return this.$store.getters.selectedPlan.year;
    }
  },
  watch: {
    calendarSelectedDate() {
      this.calendarDateChanged();
    },
    planYear() {
      this.setSelectedDate();
    },
    entryType() {
      if (this.entryType === "single") {
        this.groupEntryStartDateSelected = false;
        this.groupEntryEndDateSelected = false;
      }
    }
  },
  mounted() {
    this.setSelectedDate();
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

      this.groupEntryStartDateSelected = false;
      this.groupEntryEndDateSelected = false;
    },
    deletePto(date) {
      this.$store.dispatch("deletePtoDates", {
        planName: this.$store.getters.selectedPlanName,
        date: moment(date).format("YYYY-MM-DD")
      });
    },
    calendarDateChanged() {
      this.singleEntryDate = getIsoDateString(this.calendarSelectedDate);

      if (this.entryType === "single") {
        this.groupEntryStartDate = this.singleEntryDate;
      } else {
        if (
          this.groupEntryStartDateSelected &&
          this.groupEntryEndDateSelected
        ) {
          this.groupEntryStartDateSelected = false;
          this.groupEntryEndDateSelected = false;
          this.groupEntryEndDate = "";
        }

        if (!this.groupEntryStartDateSelected) {
          this.groupEntryStartDate = getIsoDateString(
            moment(this.calendarSelectedDate)
          );
          this.groupEntryStartDateSelected = true;
        } else {
          if (
            moment(this.groupEntryStartDate).isBefore(
              moment(this.calendarSelectedDate)
            )
          ) {
            this.groupEntryEndDate = getIsoDateString(
              moment(this.calendarSelectedDate)
            );
            this.groupEntryEndDateSelected = true;
          } else {
            this.groupEntryStartDate = getIsoDateString(
              moment(this.calendarSelectedDate)
            );
          }
        }
      }
    },
    setSelectedDate() {
      if (
        moment()
          .year()
          .toString() === this.planYear
      ) {
        this.calendarSelectedDate = moment().format("YYYY-MM-DD");
      } else {
        this.calendarSelectedDate = moment({
          month: 0,
          date: 1,
          year: this.planYear
        }).format("YYYY-MM-DD");
      }
    },
    updateStatus(date, status) {
      this.$store.dispatch("updateStatus", {
        plan: this.$store.getters.selectedPlan.name,
        date: moment(date).format("YYYY-MM-DD"),
        status: status
      });
    },
    getStatusText(status) {
      if (status === 2) {
        return "Approved";
      }
      if (status === 1) {
        return "Submitted";
      }

      return "Unsubmitted";
    }
  }
};
</script>
